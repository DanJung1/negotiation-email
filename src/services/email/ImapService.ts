import Imap from 'imap';

export class ImapService {
  private connection: Imap | null = null;

  async connect(config: {
    host: string;
    port: number;
    user: string;
    password: string;
    tls: boolean;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection = new Imap({
        user: config.user,
        password: config.password,
        host: config.host,
        port: config.port,
        tls: config.tls,
        tlsOptions: { rejectUnauthorized: false }
      });

      this.connection.once('ready', () => {
        resolve();
      });

      this.connection.once('error', (err) => {
        reject(err);
      });

      this.connection.connect();
    });
  }

  async fetchEmails(folder: string = 'INBOX', limit: number = 50): Promise<any[]> {
    if (!this.connection) {
      throw new Error('Not connected to IMAP server');
    }

    return new Promise((resolve, reject) => {
      this.connection!.openBox(folder, false, (err, box) => {
        if (err) {
          reject(err);
          return;
        }

        const fetch = this.connection!.seq.fetch(`${Math.max(1, box.messages.total - limit + 1)}:*`, {
          bodies: '',
          struct: true
        });

        const emails: any[] = [];

        fetch.on('message', (msg, seqno) => {
          let buffer = '';
          
          msg.on('body', (stream) => {
            stream.on('data', (chunk) => {
              buffer += chunk.toString('utf8');
            });
          });

          msg.once('end', () => {
            // Parse email content here
            const email = this.parseEmail(buffer);
            emails.push(email);
          });
        });

        fetch.once('error', (err) => {
          reject(err);
        });

        fetch.once('end', () => {
          resolve(emails);
        });
      });
    });
  }

  private parseEmail(rawEmail: string): any {
    // Basic email parsing - in production, use a proper email parser
    const lines = rawEmail.split('\n');
    const email: any = {
      id: Math.random().toString(36).substr(2, 9),
      subject: '',
      from: '',
      to: [],
      body: '',
      receivedAt: new Date().toISOString(),
      isRead: false,
      isImportant: false,
      priority: 'NORMAL'
    };

    let inBody = false;
    let bodyLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith('Subject:')) {
        email.subject = line.substring(8).trim();
      } else if (line.startsWith('From:')) {
        email.from = line.substring(5).trim();
      } else if (line.startsWith('To:')) {
        email.to = [line.substring(3).trim()];
      } else if (line.trim() === '') {
        inBody = true;
      } else if (inBody) {
        bodyLines.push(line);
      }
    }

    email.body = bodyLines.join('\n');
    return email;
  }

  disconnect(): void {
    if (this.connection) {
      this.connection.end();
      this.connection = null;
    }
  }
}
