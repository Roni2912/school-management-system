'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'wave'
}) => {
  const baseClasses = cn(
    'bg-gray-200 animate-pulse',
    {
      'rounded-none': variant === 'rectangular',
      'rounded-full': variant === 'circular',
      'rounded-md': variant === 'rounded',
      'rounded-sm h-4': variant === 'text',
    },
    animation === 'wave' && 'skeleton',
    animation === 'pulse' && 'animate-pulse',
    className
  );

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined),
  };

  return <div className={baseClasses} style={style} />;
};

// Professional School Card Skeleton
export const SchoolCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn(
      'bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in',
      className
    )}>
      {/* Image skeleton */}
      <div className="relative w-full aspect-[16/9] bg-gray-200 skeleton" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton variant="text" className="h-6 w-3/4" />
          <Skeleton variant="text" className="h-4 w-1/2" />
        </div>
        
        {/* Contact info skeleton */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" className="h-4 flex-1" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" className="h-4 w-2/3" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" className="h-4 w-3/4" />
          </div>
        </div>
        
        {/* Action buttons skeleton */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <Skeleton variant="rounded" className="h-10 flex-1" />
            <Skeleton variant="rounded" className="h-10 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Professional Form Field Skeleton
export const FormFieldSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Skeleton variant="text" className="h-4 w-24" />
      <Skeleton variant="rounded" className="h-12 w-full" />
      <Skeleton variant="text" className="h-3 w-48" />
    </div>
  );
};

// Professional Grid Skeleton
export const GridSkeleton: React.FC<{ 
  items?: number;
  columns?: number;
  className?: string;
}> = ({ 
  items = 6, 
  columns = 3,
  className 
}) => {
  return (
    <div className={cn(
      'grid gap-6',
      {
        'grid-cols-1': columns === 1,
        'grid-cols-1 md:grid-cols-2': columns === 2,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': columns === 4,
      },
      className
    )}>
      {Array.from({ length: items }).map((_, index) => (
        <SchoolCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Professional Page Header Skeleton
export const PageHeaderSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center space-x-3">
        <Skeleton variant="rounded" width={40} height={40} />
        <Skeleton variant="text" className="h-8 w-64" />
      </div>
      <Skeleton variant="text" className="h-5 w-96" />
      <div className="flex items-center space-x-6 pt-2">
        <div className="flex items-center space-x-2">
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" className="h-4 w-32" />
        </div>
        <Skeleton variant="circular" width={4} height={4} />
        <div className="flex items-center space-x-2">
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
};

// Professional Navigation Skeleton
export const NavigationSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-medium border-b border-gray-200',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Skeleton variant="rounded" width={120} height={32} />
          <div className="hidden md:flex items-center space-x-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" width={80} height={36} />
            ))}
          </div>
          <Skeleton variant="circular" width={32} height={32} />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;