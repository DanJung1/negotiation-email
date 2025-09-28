'use client';

import { Inbox, Brain, TrendingUp, Settings, Plus } from 'lucide-react';

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
      id: 'negotiations' as const,
      label: 'Negotiations',
      icon: TrendingUp,
      count: 3,
    },
    {
      id: 'ai' as const,
      label: 'AI Assistant',
      icon: Brain,
      count: 0,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
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
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
