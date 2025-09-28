'use client';

import { Star, StarOff, Archive, Trash2 } from 'lucide-react';

interface EmailItemProps {
  email: {
    id: string;
    subject: string;
    from: string;
    receivedAt: string;
    isRead: boolean;
    isImportant: boolean;
    priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
    aiSummary?: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export function EmailItem({ email, isSelected, onClick }: EmailItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'text-red-600';
      case 'HIGH':
        return 'text-orange-600';
      case 'NORMAL':
        return 'text-gray-600';
      case 'LOW':
        return 'text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div
      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
      } ${!email.isRead ? 'bg-blue-25' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className={`text-sm font-medium truncate ${
              !email.isRead ? 'font-semibold' : ''
            }`}>
              {email.subject || '(No Subject)'}
            </h3>
            {email.isImportant && (
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            )}
          </div>
          
          <p className="text-sm text-gray-600 truncate mt-1">
            {email.from}
          </p>
          
          {email.aiSummary && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {email.aiSummary}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-end space-y-1 ml-2">
          <span className={`text-xs ${getPriorityColor(email.priority)}`}>
            {email.priority}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(email.receivedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-1">
          <button className="p-1 text-gray-400 hover:text-yellow-500 transition-colors">
            {email.isImportant ? (
              <Star className="h-4 w-4 fill-current" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Archive className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
