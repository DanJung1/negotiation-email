'use client';

import { useState, useEffect } from 'react';
import { X, Send, Edit3, Brain } from 'lucide-react';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: any;
  aiResponse: string;
  onSend: (response: string) => void;
}

export function ReplyModal({ isOpen, onClose, email, aiResponse, onSend }: ReplyModalProps) {
  const [editedResponse, setEditedResponse] = useState(aiResponse);
  const [isEditing, setIsEditing] = useState(false);

  console.log('ReplyModal props:', { isOpen, email, aiResponse });
  console.log('ReplyModal isOpen:', isOpen);

  // Update editedResponse when aiResponse changes
  useEffect(() => {
    setEditedResponse(aiResponse);
  }, [aiResponse]);

  if (!isOpen) return null;

  const handleSend = () => {
    onSend(editedResponse);
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Brain className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Generated Reply</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Replying to: {email?.subject || 'Email'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Original Email Context */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Message:</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-3 rounded border">
            <p><strong>From:</strong> {email?.from} ({email?.fromEmail})</p>
            <p><strong>Subject:</strong> {email?.subject}</p>
            <div className="mt-2 whitespace-pre-wrap">{email?.body}</div>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Generated Response:</h3>
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditing ? 'Preview' : 'Edit'}</span>
            </button>
          </div>
          
          {isEditing ? (
            <textarea
              value={editedResponse}
              onChange={(e) => setEditedResponse(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Edit the AI response..."
            />
          ) : (
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {editedResponse}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            AI Response • {isEditing ? 'Editing Mode' : 'Preview Mode'}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Send Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
