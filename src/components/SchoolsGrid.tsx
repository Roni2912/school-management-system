'use client';

import React from 'react';
import { SchoolCard, type SchoolData } from '@/components/SchoolCard';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState, LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

export interface SchoolsGridProps {
  schools: SchoolData[];
  loading?: boolean;
  error?: string | null;
  onAddSchool?: () => void;
  className?: string;
}

export const SchoolsGrid: React.FC<SchoolsGridProps> = ({
  schools,
  loading = false,
  error = null,
  onAddSchool,
  className
}) => {
  return (
    <div className={cn('w-full', className)}>
      <LoadingState
        loading={loading}
        error={error}
        onRetry={() => window.location.reload()}
        loadingComponent={
          <div className="space-y-6">
            {/* Loading header */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-3 text-sm font-medium text-gray-700">Loading schools...</p>
                <p className="mt-1 text-xs text-gray-500">Please wait while we fetch the latest data</p>
              </div>
            </div>
            
            {/* Loading skeleton grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse"
                >
                  {/* Image skeleton */}
                  <div className="w-full h-48 bg-gray-200" />
                  
                  {/* Content skeleton */}
                  <div className="p-6 space-y-4">
                    {/* Title skeleton */}
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    
                    {/* Address skeleton */}
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-gray-200 rounded mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                    
                    {/* Contact skeleton */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        errorComponent={
          <EmptyState
            title="Unable to load schools"
            description={error || 'An unexpected error occurred while loading schools.'}
            actionLabel="Try Again"
            onAction={() => window.location.reload()}
            icon={
              <svg
                className="mx-auto h-16 w-16 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            }
          />
        }
      >
        {/* Show empty state when no schools */}
        {(!schools || schools.length === 0) ? (
          <EmptyState
            title="No schools found"
            description="There are no schools in the directory yet. Add the first school to get started and build your educational institution database."
            actionLabel="Add First School"
            onAction={onAddSchool}
          />
        ) : (
          <>
            {/* Grid Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Schools Directory
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {schools.length} {schools.length === 1 ? 'school' : 'schools'} found
                  </p>
                </div>
                
                {onAddSchool && (
                  <button
                    onClick={onAddSchool}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                )}
              </div>
            </div>

            {/* Schools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {schools.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  className="h-full"
                />
              ))}
            </div>

            {/* Grid Footer */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                Showing all {schools.length} {schools.length === 1 ? 'school' : 'schools'}
              </p>
            </div>
          </>
        )}
      </LoadingState>
    </div>
  );
};



export default SchoolsGrid;