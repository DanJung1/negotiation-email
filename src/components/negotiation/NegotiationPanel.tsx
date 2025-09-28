'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Brain, Settings, Play, Pause, Send } from 'lucide-react';
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
  
  const { isProcessing } = useAI();

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
    if (!negotiation) return;

    // Mock AI response generation
    console.log('Generating negotiation response with strategy:', strategy, 'and persona:', persona);
    alert('AI Response Generated!\n\nStrategy: ' + strategy + '\nPersona: ' + persona + '\nTarget Price: $' + targetPrice);
  };

  const handleSendResponse = async () => {
    if (!negotiation) return;

    console.log('Sending negotiation response for:', negotiation.id);
    alert('Negotiation response sent!');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Negotiation Agent</h2>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Strategy Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Negotiation Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="COLLABORATIVE">Collaborative</option>
            <option value="COMPETITIVE">Competitive</option>
            <option value="ACCOMMODATING">Accommodating</option>
          </select>
        </div>

        {/* Persona Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AI Persona
          </label>
          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="FRIENDLY">Friendly</option>
            <option value="FIRM">Firm</option>
            <option value="AGGRESSIVE">Aggressive</option>
            <option value="PROFESSIONAL">Professional</option>
          </select>
        </div>

        {/* Target Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Price
          </label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter target price"
          />
        </div>

        {/* Auto Respond Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Auto Respond
          </label>
          <button
            onClick={() => setAutoRespond(!autoRespond)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              autoRespond ? 'bg-blue-600' : 'bg-gray-200'
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
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Current Status</h3>
            <div className="space-y-2 text-sm text-gray-600">
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
    </div>
  );
}
