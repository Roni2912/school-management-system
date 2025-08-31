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
 * Button variant styles
 */
export const buttonVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft hover:shadow-medium',
  outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground shadow-soft hover:shadow-medium',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft hover:shadow-medium',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  success: 'bg-success text-success-foreground hover:bg-success/90 shadow-soft hover:shadow-medium',
  warning: 'bg-warning text-warning-foreground hover:bg-warning/90 shadow-soft hover:shadow-medium',
};

export const buttonSizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

/**
 * Input variant styles
 */
export const inputVariants = {
  default: 'border-border bg-background hover:border-ring focus:border-ring focus:ring-ring/20',
  error: 'border-destructive bg-background focus:border-destructive focus:ring-destructive/20',
  success: 'border-success bg-background focus:border-success focus:ring-success/20',
  warning: 'border-warning bg-background focus:border-warning focus:ring-warning/20',
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
 * Generate button classes
 */
export function getButtonClasses(variant = 'default', size = 'default', className = '') {
  return cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:scale-105 active:scale-95',
    buttonVariants[variant],
    buttonSizes[size],
    className
  );
}

/**
 * Generate input classes
 */
export function getInputClasses(variant = 'default', className = '') {
  return cn(
    'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200',
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