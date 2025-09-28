'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './layout/Sidebar';
import { EmailList } from './email/EmailList';
import { EmailViewer } from './email/EmailViewer';
import { NegotiationPanel } from './negotiation/NegotiationPanel';
import { Header } from './layout/Header';
import { ApiKeySetup } from './ApiKeySetup';

export function EmailBrowser() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'inbox' | 'negotiations' | 'ai'>('inbox');
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeySetup, setShowApiKeySetup] = useState(false);
  const user = { name: 'Demo User', email: 'demo@example.com' };

  useEffect(() => {
    // Check if API key is already set
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setShowApiKeySetup(true);
    }
  }, []);

  const handleApiKeySet = (key: string) => {
    if (key !== 'demo') {
      localStorage.setItem('gemini_api_key', key);
    }
    setApiKey(key);
    setShowApiKeySetup(false);
  };

  if (showApiKeySetup) {
    return <ApiKeySetup onApiKeySet={handleApiKeySet} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <Header user={user} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
        />
        
        <div className="flex-1 flex">
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <EmailList 
              onEmailSelect={setSelectedEmail}
              selectedEmailId={selectedEmail}
            />
          </div>
          
          <div className="flex-1 flex">
            <div className="flex-1">
              <EmailViewer 
                emailId={selectedEmail}
                onNegotiationStart={() => setActiveView('negotiations')}
              />
            </div>
            
            {activeView === 'negotiations' && (
              <div className="w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <NegotiationPanel emailId={selectedEmail} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
