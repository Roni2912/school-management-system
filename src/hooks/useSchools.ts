'use client';

import { useState, useEffect, useCallback } from 'react';
import { type SchoolData } from '@/components/SchoolCard';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useLoadingState } from '@/hooks/useLoadingState';

export interface UseSchoolsResult {
  schools: SchoolData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const useSchools = (): UseSchoolsResult => {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const { handleError } = useErrorHandler();
  const loadingState = useLoadingState({
    initialLoading: true,
    timeout: 15000, // 15 second timeout for fetching schools
    onTimeout: () => {
      setError('Request timeout. Please check your connection and try again.');
    }
  });

  const { loading, error, setError } = loadingState;

  const fetchSchools = useCallback(async (): Promise<void> => {
    const result = await loadingState.executeAsync(async () => {
      const response = await fetch('/api/schools', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control to ensure fresh data
        cache: 'no-store',
      });

      if (!response.ok) {
        // Create API error with status
        const apiError = new Error() as Error & { status?: number };
        apiError.status = response.status;
        
        // Handle different HTTP error statuses
        switch (response.status) {
          case 404:
            apiError.message = 'Schools API endpoint not found';
            break;
          case 500:
            apiError.message = 'Server error occurred while fetching schools';
            break;
          case 503:
            apiError.message = 'Service temporarily unavailable';
            break;
          default:
            apiError.message = `Failed to fetch schools (${response.status})`;
        }
        
        throw apiError;
      }

      const result: ApiResponse<SchoolData[]> = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || 'Failed to fetch schools');
      }

      // Ensure we have an array of schools
      const schoolsData = result.data || [];
      
      // Validate the data structure
      const validSchools = schoolsData.filter((school): school is SchoolData => {
        return (
          school &&
          typeof school === 'object' &&
          typeof school.id === 'number' &&
          typeof school.name === 'string' &&
          typeof school.address === 'string' &&
          typeof school.city === 'string' &&
          typeof school.state === 'string' &&
          typeof school.contact === 'string' &&
          typeof school.email_id === 'string'
        );
      });

      // Log warning if some schools were filtered out
      if (validSchools.length !== schoolsData.length) {
        console.warn(`Filtered out ${schoolsData.length - validSchools.length} invalid school records`);
      }

      setSchools(validSchools);
      return validSchools;
    }, (error) => {
      // Use error handler for consistent error handling
      const handledError = handleError(error, { showToast: false });
      
      // Keep existing schools data on error to avoid jarring UX
      // Don't clear schools array to maintain better UX
      
      return handledError.message;
    });

    // If fetch failed, keep existing schools but show error state
    if (!result && schools.length === 0) {
      // Only clear schools if we have no existing data
      setSchools([]);
    }
  }, [loadingState, handleError, schools.length]);

  // Initial fetch on mount
  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  // Refetch function (shows loading state)
  const refetch = useCallback(async (): Promise<void> => {
    loadingState.reset();
    loadingState.startLoading();
    await fetchSchools();
  }, [fetchSchools, loadingState]);

  // Refresh function (doesn't show loading state, for silent updates)
  const refresh = useCallback(async (): Promise<void> => {
    await fetchSchools();
  }, [fetchSchools]);

  return {
    schools,
    loading,
    error,
    refetch,
    refresh,
  };
};

export default useSchools;