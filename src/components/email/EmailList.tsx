'use client';

import { useState, useEffect } from 'react';
import { EmailItem } from './EmailItem';

interface EmailListProps {
  onEmailSelect: (emailId: string) => void;
  selectedEmailId: string | null;
}

export function EmailList({ onEmailSelect, selectedEmailId }: EmailListProps) {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock email data focused on negotiations
    const mockEmails = [
      {
        id: '1',
        subject: 'Price negotiation for MacBook Pro',
        from: 'John Smith',
        fromEmail: 'john.smith@email.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        isRead: false,
        isImportant: true,
        priority: 'HIGH',
        negotiationStatus: 'active',
        targetPrice: 2000,
        currentOffer: 1800,
        body: 'Hi there,\n\nI saw your listing for the MacBook Pro 16" M2 Max. The specs look great and exactly what I need for my video editing work.\n\nYour asking price is $2,200, but I was wondering if you\'d consider $1,800? I\'m ready to pay immediately and can pick it up this weekend.\n\nI\'ve been looking for this exact model for a while, and yours seems to be in excellent condition based on the photos.\n\nLet me know what you think!\n\nBest regards,\nJohn Smith',
        aiSummary: 'Buyer offering $1,800 for MacBook Pro (asking $2,200). Ready for immediate payment.'
      },
      {
        id: '2',
        subject: 'Car purchase discussion',
        from: 'Sarah Johnson',
        fromEmail: 'sarah.johnson@email.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        isImportant: false,
        priority: 'NORMAL',
        negotiationStatus: 'pending',
        targetPrice: 15000,
        currentOffer: null,
        body: 'Thank you for your interest in the Honda Civic. My asking price is $15,000, but I\'m open to reasonable offers.\n\nThe car has been well-maintained with all service records. It\'s a 2019 model with 45,000 miles.\n\nI\'m flexible on the price if you\'re a serious buyer. What\'s your budget range?\n\nBest,\nSarah',
        aiSummary: 'Seller asking $15,000 for Honda Civic, open to offers. Well-maintained 2019 model.'
      },
      {
        id: '3',
        subject: 'Freelance project rate',
        from: 'Mike Chen',
        fromEmail: 'mike.chen@freelance.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        isImportant: false,
        priority: 'NORMAL',
        negotiationStatus: 'completed',
        targetPrice: 75,
        currentOffer: 75,
        body: 'I would like to discuss the hourly rate for the web development project. I typically charge $75/hour for React development.\n\nHowever, for this project scope, I could do $65/hour if we can agree on a 3-month timeline.\n\nWhat do you think? I\'m excited about the project and would love to work together.\n\nThanks,\nMike',
        aiSummary: 'Freelancer offering $65/hour (down from $75) for 3-month React project.'
      },
      {
        id: '4',
        subject: 'House rental negotiation',
        from: 'David Brown',
        fromEmail: 'david.brown@email.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        isImportant: true,
        priority: 'HIGH',
        negotiationStatus: 'active',
        targetPrice: 2500,
        currentOffer: 2200,
        body: 'I am interested in renting your property. Could we discuss the monthly rent?\n\nI saw the listing at $2,500/month, but my budget is around $2,200. I\'m a responsible tenant with excellent references and can provide a security deposit.\n\nI\'m looking for a 2-year lease and can pay 3 months in advance. Would you consider this arrangement?\n\nLooking forward to hearing from you.\n\nBest regards,\nDavid',
        aiSummary: 'Potential tenant offering $2,200/month (asking $2,500) with 2-year lease and advance payment.'
      },
      {
        id: '5',
        subject: 'Meeting confirmation',
        from: 'Lisa Wong',
        fromEmail: 'lisa.wong@company.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        isImportant: false,
        priority: 'LOW',
        negotiationStatus: null,
        targetPrice: null,
        currentOffer: null,
        body: 'Just confirming our meeting tomorrow at 2 PM. Looking forward to it!\n\nBest,\nLisa',
        aiSummary: 'Meeting confirmation for tomorrow at 2 PM.'
      },
      {
        id: '6',
        subject: 'Consulting rate discussion',
        from: 'Alex Rodriguez',
        fromEmail: 'alex.rodriguez@consulting.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        isImportant: true,
        priority: 'HIGH',
        negotiationStatus: 'active',
        targetPrice: 200,
        currentOffer: 150,
        body: 'I\'d like to discuss the consulting rate for the digital transformation project.\n\nMy standard rate is $200/hour, but I\'m willing to negotiate for a long-term engagement. For a 6-month project, I could do $150/hour.\n\nI bring 10+ years of experience in digital transformation and have worked with Fortune 500 companies.\n\nWhat\'s your budget for this project?\n\nBest,\nAlex',
        aiSummary: 'Consultant offering $150/hour (down from $200) for 6-month digital transformation project.'
      }
    ];

    setTimeout(() => {
      setEmails(mockEmails);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Inbox</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{emails.length} new</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-2.5">
            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            isSelected={selectedEmailId === email.id}
            onClick={() => onEmailSelect(email.id)}
          />
        ))}
      </div>
    </div>
  );
}
