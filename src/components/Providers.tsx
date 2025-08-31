'use client';

import React from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ErrorBoundaryProvider } from '@/components/ErrorBoundaryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider>
        <ErrorBoundaryProvider>
          {children}
        </ErrorBoundaryProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}