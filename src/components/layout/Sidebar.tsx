'use client';

import { Inbox, Star, Send, Archive, Trash2, Brain, TrendingUp, Target, BarChart3, Plus, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: 'inbox' | 'negotiations' | 'ai';
  onViewChange: (view: 'inbox' | 'negotiations' | 'ai') => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'inbox' as const,
      label: 'Inbox',
      icon: Inbox,
      count: 12,
    },
    {
      id: 'starred' as const,
      label: 'Starred',
      icon: Star,
      count: 0,
    },
    {
      id: 'sent' as const,
      label: 'Sent',
      icon: Send,
      count: 0,
    },
    {
      id: 'archive' as const,
      label: 'Archive',
      icon: Archive,
      count: 0,
    },
    {
      id: 'trash' as const,
      label: 'Trash',
      icon: Trash2,
      count: 0,
    },
  ];

  const aiItems = [
    {
      id: 'ai' as const,
      label: 'AI Assistant',
      icon: Brain,
      count: 0,
    },
    {
      id: 'negotiations' as const,
      label: 'Negotiation Engine',
      icon: TrendingUp,
      count: 3,
      isActive: true,
    },
    {
      id: 'objectives' as const,
      label: 'Set Objectives',
      icon: Target,
      count: 0,
    },
    {
      id: 'progress' as const,
      label: 'Track Progress',
      icon: BarChart3,
      count: 0,
    },
  ];

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4">
        <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Compose</span>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">AI Features</h3>
        <nav className="space-y-1">
          {aiItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id || item.isActive;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isActive ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
