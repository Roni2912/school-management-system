import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  variant?: 'default' | 'error' | 'success' | 'warning';
  floatingLabel?: boolean;
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
    floatingLabel = false,
    id,
    required,
    disabled,
    value,
    placeholder,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    
    // Generate unique ID if not provided - using crypto for better uniqueness
    const inputId = id || `input-${crypto.randomUUID().slice(0, 8)}`;
    
    // Determine variant based on props
    const currentVariant = error ? 'error' : success ? 'success' : variant;
    
    // Handle focus and blur for floating labels
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };
    
    // Professional input base classes
    const inputBaseClasses = cn(
      // Base styling
      'w-full rounded-lg border-2 bg-white px-4 py-3 text-base font-medium transition-all duration-200 ease-in-out',
      'placeholder:text-gray-400 placeholder:font-normal',
      'focus:outline-none focus:ring-0',
      
      // Professional spacing and typography
      'text-gray-900 leading-tight',
      
      // Floating label adjustments
      floatingLabel && label && 'pt-6 pb-2',
      
      // Variant-specific styling
      currentVariant === 'default' && [
        'border-gray-300 hover:border-gray-400',
        'focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]',
        'focus:ring-1 focus:ring-primary-200'
      ],
      currentVariant === 'error' && [
        'border-red-300 hover:border-red-400',
        'focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
      ],
      currentVariant === 'success' && [
        'border-green-300 hover:border-green-400',
        'focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]'
      ],
      currentVariant === 'warning' && [
        'border-yellow-300 hover:border-yellow-400',
        'focus:border-yellow-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]'
      ],
      
      // Disabled state
      disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200',
      
      className
    );
    
    // Label classes for floating labels
    const floatingLabelClasses = cn(
      'absolute left-4 transition-all duration-200 ease-in-out pointer-events-none',
      'font-medium text-gray-500',
      
      // Position based on focus/value state
      (isFocused || hasValue || value) ? [
        'top-2 text-xs',
        currentVariant === 'error' ? 'text-red-600' : 
        currentVariant === 'success' ? 'text-green-600' : 
        currentVariant === 'warning' ? 'text-yellow-600' : 
        'text-primary-600'
      ] : [
        'top-3.5 text-base text-gray-400'
      ]
    );
    
    // Static label classes
    const staticLabelClasses = cn(
      'block text-sm font-semibold leading-6 mb-2',
      currentVariant === 'error' ? 'text-red-700' : 
      currentVariant === 'success' ? 'text-green-700' : 
      currentVariant === 'warning' ? 'text-yellow-700' : 
      'text-gray-700'
    );
    
    return (
      <div className="space-y-1">
        {/* Static Label */}
        {label && !floatingLabel && (
          <label 
            id={`${inputId}-label`}
            htmlFor={inputId}
            className={staticLabelClasses}
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required field">*</span>}
          </label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          {/* Floating Label */}
          {label && floatingLabel && (
            <label 
              id={`${inputId}-label`}
              htmlFor={inputId}
              className={floatingLabelClasses}
            >
              {label}
              {required && <span className="text-red-500 ml-1" aria-label="required field">*</span>}
            </label>
          )}
          
          {/* Input Field */}
          <input
            type={type}
            className={inputBaseClasses}
            ref={ref}
            id={inputId}
            disabled={disabled}
            value={value}
            placeholder={floatingLabel ? '' : placeholder}
            aria-invalid={currentVariant === 'error'}
            aria-required={required}
            aria-describedby={
              [
                error ? `${inputId}-error` : null,
                helperText ? `${inputId}-helper` : null,
                label ? `${inputId}-label` : null
              ].filter(Boolean).join(' ') || undefined
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {/* Status Icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {currentVariant === 'success' && (
              <svg
                className="h-5 w-5 text-green-500"
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
            )}
            
            {currentVariant === 'error' && (
              <svg
                className="h-5 w-5 text-red-500"
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
            )}

            {currentVariant === 'warning' && (
              <svg
                className="h-5 w-5 text-yellow-500"
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
            )}
          </div>
        </div>
        
        {/* Enhanced Error Message with Animation */}
        {error && (
          <div className="animate-slide-in-down">
            <p 
              id={`${inputId}-error`}
              className="text-sm text-red-600 font-medium flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake"
              role="alert"
            >
              <svg className="h-4 w-4 flex-shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="flex-1">{error}</span>
            </p>
          </div>
        )}
        
        {/* Success Message with Animation */}
        {!error && success && (
          <div className="animate-slide-in-up">
            <p className="text-sm text-green-600 font-medium flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <svg className="h-4 w-4 flex-shrink-0 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="flex-1">Input looks good!</span>
            </p>
          </div>
        )}
        
        {/* Helper Text */}
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`}
            className={cn(
              'text-sm font-medium',
              currentVariant === 'success' ? 'text-green-600' : 
              currentVariant === 'warning' ? 'text-yellow-600' : 
              'text-gray-500'
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