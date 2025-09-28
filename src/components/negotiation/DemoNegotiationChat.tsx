'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft, Settings, DollarSign } from 'lucide-react';
import { GeminiService } from '@/services/ai/GeminiService';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function DemoNegotiationChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [negotiationSettings, setNegotiationSettings] = useState({
    item: 'MacBook Pro 16" M2 Max',
    aiTargetPrice: 1800,
    userAskingPrice: 2200,
    aiPersona: 'FRIENDLY',
    aiStrategy: 'COLLABORATIVE'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiService = new GeminiService();

  const sampleScenarios = [
    {
      name: "MacBook Pro Negotiation",
      item: "MacBook Pro 16\" M2 Max",
      userAskingPrice: 2200,
      aiTargetPrice: 1800,
      aiPersona: "FRIENDLY",
      aiStrategy: "COLLABORATIVE",
      description: "Friendly buyer looking for a good deal on a MacBook Pro"
    },
    {
      name: "Car Sale Negotiation",
      item: "2019 Honda Civic",
      userAskingPrice: 15000,
      aiTargetPrice: 12000,
      aiPersona: "FIRM",
      aiStrategy: "COMPETITIVE",
      description: "Firm buyer negotiating for a Honda Civic"
    },
    {
      name: "Freelance Project",
      item: "Web Development Project",
      userAskingPrice: 5000,
      aiTargetPrice: 3500,
      aiPersona: "PROFESSIONAL",
      aiStrategy: "COLLABORATIVE",
      description: "Professional client negotiating project rates"
    },
    {
      name: "House Rental",
      item: "2-Bedroom Apartment",
      userAskingPrice: 2500,
      aiTargetPrice: 2000,
      aiPersona: "AGGRESSIVE",
      aiStrategy: "COMPETITIVE",
      description: "Aggressive tenant negotiating rent"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with AI's first message
    const initialMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hi! I'm interested in your ${negotiationSettings.item}. I saw your listing and I'm ready to make an offer. I'm looking to pay around $${negotiationSettings.aiTargetPrice}, but I'm open to discussing the price. What do you think?`,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [negotiationSettings]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Generate AI response using Gemini
      const aiResponse = await generateAIResponse(inputMessage, messages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm having trouble processing your message right now. Could you please try again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    try {
      const conversationContext = conversationHistory
        .slice(-6) // Last 6 messages for context
        .map(msg => `${msg.type === 'user' ? 'Seller' : 'Buyer'}: ${msg.content}`)
        .join('\n');

      const prompt = `You are an AI buyer negotiating for a ${negotiationSettings.item}. 

Your negotiation parameters:
- Target price: $${negotiationSettings.aiTargetPrice}
- Seller's asking price: $${negotiationSettings.userAskingPrice}
- Strategy: ${negotiationSettings.aiStrategy}
- Persona: ${negotiationSettings.aiPersona}

Conversation history:
${conversationContext}

Current seller message: ${userMessage}

Respond as the buyer. Be ${negotiationSettings.aiPersona.toLowerCase()} and use a ${negotiationSettings.aiStrategy.toLowerCase()} approach. 
- Stay focused on getting closer to your target price of $${negotiationSettings.aiTargetPrice}
- Be respectful but firm about your budget
- Look for win-win solutions
- Keep responses conversational and natural (2-3 sentences max)
- Don't reveal your exact target price immediately

Generate only the response message, no additional formatting.`;

      const apiKey = geminiService['apiKey'] || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      console.log('Demo Negotiation - API Key check:', {
        hasApiKey: !!apiKey,
        apiKeyStart: apiKey ? apiKey.substring(0, 10) + '...' : 'None',
        isDemo: apiKey === 'demo' || apiKey === 'your_gemini_api_key_here'
      });
      
      if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === 'demo') {
        // Use fallback responses if no API key
        const fallbackResponses = {
          'COLLABORATIVE': "I appreciate your response. Let's work together to find a price that works for both of us. What's the lowest you'd be willing to go?",
          'COMPETITIVE': "I understand your position, but I need to stick to my budget. I'm looking for the best deal possible.",
          'ACCOMMODATING': "I value your time and want to make this work. I'm willing to be flexible if you can meet me partway."
        };
        
        return fallbackResponses[negotiationSettings.aiStrategy as keyof typeof fallbackResponses] || 
               "I'm interested in working out a fair price. What do you think would be reasonable?";
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Gemini API Response:', data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Invalid API response structure:', data);
        throw new Error('Invalid API response structure');
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('AI response generation failed:', error);
      // Fallback responses based on negotiation strategy
      const fallbackResponses = {
        'COLLABORATIVE': "I appreciate your response. Let's work together to find a price that works for both of us. What's the lowest you'd be willing to go?",
        'COMPETITIVE': "I understand your position, but I need to stick to my budget. I'm looking for the best deal possible.",
        'ACCOMMODATING': "I value your time and want to make this work. I'm willing to be flexible if you can meet me partway."
      };
      
      return fallbackResponses[negotiationSettings.aiStrategy as keyof typeof fallbackResponses] || 
             "I'm interested in working out a fair price. What do you think would be reasonable?";
    }
  };

  const resetNegotiation = () => {
    setMessages([]);
    const initialMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hi! I'm interested in your ${negotiationSettings.item}. I saw your listing and I'm ready to make an offer. I'm looking to pay around $${negotiationSettings.aiTargetPrice}, but I'm open to discussing the price. What do you think?`,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  };

  const loadScenario = (scenario: any) => {
    setNegotiationSettings({
      item: scenario.item,
      aiTargetPrice: scenario.aiTargetPrice,
      userAskingPrice: scenario.userAskingPrice,
      aiPersona: scenario.aiPersona,
      aiStrategy: scenario.aiStrategy
    });
    setShowScenarios(false);
    resetNegotiation();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Demo Negotiation</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You're the seller • AI is the buyer • Target: ${negotiationSettings.aiTargetPrice}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowScenarios(!showScenarios)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Scenarios
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={resetNegotiation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Item for Sale
              </label>
              <input
                type="text"
                value={negotiationSettings.item}
                onChange={(e) => setNegotiationSettings(prev => ({ ...prev, item: e.target.value }))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Asking Price
              </label>
              <input
                type="number"
                value={negotiationSettings.userAskingPrice}
                onChange={(e) => setNegotiationSettings(prev => ({ ...prev, userAskingPrice: Number(e.target.value) }))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Target Price
              </label>
              <input
                type="number"
                value={negotiationSettings.aiTargetPrice}
                onChange={(e) => setNegotiationSettings(prev => ({ ...prev, aiTargetPrice: Number(e.target.value) }))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Persona
              </label>
              <select
                value={negotiationSettings.aiPersona}
                onChange={(e) => setNegotiationSettings(prev => ({ ...prev, aiPersona: e.target.value }))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                <option value="FRIENDLY">Friendly</option>
                <option value="FIRM">Firm</option>
                <option value="AGGRESSIVE">Aggressive</option>
                <option value="PROFESSIONAL">Professional</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Scenarios Panel */}
      {showScenarios && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sample Negotiation Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleScenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => loadScenario(scenario)}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{scenario.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{scenario.description}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>Item: {scenario.item}</p>
                  <p>Your Price: ${scenario.userAskingPrice} • AI Target: ${scenario.aiTargetPrice}</p>
                  <p>AI Style: {scenario.aiPersona} • Strategy: {scenario.aiStrategy}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'ai' && (
                  <Bot className="h-4 w-4 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                )}
                {message.type === 'user' && (
                  <User className="h-4 w-4 mt-1 text-blue-200 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your response as the seller..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
