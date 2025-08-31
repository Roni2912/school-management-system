import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, asChild = false, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    // Professional button base styles
    const baseStyles = cn(
      // Base layout and typography
      'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500',
      'disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed',
      'relative overflow-hidden',
      
      // Professional border radius
      'rounded-lg',
      
      // Sophisticated hover and active states with enhanced polish
      'transform hover:scale-[1.02] active:scale-[0.98]',
      'hover:shadow-[0_4px_14px_0_rgba(37,99,235,0.25)] active:shadow-soft',
      'hover:-translate-y-0.5 active:translate-y-0',
      
      // Size variants
      {
        'px-3 py-2 text-sm h-9': size === 'sm',
        'px-4 py-2.5 text-sm h-10': size === 'md', 
        'px-6 py-3 text-base h-12': size === 'lg',
      },
      
      // Variant styles
      {
        // Primary - Professional blue with sophisticated hover and gradient
        'bg-gradient-to-r from-primary-600 to-primary-700 text-white border border-primary-600': variant === 'primary',
        'hover:from-primary-700 hover:to-primary-800 hover:border-primary-700': variant === 'primary' && !isDisabled,
        'hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)]': variant === 'primary' && !isDisabled,
        
        // Secondary - Professional outline with subtle fill on hover
        'bg-transparent text-primary-600 border border-primary-600': variant === 'secondary',
        'hover:bg-primary-50 hover:text-primary-700': variant === 'secondary' && !isDisabled,
        'hover:border-primary-700': variant === 'secondary' && !isDisabled,
        
        // Ghost - Minimal with sophisticated hover
        'bg-transparent text-gray-600 border border-transparent': variant === 'ghost',
        'hover:bg-gray-100 hover:text-gray-900': variant === 'ghost' && !isDisabled,
      }
    );

    // If asChild is true, clone the child element and apply button styles
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement;
      return React.cloneElement(child, {
        className: cn(baseStyles, (child.props as { className?: string }).className, className),
        ref,
        'aria-disabled': isDisabled,
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <button
        className={cn(baseStyles, className)}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Professional loading spinner */}
        {loading && (
          <div className="mr-2 flex items-center">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        
        {/* Button content with subtle animation */}
        <span className={cn(
          'transition-all duration-200',
          loading && 'opacity-80'
        )}>
          {children}
        </span>
        
        {/* Enhanced shine effect on hover for primary buttons */}
        {variant === 'primary' && !isDisabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-all duration-700 ease-out" />
        )}
        
        {/* Ripple effect container */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 opacity-0 transition-all duration-300 ease-out group-active:scale-150 group-active:opacity-100" />
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };