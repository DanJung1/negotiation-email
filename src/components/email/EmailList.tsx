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
    // Mock email data
    const mockEmails = [
      {
        id: '1',
        subject: 'Project Proposal - Q4 Marketing Campaign',
        from: 'sarah.johnson@company.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        isImportant: true,
        priority: 'HIGH',
        body: 'Hi there,\n\nI wanted to follow up on our discussion about the Q4 marketing campaign...',
        aiSummary: 'Marketing proposal for Q4 campaign with budget and ROI projections'
      },
      {
        id: '2',
        subject: 'Contract Negotiation - Software License',
        from: 'legal@techcorp.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        isImportant: false,
        priority: 'NORMAL',
        body: 'Dear Sir/Madam,\n\nWe are writing to discuss the renewal of your software license agreement...',
        aiSummary: 'Software license renewal offer with 10% discount for 2-year commitment'
      },
      {
        id: '3',
        subject: 'Meeting Reminder - Team Standup',
        from: 'calendar@company.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        isImportant: false,
        priority: 'LOW',
        body: 'This is a reminder that you have a team standup meeting in 15 minutes...',
        aiSummary: 'Meeting reminder for daily standup'
      },
      {
        id: '4',
        subject: 'URGENT: Server Maintenance Tonight',
        from: 'it@company.com',
        to: ['me@example.com'],
        receivedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: false,
        isImportant: true,
        priority: 'URGENT',
        body: 'URGENT NOTICE\n\nWe will be performing critical server maintenance tonight...',
        aiSummary: 'Critical server maintenance scheduled for tonight'
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
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
        <p className="text-sm text-gray-500">{emails.length} emails</p>
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
