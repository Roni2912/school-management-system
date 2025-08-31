'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'minimal';
  showDivider?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  children,
  className = '',
  variant = 'default',
  showDivider = true,
}) => {
  const baseClasses = 'bg-white border-b border-gray-200';
  
  const variantClasses = {
    default: 'py-8 lg:py-12',
    centered: 'py-12 lg:py-16 text-center',
    minimal: 'py-6 lg:py-8',
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'flex flex-col space-y-4',
          variant === 'centered' ? 'items-center' : 'items-start'
        )}>
          
          {/* Subtitle/Category */}
          {subtitle && (
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700 border border-primary-200">
                {subtitle}
              </span>
            </div>
          )}

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className={cn(
              'text-display-medium font-bold text-gray-900 tracking-tight',
              variant === 'minimal' && 'text-display-small'
            )}>
              {title}
            </h1>
            
            {/* Description */}
            {description && (
              <p className={cn(
                'text-body-large text-gray-600 leading-relaxed',
                variant === 'centered' ? 'max-w-3xl' : 'max-w-4xl'
              )}>
                {description}
              </p>
            )}
          </div>

          {/* Action Area */}
          {children && (
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Optional Divider */}
      {showDivider && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      )}
    </div>
  );
};

export default PageHeader;