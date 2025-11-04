'use client';

import { useEffect } from 'react';
import { initAuthReceiver } from './auth-receiver';

/**
 * Client component wrapper for auth receiver
 * Must be 'use client' to use useEffect
 */
export function AuthReceiver() {
  useEffect(() => {
    // Initialize auth receiver on mount
    initAuthReceiver();
    console.log('[Claudable] Auth receiver initialized');
  }, []);

  // This component doesn't render anything
  return null;
}
