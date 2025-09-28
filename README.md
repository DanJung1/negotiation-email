# AI Email Browser

A next-generation AI-enabled email browser with intelligent features including AI-powered summarization, smart replies, and automated negotiation agents.

## Features

### Core Email Management
- **Fast, Modern Interface**: Built with React and Next.js for optimal performance
- **Virtualized Lists**: Efficient rendering of large email threads using React Window
- **Keyboard Navigation**: Full keyboard support for power users
- **Offline Support**: Cached email data for offline reading

### AI-Powered Features
- **Smart Summarization**: AI-powered email thread summarization using Google Gemini
- **Intelligent Prioritization**: Automatic email classification by urgency and importance
- **Smart Replies**: AI-generated professional email responses
- **Sentiment Analysis**: Understand the tone and sentiment of incoming emails

### Negotiation Agent
- **Automated Negotiation**: AI agents that negotiate on your behalf
- **Multiple Strategies**: Collaborative, competitive, accommodating approaches
- **Persona Selection**: Choose from friendly, firm, aggressive, or professional personas
- **Auto-Response Mode**: Fully autonomous negotiation with user approval
- **Negotiation Dashboard**: Track ongoing deals and negotiation history

### Authentication & Security
- **Auth0 Integration**: Secure OAuth2 authentication
- **Multi-Provider Support**: Gmail, Outlook, and IMAP integration
- **End-to-End Encryption**: Secure email content handling
- **Role-Based Access**: User vs. AI-agent automation controls

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: TailwindCSS for modern, responsive design
- **UI Components**: Custom components with Framer Motion animations
- **State Management**: React Context for global state
- **Virtualization**: React Window for efficient list rendering

### Backend
- **Runtime**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for performance optimization
- **Email Integration**: IMAP, Gmail API, Outlook API
- **AI Integration**: Google Gemini API

### AI & Automation
- **Primary LLM**: Google Gemini for text generation and analysis
- **AgentMail API**: Enhanced AI inbox capabilities
- **Negotiation Engine**: Custom negotiation logic with AI enhancement
- **Multi-Agent System**: Support for multiple AI personas

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis server
- Auth0 account
- Google Gemini API key
- AgentMail API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-email-browser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/ai_email_browser"
   
   # Auth0
   AUTH0_SECRET="your-auth0-secret"
   AUTH0_BASE_URL="http://localhost:3000"
   AUTH0_ISSUER_BASE_URL="https://your-domain.auth0.com"
   AUTH0_CLIENT_ID="your-auth0-client-id"
   AUTH0_CLIENT_SECRET="your-auth0-client-secret"
   
   # Google Gemini AI
   GEMINI_API_KEY="your-gemini-api-key"
   
   # Redis
   REDIS_URL="redis://localhost:6379"
   
   # AgentMail API (optional)
   AGENTMAIL_API_KEY="your-agentmail-api-key"
   AGENTMAIL_BASE_URL="https://api.agentmail.com"
   ```

4. **Set up the database**
   ```bash
   # Create the database
   createdb ai_email_browser
   
   # Run the schema
   psql ai_email_browser < schema.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Auth0 authentication
│   │   ├── emails/        # Email management
│   │   ├── ai/            # AI features
│   │   └── negotiations/ # Negotiation management
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── ai/                # AI-related components
│   ├── email/             # Email components
│   ├── layout/            # Layout components
│   └── negotiation/       # Negotiation components
└── services/              # Business logic
    ├── ai/                # AI services
    ├── email/             # Email services
    └── negotiation/       # Negotiation services
```

## Key Features Implementation

### AI Email Analysis
The system uses Google Gemini to analyze emails for:
- Sentiment analysis (positive, neutral, negative)
- Priority classification (low, normal, high, urgent)
- Category detection (business, personal, marketing, support)
- Automatic summarization
- Keyword extraction

### Negotiation Agent
The negotiation system includes:
- **Strategy Selection**: Choose from collaborative, competitive, or accommodating approaches
- **Persona Configuration**: Set AI personality (friendly, firm, aggressive, professional)
- **Target Setting**: Define negotiation goals and acceptable ranges
- **Auto-Response**: Configure automatic responses with user approval
- **Progress Tracking**: Monitor negotiation status and outcomes

### Email Integration
Supports multiple email providers:
- **Gmail**: OAuth2 integration with Gmail API
- **Outlook**: Microsoft Graph API integration
- **IMAP**: Generic IMAP support for any email provider
- **AgentMail**: Enhanced AI inbox capabilities

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
npm start
```

### Database Migrations
```bash
npm run db:migrate
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.