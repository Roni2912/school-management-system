'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'secondary' | 'white';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  color = 'primary'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  };

  return (
    <div className="relative gpu-accelerated">
      <svg
        className={cn(
          'animate-spin will-change-transform',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading content"
        role="status"
        aria-live="polite"
      >
        <title>Loading</title>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      
      {/* Screen reader text */}
      <span className="sr-only">Loading content, please wait...</span>
      
      {/* Enhanced glow effect for larger spinners - optimized for performance */}
      {(size === 'lg' || size === 'xl') && (
        <div 
          className={cn(
            'absolute inset-0 rounded-full opacity-20 will-change-opacity',
            colorClasses[color].replace('text-', 'bg-')
          )}
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      )}
    </div>
  );
};

export interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  className?: string;
  children: React.ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  className,
  children
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-50 rounded-lg animate-fade-in">
          <div className="text-center p-8 bg-white/80 rounded-xl shadow-lg border border-gray-200 animate-scale-in">
            <LoadingSpinner size="lg" className="animate-glow" />
            <p className="mt-4 text-sm font-medium text-gray-700 animate-pulse">{message}</p>
            <div className="mt-3 flex justify-center">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export interface LoadingStateProps {
  loading: boolean;
  error?: string | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  onRetry?: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  error,
  children,
  loadingComponent,
  errorComponent,
  onRetry
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        {loadingComponent || (
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-3 text-sm font-medium text-gray-700">Loading...</p>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        {errorComponent || (
          <div className="text-center max-w-md mx-auto">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 ease-in-out font-medium shadow-soft hover:shadow-medium"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingSpinner;