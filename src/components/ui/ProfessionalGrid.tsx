'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ProfessionalGridProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  columns?: {
    mobile?: 1 | 2;
    tablet?: 1 | 2 | 3;
    desktop?: 1 | 2 | 3 | 4;
    large?: 1 | 2 | 3 | 4 | 5;
    ultrawide?: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

export const ProfessionalGrid: React.FC<ProfessionalGridProps> = ({
  children,
  className,
  spacing = 'md',
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    large: 4,
    ultrawide: 5
  }
}) => {
  const spacingClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10'
  };

  const responsiveSpacingClasses = {
    sm: 'sm:gap-4 md:gap-5 lg:gap-6 xl:gap-4 2xl:gap-6',
    md: 'sm:gap-6 md:gap-7 lg:gap-8 xl:gap-6 2xl:gap-8',
    lg: 'sm:gap-8 md:gap-9 lg:gap-10 xl:gap-8 2xl:gap-10',
    xl: 'sm:gap-10 md:gap-11 lg:gap-12 xl:gap-10 2xl:gap-12'
  };

  const getColumnClasses = () => {
    const classes = ['grid'];
    
    // Mobile columns
    if (columns.mobile) {
      classes.push(`grid-cols-${columns.mobile}`);
    }
    
    // Tablet columns
    if (columns.tablet) {
      classes.push(`sm:grid-cols-${columns.tablet}`);
    }
    
    // Desktop columns
    if (columns.desktop) {
      classes.push(`lg:grid-cols-${columns.desktop}`);
    }
    
    // Large desktop columns
    if (columns.large) {
      classes.push(`xl:grid-cols-${columns.large}`);
    }
    
    // Ultra-wide columns (using 2xl as fallback for now)
    if (columns.ultrawide) {
      classes.push(`2xl:grid-cols-${columns.ultrawide}`);
    }
    
    return classes.join(' ');
  };

  return (
    <div className={cn(
      getColumnClasses(),
      responsiveSpacingClasses[spacing],
      'w-full',
      className
    )}>
      {children}
    </div>
  );
};

export interface ProfessionalContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const ProfessionalContainer: React.FC<ProfessionalContainerProps> = ({
  children,
  className,
  size = 'xl',
  padding = 'md'
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16'
  };

  return (
    <div className={cn(
      sizeClasses[size],
      paddingClasses[padding],
      'mx-auto',
      className
    )}>
      {children}
    </div>
  );
};

export interface ProfessionalSectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'none' | 'subtle' | 'gradient';
}

export const ProfessionalSection: React.FC<ProfessionalSectionProps> = ({
  children,
  className,
  spacing = 'md',
  background = 'none'
}) => {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  };

  const backgroundClasses = {
    none: '',
    subtle: 'bg-gradient-to-br from-gray-50/30 to-white',
    gradient: 'bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20'
  };

  return (
    <section className={cn(
      spacingClasses[spacing],
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  );
};

export default ProfessionalGrid;