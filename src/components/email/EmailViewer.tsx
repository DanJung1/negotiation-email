'use client';

import { useState, useEffect } from 'react';
import { Reply, ReplyAll, Forward, MoreVertical, Brain, TrendingUp } from 'lucide-react';
import { useAI } from '../ai/AIProvider';

interface EmailViewerProps {
  emailId: string | null;
  onNegotiationStart: () => void;
}

export function EmailViewer({ emailId, onNegotiationStart }: EmailViewerProps) {
  const [email, setEmail] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { isProcessing } = useAI();

  useEffect(() => {
    if (emailId) {
      setLoading(true);
      // Mock email data - match the structure from EmailList
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
      
      const emailData = mockEmails.find(e => e.id === emailId);
      setTimeout(() => {
        setEmail(emailData);
        setLoading(false);
      }, 500);
    }
  }, [emailId]);

  const handleAIAnalysis = async () => {
    if (!email) return;
    
    // Mock AI analysis
    const mockAnalysis = {
      sentiment: 'POSITIVE',
      priority: 'HIGH',
      category: 'BUSINESS',
      summary: 'This email contains a business proposal with specific metrics and ROI projections.'
    };
    
    setEmail({ ...email, aiAnalysis: mockAnalysis });
  };

  const handleStartNegotiation = () => {
    onNegotiationStart();
  };

  if (!emailId) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            <Brain className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select an email</h3>
          <p className="text-gray-500 dark:text-gray-400">Choose an email from the list to view its contents</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Email not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Email Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {email.subject}
              </h1>
              {email.negotiationStatus && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  email.negotiationStatus === 'active' ? 'bg-blue-500 text-white' :
                  email.negotiationStatus === 'pending' ? 'bg-yellow-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {email.negotiationStatus}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>From: {email.from} ({email.fromEmail})</span>
              <span>To: {email.to?.join(', ')}</span>
              <span>{new Date(email.receivedAt).toLocaleString()}</span>
            </div>
            {email.targetPrice && email.currentOffer && (
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Target: ${email.targetPrice}</span>
                <span className="text-gray-500 dark:text-gray-400">Current: ${email.currentOffer}</span>
                <span className="text-green-600 dark:text-green-400">Room: ${email.targetPrice - email.currentOffer}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAIAnalysis}
              disabled={isProcessing}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Brain className="h-4 w-4" />
              <span>AI Analysis</span>
            </button>
            
            <button
              onClick={handleStartNegotiation}
              className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Negotiate</span>
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Analysis Results */}
      {email.aiAnalysis && (
        <div className="p-4 bg-blue-900/20 border-b border-blue-700">
          <h3 className="text-sm font-medium text-blue-300 mb-2">AI Analysis</h3>
          <div className="text-sm text-blue-200">
            <p><strong>Sentiment:</strong> {email.aiAnalysis.sentiment}</p>
            <p><strong>Priority:</strong> {email.aiAnalysis.priority}</p>
            <p><strong>Category:</strong> {email.aiAnalysis.category}</p>
            {email.aiAnalysis.summary && (
              <p><strong>Summary:</strong> {email.aiAnalysis.summary}</p>
            )}
          </div>
        </div>
      )}

      {/* AI Negotiation Analysis Panel */}
      {email.negotiationStatus && email.negotiationStatus !== 'completed' && (
        <div className="p-4 bg-blue-50 dark:bg-gray-800 border-b border-blue-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">AI Negotiation Analysis</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Current Offer</p>
              <p className="text-gray-900 dark:text-white font-semibold">${email.currentOffer || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Your Target</p>
              <p className="text-gray-900 dark:text-white font-semibold">${email.targetPrice || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Negotiation Room</p>
              <p className="text-green-600 dark:text-green-400 font-semibold">
                ${email.targetPrice && email.currentOffer ? email.targetPrice - email.currentOffer : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">AI Suggestion</p>
              <p className="text-blue-600 dark:text-blue-300 text-xs">
                {email.negotiationStatus === 'active' ? 
                  `Counter with $${email.targetPrice && email.currentOffer ? Math.round((email.targetPrice + email.currentOffer) / 2) : 'N/A'}. Mention immediate payment and weekend pickup as value adds.` :
                  `Start with $${email.targetPrice ? Math.round(email.targetPrice * 0.9) : 'N/A'} to leave room for negotiation. Emphasize your serious buyer status.`
                }
              </p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Negotiation Strategy</h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Emphasize immediate payment capability</li>
              <li>• Highlight your serious buyer status</li>
              <li>• Mention specific value-adds (weekend pickup, cash payment)</li>
              <li>• Show appreciation for the item's condition</li>
            </ul>
          </div>
        </div>
      )}

      {/* Email Body */}
      <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-900">
        <div className="prose max-w-none">
          <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {email.body}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-white">
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-white">
            <ReplyAll className="h-4 w-4" />
            <span>Reply All</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-white">
            <Forward className="h-4 w-4" />
            <span>Forward</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 border border-blue-500 rounded-lg hover:bg-blue-700 transition-colors text-white">
            <Brain className="h-4 w-4" />
            <span>AI Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
}
