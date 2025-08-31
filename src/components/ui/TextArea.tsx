import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  variant?: 'default' | 'error' | 'success' | 'warning';
  autoResize?: boolean;
  maxHeight?: number;
  minHeight?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    className, 
    label, 
    error, 
    success, 
    helperText, 
    variant = 'default',
    autoResize = true,
    maxHeight = 200,
    minHeight = 80,
    id,
    required,
    disabled,
    value,
    placeholder,
    rows = 4,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // Generate unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    
    // Determine variant based on props
    const currentVariant = error ? 'error' : success ? 'success' : variant;
    
    // Auto-resize functionality
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea && autoResize) {
        const adjustHeight = () => {
          textarea.style.height = 'auto';
          const scrollHeight = textarea.scrollHeight;
          const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
          textarea.style.height = `${newHeight}px`;
        };
        
        adjustHeight();
        textarea.addEventListener('input', adjustHeight);
        
        return () => textarea.removeEventListener('input', adjustHeight);
      }
    }, [value, autoResize, maxHeight, minHeight]);
    
    // Handle focus and blur
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };
    
    // Professional textarea base classes
    const textareaBaseClasses = cn(
      // Base styling
      'w-full rounded-lg border-2 bg-white px-4 py-3 text-base font-medium transition-all duration-200 ease-in-out resize-none',
      'placeholder:text-gray-400 placeholder:font-normal',
      'focus:outline-none focus:ring-0',
      
      // Professional spacing and typography
      'text-gray-900 leading-relaxed',
      
      // Variant-specific styling
      currentVariant === 'default' && [
        'border-gray-300 hover:border-gray-400',
        'focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]'
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
    
    // Label classes
    const labelClasses = cn(
      'block text-sm font-semibold leading-6 mb-2',
      currentVariant === 'error' ? 'text-red-700' : 
      currentVariant === 'success' ? 'text-green-700' : 
      currentVariant === 'warning' ? 'text-yellow-700' : 
      'text-gray-700'
    );
    
    return (
      <div className="space-y-1">
        {/* Label */}
        {label && (
          <label 
            htmlFor={textareaId}
            className={labelClasses}
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        {/* TextArea Container */}
        <div className="relative">
          {/* TextArea Field */}
          <textarea
            ref={(node) => {
              textareaRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className={textareaBaseClasses}
            id={textareaId}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            rows={autoResize ? undefined : rows}
            style={autoResize ? { minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` } : undefined}
            aria-invalid={currentVariant === 'error'}
            aria-describedby={
              error ? `${textareaId}-error` : 
              helperText ? `${textareaId}-helper` : 
              undefined
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {/* Status Icons */}
          <div className="absolute top-3 right-3 flex items-start">
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
        
        {/* Error Message */}
        {error && (
          <p 
            id={`${textareaId}-error`}
            className="text-sm text-red-600 font-medium animate-slide-in flex items-center gap-1"
            role="alert"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}
        
        {/* Helper Text */}
        {helperText && !error && (
          <p 
            id={`${textareaId}-helper`}
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

TextArea.displayName = 'TextArea';

export { TextArea };