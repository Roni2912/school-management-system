'use client';

import React from 'react';
import { SchoolCard, type SchoolData } from '@/components/SchoolCard';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState, LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { GridSkeleton } from '@/components/ui/SkeletonLoader';
import { FadeIn, Stagger } from '@/components/ui/AnimationUtils';
import { ProfessionalGrid } from '@/components/ui/ProfessionalGrid';
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
          <div className="space-y-8">
            {/* Enhanced Loading Header */}
            <div className="flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <div className="relative">
                  <LoadingSpinner size="lg" className="animate-glow" />
                  <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-ping" />
                </div>
                <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">Loading schools...</p>
                <p className="mt-2 text-sm text-gray-500">Please wait while we fetch the latest data</p>
              </div>
            </div>
            
            {/* Professional Skeleton Grid */}
            <GridSkeleton items={6} columns={3} className="animate-fade-in" />
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
            {/* Enhanced Professional Grid Header */}
            <div className="mb-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Schools Directory
                  </h2>
                  <div className="flex items-center space-x-4">
                    <p className="text-gray-600 text-lg">
                      {schools.length} {schools.length === 1 ? 'school' : 'schools'} found
                    </p>
                    <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full" />
                    <p className="hidden sm:block text-gray-500 text-sm">
                      Updated {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {onAddSchool && (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={onAddSchool}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-medium hover:shadow-strong"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
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
                )}
              </div>
              
              {/* Professional divider */}
              <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            {/* Enhanced Professional Schools Grid with Staggered Animations */}
            <ProfessionalGrid
              spacing="md"
              columns={{
                mobile: 1,
                tablet: 2,
                desktop: 3,
                large: 4,
                ultrawide: 5
              }}
            >
              {schools.map((school, index) => (
                <FadeIn
                  key={school.id}
                  delay={index * 100}
                  direction="up"
                  className="h-full"
                >
                  <SchoolCard
                    school={school}
                    className="h-full"
                  />
                </FadeIn>
              ))}
            </ProfessionalGrid>

            {/* Enhanced Professional Grid Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200/60">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium">
                    Showing all {schools.length} {schools.length === 1 ? 'school' : 'schools'}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>Professional Directory</span>
                </div>
              </div>
            </div>
          </>
        )}
      </LoadingState>
    </div>
  );
};



export default SchoolsGrid;