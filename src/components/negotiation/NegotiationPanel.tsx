'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Brain, Settings, Play, Pause, Send } from 'lucide-react';
import { GeminiService } from '@/services/ai/GeminiService';
import { ReplyModal } from '@/components/email/ReplyModal';
import { useAI } from '../ai/AIProvider';

interface NegotiationPanelProps {
  emailId: string | null;
}

export function NegotiationPanel({ emailId }: NegotiationPanelProps) {
  const [negotiation, setNegotiation] = useState<any>(null);
  const [strategy, setStrategy] = useState<'COLLABORATIVE' | 'COMPETITIVE' | 'ACCOMMODATING'>('COLLABORATIVE');
  const [persona, setPersona] = useState<'FRIENDLY' | 'FIRM' | 'AGGRESSIVE' | 'PROFESSIONAL'>('FRIENDLY');
  const [targetPrice, setTargetPrice] = useState<number>(0);
  const [autoRespond, setAutoRespond] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<any>(null);
  
  const { isProcessing } = useAI();
  const geminiService = new GeminiService();

  useEffect(() => {
    if (emailId) {
      // Mock negotiation data
      const mockNegotiation = {
        id: 'neg_1',
        emailId,
        strategy: 'COLLABORATIVE',
        persona: 'FRIENDLY',
        targetPrice: 2000,
        currentOffer: 2500,
        status: 'ACTIVE'
      };
      
      setNegotiation(mockNegotiation);
      setStrategy(mockNegotiation.strategy);
      setPersona(mockNegotiation.persona);
      setTargetPrice(mockNegotiation.targetPrice);
      setIsActive(mockNegotiation.status === 'ACTIVE');
    }
  }, [emailId]);

  const handleStartNegotiation = async () => {
    if (!emailId) return;

    const newNegotiation = {
      id: 'neg_' + Date.now(),
      emailId,
      strategy,
      persona,
      targetPrice,
      autoRespond,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    
    setNegotiation(newNegotiation);
    setIsActive(true);
  };

  const handleGenerateResponse = async () => {
    if (!negotiation || !emailId) return;

    console.log('Generating AI response for email:', emailId);
    console.log('Strategy:', strategy, 'Persona:', persona, 'Target Price:', targetPrice);

    try {
      // Get the current email data
      const mockEmails = [
        {
          id: '1',
          subject: 'Price negotiation for MacBook Pro',
          from: 'John Smith',
          fromEmail: 'john.smith@email.com',
          body: 'Hi there,\n\nI saw your listing for the MacBook Pro 16" M2 Max. The specs look great and exactly what I need for my video editing work.\n\nYour asking price is $2,200, but I was wondering if you\'d consider $1,800? I\'m ready to pay immediately and can pick it up this weekend.\n\nI\'ve been looking for this exact model for a while, and yours seems to be in excellent condition based on the photos.\n\nLet me know what you think!\n\nBest regards,\nJohn Smith',
          currentOffer: 1800,
          negotiationStatus: 'active'
        },
        {
          id: '2',
          subject: 'Car purchase discussion',
          from: 'Sarah Johnson',
          fromEmail: 'sarah.johnson@email.com',
          body: 'Thank you for your interest in the Honda Civic. My asking price is $15,000, but I\'m open to reasonable offers.\n\nThe car has been well-maintained with all service records. It\'s a 2019 model with 45,000 miles.\n\nI\'m flexible on the price if you\'re a serious buyer. What\'s your budget range?\n\nBest,\nSarah',
          currentOffer: null,
          negotiationStatus: 'pending'
        },
        {
          id: '3',
          subject: 'Freelance project rate',
          from: 'Mike Chen',
          fromEmail: 'mike.chen@freelance.com',
          body: 'I would like to discuss the hourly rate for the web development project. I typically charge $75/hour for React development.\n\nHowever, for this project scope, I could do $65/hour if we can agree on a 3-month timeline.\n\nWhat do you think? I\'m excited about the project and would love to work together.\n\nThanks,\nMike',
          currentOffer: 65,
          negotiationStatus: 'completed'
        },
        {
          id: '4',
          subject: 'House rental negotiation',
          from: 'David Brown',
          fromEmail: 'david.brown@email.com',
          body: 'I am interested in renting your property. Could we discuss the monthly rent?\n\nI saw the listing at $2,500/month, but my budget is around $2,200. I\'m a responsible tenant with excellent references and can provide a security deposit.\n\nI\'m looking for a 2-year lease and can pay 3 months in advance. Would you consider this arrangement?\n\nLooking forward to hearing from you.\n\nBest regards,\nDavid',
          currentOffer: 2200,
          negotiationStatus: 'active'
        },
        {
          id: '5',
          subject: 'Meeting confirmation',
          from: 'Lisa Wong',
          fromEmail: 'lisa.wong@company.com',
          body: 'Just confirming our meeting tomorrow at 2 PM. Looking forward to it!\n\nBest,\nLisa',
          currentOffer: null,
          negotiationStatus: null
        },
        {
          id: '6',
          subject: 'Consulting rate discussion',
          from: 'Alex Rodriguez',
          fromEmail: 'alex.rodriguez@consulting.com',
          body: 'I\'d like to discuss the consulting rate for the digital transformation project.\n\nMy standard rate is $200/hour, but I\'m willing to negotiate for a long-term engagement. For a 6-month project, I could do $150/hour.\n\nI bring 10+ years of experience in digital transformation and have worked with Fortune 500 companies.\n\nWhat\'s your budget for this project?\n\nBest,\nAlex',
          currentOffer: 150,
          negotiationStatus: 'active'
        }
      ];

      const email = mockEmails.find(e => e.id === emailId);
      if (!email) return;

      setCurrentEmail(email);

      // Generate AI response using Gemini
      const response = await geminiService.generateNegotiationResponse(
        email,
        strategy,
        persona,
        targetPrice
      );

      console.log('AI Response generated:', response);
      console.log('Setting aiResponse to:', response);
      setAiResponse(response);
      console.log('Setting showReplyModal to true');
      setShowReplyModal(true);
      console.log('Reply modal should be showing now');
      console.log('Current showReplyModal state:', showReplyModal);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      alert('Failed to generate AI response. Please try again.');
    }
  };

  const handleSendResponse = async () => {
    if (!negotiation) return;

    console.log('Sending negotiation response for:', negotiation.id);
    alert('Negotiation response sent!');
  };

  const handleSendReply = (response: string) => {
    console.log('Sending AI-generated reply:', response);
    alert('Reply sent successfully!');
    setShowReplyModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Negotiation Agent</h2>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Strategy Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Negotiation Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as any)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="COLLABORATIVE">Collaborative</option>
            <option value="COMPETITIVE">Competitive</option>
            <option value="ACCOMMODATING">Accommodating</option>
          </select>
        </div>

        {/* Persona Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI Persona
          </label>
          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value as any)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="FRIENDLY">Friendly</option>
            <option value="FIRM">Firm</option>
            <option value="AGGRESSIVE">Aggressive</option>
            <option value="PROFESSIONAL">Professional</option>
          </select>
        </div>

        {/* Target Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Price
          </label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(Number(e.target.value))}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter target price"
          />
        </div>

        {/* Auto Respond Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Auto Respond
          </label>
          <button
            onClick={() => setAutoRespond(!autoRespond)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              autoRespond ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoRespond ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Negotiation Status */}
        {negotiation && (
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Current Status</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Status:</strong> {negotiation.status}</p>
              <p><strong>Current Offer:</strong> ${negotiation.currentOffer || 'N/A'}</p>
              <p><strong>Target:</strong> ${negotiation.targetPrice || 'N/A'}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isActive ? (
            <button
              onClick={handleStartNegotiation}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Start Negotiation</span>
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={handleGenerateResponse}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Brain className="h-4 w-4" />
                <span>Generate Response</span>
              </button>
              
              <button
                onClick={handleSendResponse}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>Send Response</span>
              </button>
              
              <button
                onClick={() => setIsActive(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Pause className="h-4 w-4" />
                <span>Pause Negotiation</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        isOpen={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        email={currentEmail}
        aiResponse={aiResponse}
        onSend={handleSendReply}
      />
    </div>
  );
}
