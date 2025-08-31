'use client';

import { useState, useEffect, useCallback } from 'react';
import { type SchoolData } from '@/components/SchoolCard';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchools = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      
      const response = await fetch('/api/schools', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control to ensure fresh data
        cache: 'no-store',
      });

      if (!response.ok) {
        // Handle different HTTP error statuses
        switch (response.status) {
          case 404:
            throw new Error('Schools API endpoint not found');
          case 500:
            throw new Error('Server error occurred while fetching schools');
          case 503:
            throw new Error('Service temporarily unavailable');
          default:
            throw new Error(`Failed to fetch schools (${response.status})`);
        }
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

      setSchools(validSchools);
      
      // Log warning if some schools were filtered out
      if (validSchools.length !== schoolsData.length) {
        console.warn(`Filtered out ${schoolsData.length - validSchools.length} invalid school records`);
      }

    } catch (err) {
      console.error('Error fetching schools:', err);
      
      // Set user-friendly error messages
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while loading schools.');
      }
      
      // Keep existing schools data on error to avoid jarring UX
      // setSchools([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  // Refetch function (shows loading state)
  const refetch = useCallback(async (): Promise<void> => {
    setLoading(true);
    await fetchSchools();
  }, [fetchSchools]);

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