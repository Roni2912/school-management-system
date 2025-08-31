'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner, LoadingOverlay, LoadingState } from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useLoadingState } from '@/hooks/useLoadingState';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Component that throws an error when triggered
const ErrorThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error thrown by the ErrorThrowingComponent');
  }
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-green-800">✅ No error - component is working normally</p>
    </div>
  );
};

export default function TestErrorHandlingPage() {
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [loadingStateDemo, setLoadingStateDemo] = useState<'idle' | 'loading' | 'error'>('idle');
  
  const { showSuccess, showError, showInfo, showWarning } = useToast();
  const { handleError } = useErrorHandler();
  const loadingState = useLoadingState();

  const testToastNotifications = () => {
    showSuccess('Success!', 'This is a success message');
    setTimeout(() => showInfo('Info', 'This is an info message'), 1000);
    setTimeout(() => showWarning('Warning', 'This is a warning message'), 2000);
    setTimeout(() => showError('Error', 'This is an error message'), 3000);
  };

  const testErrorHandler = () => {
    const testError = new Error('This is a test error from useErrorHandler');
    handleError(testError);
  };

  const testApiError = () => {
    const apiError = new Error('API request failed') as Error & { status?: number };
    apiError.status = 500;
    handleError(apiError);
  };

  const testLoadingOverlay = () => {
    setShowLoadingOverlay(true);
    setTimeout(() => setShowLoadingOverlay(false), 3000);
  };

  const testLoadingState = (type: 'loading' | 'error') => {
    if (type === 'loading') {
      setLoadingStateDemo('loading');
      setTimeout(() => setLoadingStateDemo('idle'), 3000);
    } else {
      setLoadingStateDemo('error');
    }
  };

  const testAsyncOperation = async () => {
    await loadingState.executeAsync(async () => {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccess('Async Operation Complete', 'The operation completed successfully');
    });
  };

  const testAsyncError = async () => {
    await loadingState.executeAsync(async () => {
      // Simulate async operation that fails
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Async operation failed');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Error Handling & Loading States Test Page
          </h1>
          <p className="text-gray-600 mb-8">
            This page tests all the error handling and loading state functionality implemented in task 11.
          </p>

          <div className="space-y-8">
            {/* Toast Notifications Test */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Toast Notification System
              </h2>
              <p className="text-gray-600 mb-4">
                Test the toast notification system with different message types.
              </p>
              <Button onClick={testToastNotifications}>
                Test All Toast Types
              </Button>
            </section>

            {/* Error Handler Test */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Error Handler Hook
              </h2>
              <p className="text-gray-600 mb-4">
                Test the useErrorHandler hook with different error types.
              </p>
              <div className="flex gap-4">
                <Button onClick={testErrorHandler}>
                  Test Generic Error
                </Button>
                <Button onClick={testApiError} variant="secondary">
                  Test API Error (500)
                </Button>
              </div>
            </section>

            {/* Error Boundary Test */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Error Boundary
              </h2>
              <p className="text-gray-600 mb-4">
                Test the error boundary component by triggering a component error.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setShouldThrowError(!shouldThrowError)}
                    variant={shouldThrowError ? "secondary" : "primary"}
                  >
                    {shouldThrowError ? 'Stop Throwing Error' : 'Throw Component Error'}
                  </Button>
                </div>
                
                <ErrorBoundary
                  fallback={
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800">🚨 Error Boundary caught an error!</p>
                      <button 
                        onClick={() => setShouldThrowError(false)}
                        className="mt-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium shadow-soft hover:shadow-medium"
                      >
                        Reset Component
                      </button>
                    </div>
                  }
                >
                  <ErrorThrowingComponent shouldThrow={shouldThrowError} />
                </ErrorBoundary>
              </div>
            </section>

            {/* Loading Spinner Test */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Loading Spinners
              </h2>
              <p className="text-gray-600 mb-4">
                Different loading spinner sizes and colors.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-xs text-gray-500 mt-1">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="text-xs text-gray-500 mt-1">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="text-xs text-gray-500 mt-1">Large</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="xl" />
                  <p className="text-xs text-gray-500 mt-1">Extra Large</p>
                </div>
              </div>
            </section>

            {/* Loading Overlay Test */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Loading Overlay
              </h2>
              <p className="text-gray-600 mb-4">
                Test the loading overlay component.
              </p>
              <div className="space-y-4">
                <Button onClick={testLoadingOverlay}>
                  Test Loading Overlay (3s)
                </Button>
                
                <LoadingOverlay 
                  isLoading={showLoadingOverlay} 
                  message="Processing your request..."
                  className="h-32 bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <p className="text-gray-600">This content is behind the loading overlay</p>
                </LoadingOverlay>
              </div>
            </section>

            {/* Loading State Test */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Loading State Component
              </h2>
              <p className="text-gray-600 mb-4">
                Test the LoadingState component with different states.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button onClick={() => testLoadingState('loading')}>
                    Test Loading State (3s)
                  </Button>
                  <Button onClick={() => testLoadingState('error')} variant="secondary">
                    Test Error State
                  </Button>
                  <Button onClick={() => setLoadingStateDemo('idle')} variant="ghost">
                    Reset to Idle
                  </Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 min-h-[120px]">
                  <LoadingState
                    loading={loadingStateDemo === 'loading'}
                    error={loadingStateDemo === 'error' ? 'This is a test error state' : null}
                    onRetry={() => setLoadingStateDemo('idle')}
                  >
                    <div className="text-center py-8">
                      <p className="text-gray-600">✅ Content loaded successfully!</p>
                    </div>
                  </LoadingState>
                </div>
              </div>
            </section>

            {/* Loading State Hook Test */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Loading State Hook
              </h2>
              <p className="text-gray-600 mb-4">
                Test the useLoadingState hook with async operations.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button 
                    onClick={testAsyncOperation}
                    loading={loadingState.loading}
                    disabled={loadingState.loading}
                  >
                    Test Async Success (2s)
                  </Button>
                  <Button 
                    onClick={testAsyncError}
                    loading={loadingState.loading}
                    disabled={loadingState.loading}
                    variant="secondary"
                  >
                    Test Async Error (1s)
                  </Button>
                  <Button 
                    onClick={loadingState.reset}
                    variant="ghost"
                    disabled={loadingState.loading}
                  >
                    Reset State
                  </Button>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Loading:</span> {loadingState.loading.toString()}
                    </div>
                    <div>
                      <span className="font-medium">Error:</span> {loadingState.error || 'null'}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Summary */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              ✅ Task 11 Implementation Complete
            </h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Global error boundary integrated into root layout</li>
              <li>• Toast notification system with multiple message types</li>
              <li>• Comprehensive loading states for all async operations</li>
              <li>• Real-time form validation feedback (see SchoolForm component)</li>
              <li>• Error handling hooks for consistent error management</li>
              <li>• Loading state hooks for async operation management</li>
              <li>• Enhanced API error responses with user-friendly messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}