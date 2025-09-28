import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { EmailService } from '@/services/email/EmailService';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const emailService = new EmailService();
    const emails = await emailService.getEmails();

    return NextResponse.json({ emails });
  } catch (error) {
    console.error('Failed to fetch emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { to, subject, body: emailBody, htmlBody } = body;

    const emailService = new EmailService();
    const success = await emailService.sendEmail({
      to,
      subject,
      body: emailBody,
      htmlBody,
    });

    if (success) {
      return NextResponse.json({ message: 'Email sent successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
