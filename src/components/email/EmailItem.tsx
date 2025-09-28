'use client';

import { Star, StarOff, Archive, Trash2 } from 'lucide-react';

interface EmailItemProps {
  email: {
    id: string;
    subject: string;
    from: string;
    fromEmail: string;
    receivedAt: string;
    isRead: boolean;
    isImportant: boolean;
    priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
    negotiationStatus?: 'active' | 'pending' | 'completed' | null;
    targetPrice?: number;
    currentOffer?: number;
    aiSummary?: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export function EmailItem({ email, isSelected, onClick }: EmailItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'text-red-400';
      case 'HIGH':
        return 'text-orange-400';
      case 'NORMAL':
        return 'text-gray-400';
      case 'LOW':
        return 'text-gray-500';
      default:
        return 'text-gray-400';
    }
  };

  const getNegotiationStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div
      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        isSelected ? 'bg-blue-100 dark:bg-blue-600' : ''
      } ${!email.isRead ? 'bg-gray-50 dark:bg-gray-750' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className={`text-sm font-medium truncate ${
              !email.isRead ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'
            }`}>
              {email.subject || '(No Subject)'}
            </h3>
            {email.isImportant && (
              <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400 fill-current" />
            )}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {email.from}
          </p>
          
          {email.negotiationStatus && (
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${getNegotiationStatusColor(email.negotiationStatus)}`}>
                {email.negotiationStatus}
              </span>
              {email.currentOffer && email.targetPrice && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ${email.currentOffer} / ${email.targetPrice}
                </span>
              )}
            </div>
          )}
          
          {email.aiSummary && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {email.aiSummary}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-end space-y-1 ml-2">
          <span className={`text-xs ${getPriorityColor(email.priority)}`}>
            {email.priority}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {getTimeAgo(email.receivedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
