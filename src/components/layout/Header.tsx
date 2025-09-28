'use client';

import { User, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  user: {
    name?: string;
    email?: string;
    picture?: string;
  };
}

export function Header({ user }: HeaderProps) {
  const handleLogout = () => {
    // Demo logout - just reload the page
    window.location.reload();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">
            AI Email Browser
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
