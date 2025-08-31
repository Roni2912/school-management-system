'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  size = 'md', 
  className,
  showTagline = false
}) => {
  const sizeClasses = {
    sm: {
      container: 'h-8',
      icon: 'w-8 h-8',
      text: 'text-lg',
      spacing: 'space-x-2'
    },
    md: {
      container: 'h-10',
      icon: 'w-10 h-10',
      text: 'text-xl',
      spacing: 'space-x-2'
    },
    lg: {
      container: 'h-12',
      icon: 'w-12 h-12',
      text: 'text-2xl',
      spacing: 'space-x-3'
    },
    xl: {
      container: 'h-16',
      icon: 'w-16 h-16',
      text: 'text-3xl',
      spacing: 'space-x-3'
    }
  };

  const currentSize = sizeClasses[size];

  // Professional SVG Logo Icon - Educational Building with Graduation Cap
  const LogoIcon = () => (
    <svg
      className={cn(currentSize.icon, 'text-primary')}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SchoolHub Pro Logo"
    >
      {/* Building Base */}
      <rect
        x="8"
        y="20"
        width="32"
        height="24"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Building Windows */}
      <rect x="12" y="24" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="18" y="24" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="26" y="24" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="32" y="24" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
      
      <rect x="12" y="30" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="18" y="30" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="26" y="30" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="32" y="30" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
      
      {/* Main Entrance */}
      <rect
        x="20"
        y="32"
        width="8"
        height="12"
        rx="1"
        fill="currentColor"
        fillOpacity="0.2"
      />
      
      {/* Graduation Cap */}
      <ellipse
        cx="24"
        cy="12"
        rx="12"
        ry="3"
        fill="currentColor"
        fillOpacity="0.9"
      />
      
      {/* Cap Top */}
      <rect
        x="20"
        y="10"
        width="8"
        height="4"
        rx="1"
        fill="currentColor"
      />
      
      {/* Tassel */}
      <circle cx="32" cy="12" r="1.5" fill="currentColor" fillOpacity="0.7" />
      <line x1="32" y1="13.5" x2="34" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Building Pillars */}
      <rect x="10" y="36" width="2" height="8" fill="currentColor" fillOpacity="0.4" />
      <rect x="14" y="36" width="2" height="8" fill="currentColor" fillOpacity="0.4" />
      <rect x="32" y="36" width="2" height="8" fill="currentColor" fillOpacity="0.4" />
      <rect x="36" y="36" width="2" height="8" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );

  const LogoText = ({ className: textClassName }: { className?: string }) => (
    <div className={cn('flex flex-col leading-none', textClassName)}>
      <span className={cn(
        'font-bold text-foreground tracking-tight font-heading',
        currentSize.text
      )}>
        SchoolHub
      </span>
      <div className="flex items-center space-x-1">
        <span className={cn(
          'font-medium text-primary tracking-wider uppercase',
          size === 'sm' ? 'text-[10px]' : 
          size === 'md' ? 'text-xs' :
          size === 'lg' ? 'text-sm' : 'text-base'
        )}>
          Pro
        </span>
        {showTagline && size !== 'sm' && (
          <span className={cn(
            'text-muted-foreground font-normal tracking-normal normal-case',
            size === 'md' ? 'text-xs' :
            size === 'lg' ? 'text-sm' : 'text-base'
          )}>
            • Professional School Management
          </span>
        )}
      </div>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={cn(currentSize.container, 'flex items-center', className)}>
        <LogoIcon />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn(currentSize.container, 'flex items-center', className)}>
        <LogoText />
      </div>
    );
  }

  // Full logo (default)
  return (
    <div className={cn(
      currentSize.container, 
      'flex items-center', 
      currentSize.spacing,
      className
    )}>
      <LogoIcon />
      <LogoText />
    </div>
  );
};

export default Logo;