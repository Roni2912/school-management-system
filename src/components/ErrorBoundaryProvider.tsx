'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useToast } from '@/components/ui/Toast';

interface ErrorBoundaryContextType {
  reportError: (error: Error, errorInfo?: React.ErrorInfo) => void;
}

const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | undefined>(undefined);

export const useErrorBoundary = () => {
  const context = useContext(ErrorBoundaryContext);
  if (!context) {
    throw new Error('useErrorBoundary must be used within an ErrorBoundaryProvider');
  }
  return context;
};

interface ErrorBoundaryProviderProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export const ErrorBoundaryProvider: React.FC<ErrorBoundaryProviderProps> = ({
  children,
  onError
}) => {
  const { showError } = useToast();

  const reportError = useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    // Log error for debugging
    console.error('Error reported to ErrorBoundaryProvider:', error, errorInfo);
    
    // Show user-friendly error notification
    showError(
      'Application Error',
      'An unexpected error occurred. The page will be refreshed automatically.'
    );
    
    // Call custom error handler if provided
    if (onError && errorInfo) {
      onError(error, errorInfo);
    }
    
    // Auto-refresh after a delay to recover from the error
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }, [showError, onError]);

  const contextValue: ErrorBoundaryContextType = {
    reportError
  };

  return (
    <ErrorBoundaryContext.Provider value={contextValue}>
      <ErrorBoundary
        onError={reportError}
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Application Error
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                We encountered an unexpected error in the School Management System. 
                The page will refresh automatically to restore functionality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Refresh Now
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Go to Home
                </button>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Need help?</strong> If this error persists, please contact support 
                  with details about what you were doing when the error occurred.
                </p>
              </div>
            </div>
          </div>
        }
      >
        {children}
      </ErrorBoundary>
    </ErrorBoundaryContext.Provider>
  );
};

export default ErrorBoundaryProvider;