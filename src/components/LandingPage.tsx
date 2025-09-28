'use client';

import { useState } from 'react';
import { 
  Mail, 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp, 
  MessageSquare, 
  BarChart3, 
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Lock
} from 'lucide-react';
import { EmailBrowser } from './EmailBrowser';

export function LandingPage() {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <EmailBrowser />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Email Browser</span>
            </div>
            <button
              onClick={() => setShowDemo(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Future of
              <span className="text-blue-600 block">Email Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your inbox with AI-powered intelligence. Automate negotiations, 
              prioritize messages, and never miss important emails again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowDemo(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Free Demo</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent email browser uses cutting-edge AI to revolutionize how you manage your inbox.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Summarization */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Summarization</h3>
              <p className="text-gray-600 mb-4">
                Automatically summarize long email threads into key points, saving you hours of reading time.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Smart thread analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Key decision extraction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Action item identification</span>
                </li>
              </ul>
            </div>

            {/* Smart Negotiation */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Negotiation</h3>
              <p className="text-gray-600 mb-4">
                Let AI negotiate on your behalf with customizable strategies and personality settings.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Multiple negotiation strategies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Personality customization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Auto-response capabilities</span>
                </li>
              </ul>
            </div>

            {/* Smart Prioritization */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Prioritization</h3>
              <p className="text-gray-600 mb-4">
                AI automatically categorizes and prioritizes your emails based on urgency and importance.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Urgency detection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Sentiment analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Smart categorization</span>
                </li>
              </ul>
            </div>

            {/* Smart Replies */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Replies</h3>
              <p className="text-gray-600 mb-4">
                Generate professional, context-aware email responses in seconds, not minutes.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Context-aware responses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Professional tone matching</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Multi-language support</span>
                </li>
              </ul>
            </div>

            {/* Security & Privacy */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Security & Privacy</h3>
              <p className="text-gray-600 mb-4">
                Enterprise-grade security with end-to-end encryption and privacy-first design.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>End-to-end encryption</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Zero-knowledge architecture</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>SOC 2 compliance</span>
                </li>
              </ul>
            </div>

            {/* Multi-Provider Support */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Provider Support</h3>
              <p className="text-gray-600 mb-4">
                Connect all your email accounts from Gmail, Outlook, and IMAP providers in one place.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Gmail integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Outlook support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>IMAP compatibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Email Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have revolutionized their email workflow with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowDemo(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Free Demo</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">AI Email Browser</span>
              </div>
              <p className="text-gray-400">
                The future of intelligent email management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Email Browser. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
