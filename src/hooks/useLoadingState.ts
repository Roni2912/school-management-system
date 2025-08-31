'use client';

import { useState, useCallback, useRef } from 'react';

export interface LoadingStateOptions {
  initialLoading?: boolean;
  timeout?: number;
  onTimeout?: () => void;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
  data: unknown;
}

export const useLoadingState = (options: LoadingStateOptions = {}) => {
  const { initialLoading = false, timeout, onTimeout } = options;
  
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Set timeout if specified
    if (timeout && onTimeout) {
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        onTimeout();
      }, timeout);
    }
  }, [timeout, onTimeout]);

  const stopLoading = useCallback(() => {
    setLoading(false);
    
    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setLoadingError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setLoading(false);
    
    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    
    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const executeAsync = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    errorHandler?: (error: unknown) => string
  ): Promise<T | null> => {
    try {
      startLoading();
      const result = await asyncFn();
      stopLoading();
      return result;
    } catch (error) {
      const errorMessage = errorHandler 
        ? errorHandler(error)
        : error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred';
      
      setLoadingError(errorMessage);
      return null;
    }
  }, [startLoading, stopLoading, setLoadingError]);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setError: setLoadingError,
    clearError,
    reset,
    executeAsync
  };
};

export const useAsyncOperation = <T = unknown>(
  operation: () => Promise<T>,
  dependencies: React.DependencyList = []
) => {
  const [state, setState] = useState<LoadingState>({
    loading: false,
    error: null,
    data: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await operation();
      setState({ loading: false, error: null, data: result });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setState({ loading: false, error: errorMessage, data: null });
      throw error;
    }
  }, dependencies);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, data: null });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
};

export default useLoadingState;