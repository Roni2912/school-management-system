'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SchoolsGrid } from '@/components/SchoolsGrid';
import { useSchools } from '@/hooks/useSchools';
import { useToast } from '@/components/ui/Toast';

export default function SchoolsPageClient() {
  const router = useRouter();
  const { schools, loading, error, refetch } = useSchools();
  const { showError, showInfo } = useToast();

  // Handle navigation to add school page
  const handleAddSchool = () => {
    router.push('/add-school');
  };

  // Handle retry on error
  const handleRetry = async () => {
    showInfo('Refreshing...', 'Loading schools data...');
    try {
      await refetch();
    } catch (err) {
      showError('Failed to refresh', 'Unable to load schools data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Schools Directory
              </h1>
              <p className="mt-2 text-gray-600">
                Browse and explore educational institutions in our directory
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              {!loading && !error && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  title="Refresh schools list"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              )}
              
              <button
                onClick={handleAddSchool}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add School
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SchoolsGrid
          schools={schools}
          loading={loading}
          error={error}
          onAddSchool={handleAddSchool}
          className="w-full"
        />
      </div>

      {/* Footer */}
      {!loading && !error && schools.length > 0 && (
        <div className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              <p>
                Displaying {schools.length} {schools.length === 1 ? 'school' : 'schools'} in the directory.
              </p>
              <p className="mt-1">
                Last updated: {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}