# AI Email Browser Setup Guide

## 🚀 Quick Start

Your AI Email Browser is now running! Visit: **http://localhost:3002**

## 🔑 Setting Up Your Gemini API Key

### Option 1: Through the App (Recommended)
1. Open the app in your browser
2. Click "Try Demo" on the landing page
3. You'll see an API key setup screen
4. Click "Get API Key" to visit Google AI Studio
5. Sign in with your Google account
6. Create a new API key
7. Copy and paste it into the app

### Option 2: Environment Variable
1. Create a `.env.local` file in the project root
2. Add: `NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here`
3. Restart the development server

### Option 3: Demo Mode
- Click "Skip and use demo mode" to try the app with simulated AI responses

## 🎯 Features to Test

### 1. Landing Page
- Modern, professional landing page showcasing AI capabilities
- Feature grid with detailed explanations
- Call-to-action buttons

### 2. Email Interface
- Virtualized email list for performance
- Priority-based email organization
- AI-powered email analysis

### 3. AI Features
- **Email Analysis**: Click "AI Analysis" on any email
- **Smart Summarization**: Automatic thread summarization
- **Priority Detection**: AI-powered email prioritization
- **Sentiment Analysis**: Understand email tone

### 4. Negotiation Agent
- Switch to "Negotiations" view in the sidebar
- Configure negotiation strategies (Collaborative, Competitive, Accommodating)
- Set AI personas (Friendly, Firm, Aggressive, Professional)
- Auto-response capabilities

## 🔧 Technical Details

### API Integration
- Real Gemini API integration for production use
- Fallback to mock responses for demo mode
- Secure API key storage in localStorage

### Architecture
- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: TailwindCSS 3.3
- **Icons**: Lucide React
- **State Management**: React Context + Local Storage

### File Structure
```
src/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── LandingPage.tsx    # New landing page
│   ├── ApiKeySetup.tsx    # API key configuration
│   ├── EmailBrowser.tsx   # Main email interface
│   ├── auth/              # Authentication components
│   ├── email/             # Email management
│   ├── layout/            # UI layout components
│   └── negotiation/       # AI negotiation features
└── services/              # Business logic
    ├── ai/                # AI services (Gemini integration)
    ├── email/             # Email providers
    └── negotiation/        # Negotiation engine
```

## 🚀 Next Steps

1. **Get your Gemini API key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Test the AI features** with real API integration
3. **Customize the negotiation strategies** for your use case
4. **Deploy to production** when ready

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Notes

- The app works in demo mode without an API key
- All AI features are fully functional with a real Gemini API key
- The landing page is designed to showcase enterprise capabilities
- The email interface is optimized for performance with virtualization

Enjoy your AI-powered email browser! 🎉
