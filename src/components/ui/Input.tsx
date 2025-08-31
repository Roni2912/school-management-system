import React from 'react';
import { cn } from '@/lib/utils';
import { getInputClasses } from '@/lib/styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  variant?: 'default' | 'error' | 'success' | 'warning';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    label, 
    error, 
    success, 
    helperText, 
    variant = 'default',
    id,
    required,
    disabled,
    ...props 
  }, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    // Determine variant based on props
    const currentVariant = error ? 'error' : success ? 'success' : variant;
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              currentVariant === 'error' && 'text-destructive',
              currentVariant === 'success' && 'text-success',
              currentVariant === 'warning' && 'text-warning'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            type={type}
            className={getInputClasses(currentVariant, className)}
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={currentVariant === 'error'}
            aria-describedby={
              error ? `${inputId}-error` : 
              helperText ? `${inputId}-helper` : 
              undefined
            }
            {...props}
          />
          
          {/* Success icon */}
          {currentVariant === 'success' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          
          {/* Error icon */}
          {currentVariant === 'error' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}

          {/* Warning icon */}
          {currentVariant === 'warning' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-warning"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <p 
            id={`${inputId}-error`}
            className="text-sm text-destructive animate-slide-in"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {/* Helper text */}
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`}
            className={cn(
              'text-sm',
              currentVariant === 'success' ? 'text-success' : 
              currentVariant === 'warning' ? 'text-warning' : 
              'text-muted-foreground'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };