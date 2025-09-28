'use client';

import { Mail, Shield, Brain, Zap } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            AI Email Browser
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Next-generation intelligent email management
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Brain className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">AI-powered summarization</span>
          </div>
          <div className="flex items-center space-x-3">
            <Zap className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">Smart negotiation agents</span>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">Secure & private</span>
          </div>
        </div>

        <div>
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Sign in (Demo)
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
