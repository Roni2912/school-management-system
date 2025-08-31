/**
 * Professional Brand System for SchoolHub Pro
 * Centralized brand colors, typography, and design tokens
 */

// Brand Colors - Professional Blue Primary Palette
export const brandColors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main brand color
    600: '#2563eb', // Primary interactive color
    700: '#1d4ed8', // Primary hover/active
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Supporting Gray Palette
  gray: {
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
  semantic: {
    success: '#10b981',
    successLight: '#d1fae5',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    error: '#ef4444',
    errorLight: '#fee2e2',
    info: '#06b6d4',
    infoLight: '#cffafe',
  },
  
  // Background System
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    card: '#ffffff',
    input: '#ffffff',
    hover: '#f8fafc',
    active: '#f1f5f9',
  }
} as const;

// Typography System
export const brandTypography = {
  fontFamily: {
    primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    heading: ['Poppins', 'Inter', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }
} as const;

// Spacing System (8px grid)
export const brandSpacing = {
  xs: '4px',   // 0.5 * 8px
  sm: '8px',   // 1 * 8px
  md: '16px',  // 2 * 8px
  lg: '24px',  // 3 * 8px
  xl: '32px',  // 4 * 8px
  '2xl': '48px', // 6 * 8px
  '3xl': '64px', // 8 * 8px
} as const;

// Border Radius
export const brandRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
} as const;

// Professional Shadows
export const brandShadows = {
  soft: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
  medium: '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
  strong: '0 8px 32px 0 rgba(0, 0, 0, 0.16)',
  glow: '0 0 20px rgba(59, 130, 246, 0.3)',
} as const;

// Animation System
export const brandAnimation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  easing: {
    out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0.0, 1, 1)',
    inOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
} as const;

// Logo Specifications
export const brandLogo = {
  name: 'SchoolHub Pro',
  tagline: 'Professional School Management',
  
  sizes: {
    sm: {
      height: '32px',
      iconSize: '32px',
      fontSize: '18px',
    },
    md: {
      height: '40px',
      iconSize: '40px',
      fontSize: '20px',
    },
    lg: {
      height: '48px',
      iconSize: '48px',
      fontSize: '24px',
    },
    xl: {
      height: '64px',
      iconSize: '64px',
      fontSize: '30px',
    }
  },
  
  clearSpace: {
    minimum: '1x logo height on all sides',
  },
  
  variants: {
    full: 'Logo with icon and text',
    icon: 'Icon only for small spaces',
    text: 'Text only for horizontal constraints',
  }
} as const;

// Brand Guidelines
export const brandGuidelines = {
  colorUsage: {
    primary: 'Use for main actions, links, and brand elements',
    gray: 'Use for text, borders, and neutral elements',
    semantic: 'Use for status indicators and feedback',
  },
  
  typography: {
    headings: 'Use Poppins for headings and important text',
    body: 'Use Inter for body text and UI elements',
    hierarchy: 'Maintain clear visual hierarchy with size and weight',
  },
  
  spacing: {
    grid: 'Follow 8px grid system for consistent spacing',
    whitespace: 'Use generous whitespace for professional appearance',
  },
  
  accessibility: {
    contrast: 'Ensure WCAG 2.1 AA compliance for all text',
    focus: 'Provide clear focus indicators for keyboard navigation',
    semantic: 'Use semantic HTML and proper ARIA labels',
  }
} as const;

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};
  
  // Primary colors
  Object.entries(brandColors.primary).forEach(([key, value]) => {
    cssVars[`--primary-${key}`] = value;
  });
  
  // Gray colors
  Object.entries(brandColors.gray).forEach(([key, value]) => {
    cssVars[`--gray-${key}`] = value;
  });
  
  // Semantic colors
  Object.entries(brandColors.semantic).forEach(([key, value]) => {
    cssVars[`--${key}`] = value;
  });
  
  // Background colors
  Object.entries(brandColors.background).forEach(([key, value]) => {
    cssVars[`--bg-${key}`] = value;
  });
  
  // Spacing
  Object.entries(brandSpacing).forEach(([key, value]) => {
    cssVars[`--space-${key}`] = value;
  });
  
  // Shadows
  Object.entries(brandShadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });
  
  return cssVars;
};

// Utility functions for consistent color usage
export const getBrandColor = (color: keyof typeof brandColors.primary, shade?: keyof typeof brandColors.primary) => {
  if (shade) {
    return brandColors.primary[shade];
  }
  return brandColors.primary[color as keyof typeof brandColors.primary];
};

export const getSemanticColor = (type: keyof typeof brandColors.semantic) => {
  return brandColors.semantic[type];
};

export const getBackgroundColor = (type: keyof typeof brandColors.background) => {
  return brandColors.background[type];
};

// Export default brand configuration
export const brand = {
  colors: brandColors,
  typography: brandTypography,
  spacing: brandSpacing,
  radius: brandRadius,
  shadows: brandShadows,
  animation: brandAnimation,
  logo: brandLogo,
  guidelines: brandGuidelines,
} as const;

export default brand;