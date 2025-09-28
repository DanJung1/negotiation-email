'use client';

import { useState } from 'react';
import { EmailBrowser } from '../EmailBrowser';
import { LoginForm } from './LoginForm';

export function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <EmailBrowser />;
  }

  return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
}
