'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No schools found",
  description = "There are no schools in the directory yet. Add the first school to get started.",
  actionLabel = "Add School",
  onAction,
  icon,
  className
}) => {
  const defaultIcon = (
    <div className="relative">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full opacity-80" />
      <div className="relative w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      {/* Subtle animation dots */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-300" />
    </div>
  );

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-20 px-8 text-center',
      'bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/60',
      'shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in',
      'backdrop-blur-sm',
      className
    )}>
      {/* Professional Icon with Animation */}
      <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
        {icon || defaultIcon}
      </div>

      {/* Enhanced Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
        {title}
      </h3>

      {/* Professional Description */}
      <p className="text-gray-600 mb-10 max-w-lg leading-relaxed text-lg">
        {description}
      </p>

      {/* Enhanced Action Section */}
      {onAction && (
        <div className="space-y-4">
          <Button
            onClick={onAction}
            variant="primary"
            size="lg"
            className="min-w-[160px] h-12 text-base font-semibold shadow-medium hover:shadow-strong transform hover:scale-105 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {actionLabel}
          </Button>
          
          {/* Encouraging subtitle */}
          <p className="text-sm text-gray-500 font-medium">
            Start building your educational directory today
          </p>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-blue-100 rounded-full opacity-20" />
      <div className="absolute bottom-6 right-6 w-6 h-6 bg-indigo-100 rounded-full opacity-30" />
      <div className="absolute top-1/3 right-8 w-4 h-4 bg-purple-100 rounded-full opacity-25" />
    </div>
  );
};

export default EmptyState;