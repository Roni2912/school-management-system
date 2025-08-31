'use client';

import React from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { ThemeProvider } from '@/components/ThemeProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}