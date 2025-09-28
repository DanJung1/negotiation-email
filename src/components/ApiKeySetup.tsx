'use client';

import { useState } from 'react';
import { Key, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

export function ApiKeySetup({ onApiKeySet }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    
    // Simulate API key validation
    setTimeout(() => {
      setIsValidating(false);
      if (apiKey.length > 20) {
        setIsValid(true);
        onApiKeySet(apiKey);
      } else {
        setIsValid(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Key className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Setup Gemini API Key
          </h2>
          <p className="text-gray-600">
            Enter your Google Gemini API key to enable AI features
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {isValid === false && (
              <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>Invalid API key format</span>
              </p>
            )}
            {isValid === true && (
              <p className="mt-2 text-sm text-green-600 flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>API key validated successfully!</span>
              </p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">How to get your API key:</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Visit Google AI Studio</li>
              <li>2. Sign in with your Google account</li>
              <li>3. Create a new API key</li>
              <li>4. Copy and paste it here</li>
            </ol>
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm mt-2"
            >
              <span>Get API Key</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <button
            type="submit"
            disabled={isValidating || !apiKey.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Validating...</span>
              </>
            ) : (
              <span>Continue to Demo</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => onApiKeySet('demo')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Skip and use demo mode
          </button>
        </div>
      </div>
    </div>
  );
}
