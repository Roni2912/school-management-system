/**
 * Application Constants and Brand Configuration
 * Centralized constants for consistent usage across the application
 */

// Brand Identity
export const BRAND = {
  name: 'SchoolHub Pro',
  tagline: 'Professional School Management',
  description: 'Enterprise-grade school management system for educational institutions',
  version: '1.0.0',
} as const;

// Professional Color Palette
export const COLORS = {
  // Primary Brand Colors
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb', // Main brand color
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Neutral Colors
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic Colors
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4',
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  FONT_FAMILY: {
    PRIMARY: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    HEADING: ['Poppins', 'Inter', 'sans-serif'],
    MONO: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
  },
  
  FONT_SIZE: {
    XS: '0.75rem',    // 12px
    SM: '0.875rem',   // 14px
    BASE: '1rem',     // 16px
    LG: '1.125rem',   // 18px
    XL: '1.25rem',    // 20px
    '2XL': '1.5rem',  // 24px
    '3XL': '1.875rem', // 30px
    '4XL': '2.25rem', // 36px
  },
  
  FONT_WEIGHT: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
  },
} as const;

// Spacing System (8px grid)
export const SPACING = {
  XS: '4px',   // 0.5 units
  SM: '8px',   // 1 unit
  MD: '16px',  // 2 units
  LG: '24px',  // 3 units
  XL: '32px',  // 4 units
  '2XL': '48px', // 6 units
  '3XL': '64px', // 8 units
} as const;

// Border Radius
export const RADIUS = {
  SM: '4px',
  MD: '8px',
  LG: '12px',
  XL: '16px',
} as const;

// Professional Shadows
export const SHADOWS = {
  SOFT: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
  MEDIUM: '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
  STRONG: '0 8px 32px 0 rgba(0, 0, 0, 0.16)',
  GLOW: '0 0 20px rgba(59, 130, 246, 0.3)',
} as const;

// Animation Durations
export const ANIMATION = {
  DURATION: {
    FAST: '150ms',
    NORMAL: '300ms',
    SLOW: '500ms',
  },
  
  EASING: {
    OUT: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    IN: 'cubic-bezier(0.4, 0.0, 1, 1)',
    IN_OUT: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Logo Configuration
export const LOGO = {
  VARIANTS: {
    FULL: 'full',
    ICON: 'icon',
    TEXT: 'text',
  },
  
  SIZES: {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
  },
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Z-Index Scale
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;

// Application Routes
export const ROUTES = {
  HOME: '/',
  SCHOOLS: '/schools',
  ADD_SCHOOL: '/add-school',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  SCHOOLS: '/api/schools',
} as const;

// Form Validation
export const VALIDATION = {
  SCHOOL_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  
  PHONE: {
    PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
  },
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

// Professional Messages
export const MESSAGES = {
  SUCCESS: {
    SCHOOL_ADDED: 'School has been successfully added to the system.',
    SCHOOL_UPDATED: 'School information has been updated successfully.',
    SCHOOL_DELETED: 'School has been removed from the system.',
  },
  
  ERROR: {
    GENERIC: 'An unexpected error occurred. Please try again.',
    NETWORK: 'Network error. Please check your connection and try again.',
    VALIDATION: 'Please check the form for errors and try again.',
    FILE_TOO_LARGE: 'File size exceeds the maximum limit of 5MB.',
    INVALID_FILE_TYPE: 'Please select a valid image file (JPG, PNG, or WebP).',
  },
  
  LOADING: {
    SCHOOLS: 'Loading schools...',
    SAVING: 'Saving...',
    UPLOADING: 'Uploading...',
  },
  
  EMPTY_STATES: {
    NO_SCHOOLS: 'No schools found. Add your first school to get started.',
    NO_RESULTS: 'No schools match your search criteria.',
  },
} as const;

// Professional Metadata
export const META = {
  TITLE: {
    DEFAULT: 'SchoolHub Pro - Professional School Management',
    HOME: 'SchoolHub Pro - Dashboard',
    SCHOOLS: 'Schools - SchoolHub Pro',
    ADD_SCHOOL: 'Add School - SchoolHub Pro',
  },
  
  DESCRIPTION: {
    DEFAULT: 'Enterprise-grade school management system for educational institutions. Streamline administration, manage schools, and enhance educational operations with professional tools.',
    HOME: 'Professional dashboard for managing educational institutions with enterprise-grade tools and features.',
    SCHOOLS: 'Browse and manage educational institutions with comprehensive school information and professional tools.',
    ADD_SCHOOL: 'Add new educational institutions to your management system with detailed information and professional forms.',
  },
} as const;

// Export all constants as a single object for convenience
export const CONSTANTS = {
  BRAND,
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
  ANIMATION,
  LOGO,
  BREAKPOINTS,
  Z_INDEX,
  ROUTES,
  API_ENDPOINTS,
  VALIDATION,
  FILE_UPLOAD,
  MESSAGES,
  META,
} as const;

export default CONSTANTS;