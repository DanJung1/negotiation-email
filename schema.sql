-- AI Email Browser Database Schema
-- This file contains the SQL schema for the PostgreSQL database

-- Users table
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    auth0_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Email accounts table
CREATE TABLE email_accounts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- 'gmail', 'outlook', 'imap'
    email TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Email threads table
CREATE TABLE email_threads (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    participants TEXT[] NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Emails table
CREATE TABLE emails (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id TEXT NOT NULL REFERENCES email_accounts(id) ON DELETE CASCADE,
    thread_id TEXT REFERENCES email_threads(id),
    message_id TEXT UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    from_email TEXT NOT NULL,
    to_emails TEXT[] NOT NULL,
    cc_emails TEXT[] DEFAULT '{}',
    bcc_emails TEXT[] DEFAULT '{}',
    body TEXT NOT NULL,
    html_body TEXT,
    is_read BOOLEAN DEFAULT false,
    is_important BOOLEAN DEFAULT false,
    priority TEXT DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
    received_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- AI analysis fields
    ai_summary TEXT,
    ai_sentiment TEXT CHECK (ai_sentiment IN ('POSITIVE', 'NEUTRAL', 'NEGATIVE')),
    ai_category TEXT,
    ai_keywords TEXT[] DEFAULT '{}'
);

-- AI settings table
CREATE TABLE ai_settings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    negotiation_mode BOOLEAN DEFAULT false,
    auto_reply BOOLEAN DEFAULT false,
    summarization BOOLEAN DEFAULT true,
    prioritization BOOLEAN DEFAULT true,
    persona TEXT DEFAULT 'FRIENDLY' CHECK (persona IN ('FRIENDLY', 'FIRM', 'AGGRESSIVE', 'PROFESSIONAL')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Negotiations table
CREATE TABLE negotiations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email_id TEXT UNIQUE NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
    thread_id TEXT NOT NULL,
    target_price DECIMAL(10,2),
    current_offer DECIMAL(10,2),
    strategy TEXT DEFAULT 'COLLABORATIVE' CHECK (strategy IN ('COLLABORATIVE', 'COMPETITIVE', 'ACCOMMODATING', 'AVOIDING', 'COMPROMISING')),
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'CANCELLED', 'PAUSED')),
    ai_persona TEXT DEFAULT 'FRIENDLY' CHECK (ai_persona IN ('FRIENDLY', 'FIRM', 'AGGRESSIVE', 'PROFESSIONAL')),
    auto_respond BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_emails_user_id ON emails(user_id);
CREATE INDEX idx_emails_account_id ON emails(account_id);
CREATE INDEX idx_emails_thread_id ON emails(thread_id);
CREATE INDEX idx_emails_received_at ON emails(received_at);
CREATE INDEX idx_emails_priority ON emails(priority);
CREATE INDEX idx_emails_is_read ON emails(is_read);
CREATE INDEX idx_emails_is_important ON emails(is_important);

CREATE INDEX idx_negotiations_user_id ON negotiations(user_id);
CREATE INDEX idx_negotiations_email_id ON negotiations(email_id);
CREATE INDEX idx_negotiations_status ON negotiations(status);

CREATE INDEX idx_email_accounts_user_id ON email_accounts(user_id);
CREATE INDEX idx_email_accounts_provider ON email_accounts(provider);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_accounts_updated_at BEFORE UPDATE ON email_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_threads_updated_at BEFORE UPDATE ON email_threads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emails_updated_at BEFORE UPDATE ON emails FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_settings_updated_at BEFORE UPDATE ON ai_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_negotiations_updated_at BEFORE UPDATE ON negotiations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
