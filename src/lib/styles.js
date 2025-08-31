/**
 * Style utility functions and class generators for consistent theming
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind classes with proper precedence
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Professional Button variant styles
 */
export const buttonVariants = {
  primary: 'bg-primary-600 text-white border border-primary-600 hover:bg-primary-700 hover:border-primary-700 hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)]',
  secondary: 'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-700',
  ghost: 'bg-transparent text-gray-600 border border-transparent hover:bg-gray-100 hover:text-gray-900',
};

export const buttonSizes = {
  sm: 'px-3 py-2 text-sm h-9',
  md: 'px-4 py-2.5 text-sm h-10',
  lg: 'px-6 py-3 text-base h-12',
};

/**
 * Professional Input variant styles
 */
export const inputVariants = {
  default: 'border-gray-300 bg-white hover:border-gray-400 focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]',
  error: 'border-red-300 bg-white hover:border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]',
  success: 'border-green-300 bg-white hover:border-green-400 focus:border-green-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]',
  warning: 'border-yellow-300 bg-white hover:border-yellow-400 focus:border-yellow-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]',
};

/**
 * Card variant styles
 */
export const cardVariants = {
  default: 'bg-background border border-border shadow-soft hover:shadow-medium',
  elevated: 'bg-background border border-border shadow-medium hover:shadow-strong',
  glass: 'bg-background/80 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-medium',
  outline: 'border border-border hover:border-ring/50',
};

/**
 * Animation classes
 */
export const animations = {
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
  scaleIn: 'animate-scale-in',
  bounceSubtle: 'animate-bounce-subtle',
  pulseSubtle: 'animate-pulse-subtle',
};

/**
 * Hover effect classes
 */
export const hoverEffects = {
  lift: 'hover-lift',
  glow: 'hover-glow',
  scale: 'hover:scale-105 transition-transform duration-200',
  rotate: 'hover:rotate-3 transition-transform duration-200',
};

/**
 * Loading state classes
 */
export const loadingStates = {
  skeleton: 'skeleton',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
};

/**
 * Typography classes
 */
export const typography = {
  h1: 'text-4xl font-bold tracking-tight text-foreground',
  h2: 'text-3xl font-semibold tracking-tight text-foreground',
  h3: 'text-2xl font-semibold tracking-tight text-foreground',
  h4: 'text-xl font-semibold tracking-tight text-foreground',
  h5: 'text-lg font-semibold tracking-tight text-foreground',
  h6: 'text-base font-semibold tracking-tight text-foreground',
  body: 'text-base text-muted-foreground',
  small: 'text-sm text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
  lead: 'text-xl text-muted-foreground',
};

/**
 * Spacing utilities
 */
export const spacing = {
  section: 'py-12 md:py-16 lg:py-20',
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  grid: 'grid gap-6 md:gap-8',
  stack: 'space-y-4',
  inline: 'space-x-4',
};

/**
 * Generate professional button classes
 */
export function getButtonClasses(variant = 'primary', size = 'md', className = '') {
  return cn(
    // Professional base styles
    'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out rounded-lg',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500',
    'disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed',
    'relative overflow-hidden transform hover:scale-[1.02] active:scale-[0.98]',
    'hover:shadow-medium active:shadow-soft',
    buttonVariants[variant] || buttonVariants.primary,
    buttonSizes[size] || buttonSizes.md,
    className
  );
}

/**
 * Generate professional input classes
 */
export function getInputClasses(variant = 'default', className = '') {
  return cn(
    // Professional base styling
    'w-full rounded-lg border-2 bg-white px-4 py-3 text-base font-medium',
    'placeholder:text-gray-400 placeholder:font-normal',
    'focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out',
    'text-gray-900 leading-tight',
    
    // File input styling
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700',
    
    // Disabled state
    'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200',
    
    // Variant-specific styles
    inputVariants[variant],
    className
  );
}

/**
 * Generate professional textarea classes
 */
export function getTextAreaClasses(variant = 'default', className = '') {
  return cn(
    // Professional base styling
    'w-full rounded-lg border-2 bg-white px-4 py-3 text-base font-medium',
    'placeholder:text-gray-400 placeholder:font-normal',
    'focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out resize-none',
    'text-gray-900 leading-relaxed',
    
    // Disabled state
    'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200',
    
    // Variant-specific styles
    inputVariants[variant],
    className
  );
}

/**
 * Generate card classes
 */
export function getCardClasses(variant = 'default', className = '') {
  return cn(
    'rounded-lg p-6 transition-all duration-200',
    cardVariants[variant],
    className
  );
}

/**
 * Generate responsive grid classes
 */
export function getGridClasses(cols = { default: 1, sm: 2, md: 3, lg: 4 }, className = '') {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  const responsiveClasses = [];
  
  if (cols.default) responsiveClasses.push(gridCols[cols.default]);
  if (cols.sm) responsiveClasses.push(`sm:${gridCols[cols.sm]}`);
  if (cols.md) responsiveClasses.push(`md:${gridCols[cols.md]}`);
  if (cols.lg) responsiveClasses.push(`lg:${gridCols[cols.lg]}`);
  if (cols.xl) responsiveClasses.push(`xl:${gridCols[cols.xl]}`);

  return cn('grid gap-6', ...responsiveClasses, className);
}

/**
 * Generate focus ring classes
 */
export function getFocusClasses(color = 'ring') {
  return `focus:outline-none focus:ring-2 focus:ring-${color} focus:ring-offset-2`;
}

/**
 * Generate status color classes
 */
export const statusColors = {
  success: {
    bg: 'bg-success/10',
    text: 'text-success',
    border: 'border-success/20',
  },
  warning: {
    bg: 'bg-warning/10',
    text: 'text-warning',
    border: 'border-warning/20',
  },
  error: {
    bg: 'bg-destructive/10',
    text: 'text-destructive',
    border: 'border-destructive/20',
  },
  info: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    border: 'border-primary/20',
  },
};

/**
 * Generate status classes
 */
export function getStatusClasses(status, className = '') {
  const colors = statusColors[status] || statusColors.info;
  return cn(colors.bg, colors.text, colors.border, className);
}