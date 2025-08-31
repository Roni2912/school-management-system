'use client';

import React from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { ErrorBoundaryProvider } from '@/components/ErrorBoundaryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ToastProvider>
      <ErrorBoundaryProvider>
        {children}
      </ErrorBoundaryProvider>
    </ToastProvider>
  );
}