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
    <svg
      className="mx-auto h-16 w-16 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-6 text-center',
      'bg-background rounded-lg border border-border shadow-soft animate-fade-in',
      className
    )}>
      {/* Icon */}
      <div className="mb-6 text-muted-foreground">
        {icon || defaultIcon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {onAction && (
        <Button
          onClick={onAction}
          variant="default"
          size="lg"
          className="min-w-[140px]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;