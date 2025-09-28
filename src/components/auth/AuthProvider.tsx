'use client';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Simplified auth provider for demo
  return <>{children}</>;
}
