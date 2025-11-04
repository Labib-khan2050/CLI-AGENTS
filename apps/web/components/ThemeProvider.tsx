"use client";
import { createContext, useContext, useEffect, useMemo } from 'react';

type Theme = 'dark';

type ThemeCtx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const Ctx = createContext<ThemeCtx | null>(null);

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Force dark mode always
  const theme: Theme = 'dark';

  useEffect(() => {
    // Force dark mode on mount and always
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.add('dark');
      // Prevent light mode
      root.style.colorScheme = 'dark';
    }
  }, []);

  // No-op toggle since we only have dark mode
  const value = useMemo(() => ({ 
    theme, 
    setTheme: () => {}, // No-op
    toggle: () => {} // No-op
  }), []);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
