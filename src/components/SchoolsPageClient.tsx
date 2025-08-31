'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SchoolsGrid } from '@/components/SchoolsGrid';
import { useSchools } from '@/hooks/useSchools';
import { useToast } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';

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
    <ErrorBoundary
      fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Schools Directory</h2>
            <p className="text-gray-600 mb-6">There was an error loading the schools directory. Please try refreshing the page.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={handleAddSchool}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Add School Instead
              </button>
            </div>
          </div>
        </div>
      }
    >
      {/* Professional Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>
      </div>

      {/* Professional Page Header */}
      <PageHeader
        title="Schools Directory"
        subtitle="Educational Institutions"
        description="Browse and explore educational institutions in our comprehensive directory. Discover schools, connect with communities, and build educational networks."
        variant="default"
      >
        {!loading && !error && (
          <Button
            variant="secondary"
            onClick={handleRetry}
            className="group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Directory
          </Button>
        )}
        
        <Button onClick={handleAddSchool} className="group">
          <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New School
        </Button>
      </PageHeader>

      {/* Enhanced Main Content with Professional Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorBoundary
          fallback={
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schools Grid Error</h3>
              <p className="text-gray-600 mb-4">The schools grid encountered an error and cannot be displayed.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleAddSchool}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Add School
                </button>
              </div>
            </div>
          }
        >
          <SchoolsGrid
            schools={schools}
            loading={loading}
            error={error}
            onAddSchool={handleAddSchool}
            className="w-full"
          />
        </ErrorBoundary>
      </div>

      {/* Enhanced Professional Footer */}
      {!loading && !error && schools.length > 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200/60 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {schools.length} {schools.length === 1 ? 'School' : 'Schools'} in Directory
                  </p>
                  <p className="text-xs text-gray-500">
                    Professional educational database
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    Updated: {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full" />
                <span>Enterprise-grade directory system</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}