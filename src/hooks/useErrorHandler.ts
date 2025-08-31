'use client';

import { useCallback } from 'react';
import { useToast } from '@/components/ui/Toast';

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

export const useErrorHandler = () => {
  const { showError, showWarning } = useToast();

  const handleError = useCallback((
    error: unknown,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = 'An unexpected error occurred'
    } = options;

    // Log error for debugging
    if (logError) {
      console.error('Error handled by useErrorHandler:', error);
    }

    // Extract error information
    let title = 'Error';
    let message = fallbackMessage;
    let isWarning = false;

    if (error instanceof Error) {
      message = error.message;
      
      // Handle API errors
      if ('status' in error) {
        const apiError = error as ApiError;
        switch (apiError.status) {
          case 400:
            title = 'Invalid Request';
            message = apiError.message || 'Please check your input and try again.';
            isWarning = true;
            break;
          case 401:
            title = 'Unauthorized';
            message = 'You are not authorized to perform this action.';
            break;
          case 403:
            title = 'Forbidden';
            message = 'You do not have permission to access this resource.';
            break;
          case 404:
            title = 'Not Found';
            message = 'The requested resource could not be found.';
            isWarning = true;
            break;
          case 429:
            title = 'Too Many Requests';
            message = 'Please wait a moment before trying again.';
            isWarning = true;
            break;
          case 500:
            title = 'Server Error';
            message = 'A server error occurred. Please try again later.';
            break;
          case 503:
            title = 'Service Unavailable';
            message = 'The service is temporarily unavailable. Please try again later.';
            break;
          default:
            title = 'Request Failed';
            message = apiError.message || `Request failed with status ${apiError.status}`;
        }
      }
    } else if (typeof error === 'string') {
      message = error;
    }

    // Show toast notification
    if (showToast) {
      if (isWarning) {
        showWarning(title, message);
      } else {
        showError(title, message);
      }
    }

    return {
      title,
      message,
      isWarning,
      originalError: error
    };
  }, [showError, showWarning]);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options: ErrorHandlerOptions = {}
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, options);
      return null;
    }
  }, [handleError]);

  const createErrorHandler = useCallback((
    options: ErrorHandlerOptions = {}
  ) => {
    return (error: unknown) => handleError(error, options);
  }, [handleError]);

  return {
    handleError,
    handleAsyncError,
    createErrorHandler
  };
};

export default useErrorHandler;