'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import PageHeader from './PageHeader';
import Breadcrumb from './Breadcrumb';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  headerActions?: React.ReactNode;
  showBreadcrumbs?: boolean;
  headerVariant?: 'default' | 'centered' | 'minimal';
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  description,
  headerActions,
  showBreadcrumbs = true,
  headerVariant = 'default',
  className = '',
  containerSize = 'xl',
}) => {
  const containerClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-8xl',
    full: 'max-w-full',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      {showBreadcrumbs && (
        <div className="bg-white border-b border-gray-200">
          <div className={cn(containerClasses[containerSize], 'mx-auto px-4 sm:px-6 lg:px-8 py-4')}>
            <Breadcrumb />
          </div>
        </div>
      )}

      {/* Page Header */}
      {(title || subtitle || description || headerActions) && (
        <PageHeader
          title={title || ''}
          subtitle={subtitle}
          description={description}
          variant={headerVariant}
        >
          {headerActions}
        </PageHeader>
      )}

      {/* Main Content */}
      <main className={cn('flex-1', className)}>
        <div className={cn(containerClasses[containerSize], 'mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12')}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;