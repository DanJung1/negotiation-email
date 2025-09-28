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
      // Mock email data
      const mockEmails = [
        {
          id: '1',
          subject: 'Project Proposal - Q4 Marketing Campaign',
          from: 'sarah.johnson@company.com',
          to: ['me@example.com'],
          receivedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          body: 'Hi there,\n\nI wanted to follow up on our discussion about the Q4 marketing campaign. I\'ve prepared a detailed proposal that outlines our strategy, budget requirements, and expected outcomes.\n\nKey highlights:\n- 15% increase in brand awareness\n- 25% boost in lead generation\n- ROI of 3.2x within 6 months\n\nI\'d love to schedule a call to discuss this further. Are you available for a 30-minute meeting this week?\n\nBest regards,\nSarah',
          htmlBody: '<p>Hi there,</p><p>I wanted to follow up on our discussion about the Q4 marketing campaign...</p>'
        },
        {
          id: '2',
          subject: 'Contract Negotiation - Software License',
          from: 'legal@techcorp.com',
          to: ['me@example.com'],
          receivedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          body: 'Dear Sir/Madam,\n\nWe are writing to discuss the renewal of your software license agreement. Our current pricing is $2,500 per month for the enterprise package.\n\nWe are willing to offer a 10% discount for a 2-year commitment, bringing the monthly cost to $2,250.\n\nPlease let us know if you would like to proceed with this offer.\n\nRegards,\nLegal Team',
          htmlBody: '<p>Dear Sir/Madam,</p><p>We are writing to discuss the renewal...</p>'
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
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <Brain className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select an email</h3>
          <p className="text-gray-500">Choose an email from the list to view its contents</p>
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
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Email not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Email Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              {email.subject}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>From: {email.from}</span>
              <span>To: {email.to?.join(', ')}</span>
              <span>{new Date(email.receivedAt).toLocaleString()}</span>
            </div>
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
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Analysis Results */}
      {email.aiAnalysis && (
        <div className="p-4 bg-blue-50 border-b border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">AI Analysis</h3>
          <div className="text-sm text-blue-800">
            <p><strong>Sentiment:</strong> {email.aiAnalysis.sentiment}</p>
            <p><strong>Priority:</strong> {email.aiAnalysis.priority}</p>
            <p><strong>Category:</strong> {email.aiAnalysis.category}</p>
            {email.aiAnalysis.summary && (
              <p><strong>Summary:</strong> {email.aiAnalysis.summary}</p>
            )}
          </div>
        </div>
      )}

      {/* Email Body */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: email.htmlBody || email.body }}
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ReplyAll className="h-4 w-4" />
            <span>Reply All</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Forward className="h-4 w-4" />
            <span>Forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
