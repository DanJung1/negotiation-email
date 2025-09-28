'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AIContextType {
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export function AIProvider({ children }: AIProviderProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <AIContext.Provider value={{ isProcessing, setIsProcessing }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}
