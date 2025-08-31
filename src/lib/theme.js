/**
 * Theme utility functions for the School Management System
 */

/**
 * Get the current theme from localStorage or system preference
 */
export function getStoredTheme() {
  if (typeof window === 'undefined') return 'system';
  
  try {
    return localStorage.getItem('theme') || 'system';
  } catch {
    return 'system';
  }
}

/**
 * Set theme in localStorage
 */
export function setStoredTheme(theme) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Silently fail if localStorage is not available
  }
}

/**
 * Get system theme preference
 */
export function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Resolve theme to actual theme (light/dark)
 */
export function resolveTheme(theme) {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

/**
 * Apply theme to document
 */
export function applyTheme(theme) {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  const resolvedTheme = resolveTheme(theme);
  
  // Remove existing theme classes
  root.classList.remove('light', 'dark');
  
  // Add new theme class
  root.classList.add(resolvedTheme);
  
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    const themeColors = {
      light: '#ffffff',
      dark: '#0a0a0a'
    };
    metaThemeColor.setAttribute('content', themeColors[resolvedTheme]);
  }
}

/**
 * Initialize theme system
 */
export function initializeTheme() {
  if (typeof window === 'undefined') return;
  
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = () => {
    const currentTheme = getStoredTheme();
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

/**
 * Theme-aware color utilities
 */
export const themeColors = {
  light: {
    background: '#ffffff',
    foreground: '#0f172a',
    primary: '#2563eb',
    secondary: '#f1f5f9',
    muted: '#f8fafc',
    accent: '#f1f5f9',
    destructive: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    border: '#e2e8f0',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#f8fafc',
    primary: '#3b82f6',
    secondary: '#1e293b',
    muted: '#1e293b',
    accent: '#1e293b',
    destructive: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
    border: '#334155',
  }
};

/**
 * Get color value for current theme
 */
export function getThemeColor(colorName, theme = null) {
  const currentTheme = theme || resolveTheme(getStoredTheme());
  return themeColors[currentTheme]?.[colorName] || themeColors.light[colorName];
}

/**
 * Animation and transition utilities
 */
export const animations = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easings: {
    out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0.0, 1, 1)',
    inOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

/**
 * Create transition string
 */
export function createTransition(properties, duration = 'fast', easing = 'inOut') {
  const props = Array.isArray(properties) ? properties.join(', ') : properties;
  return `${props} ${animations.durations[duration]} ${animations.easings[easing]}`;
}

/**
 * Responsive breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Create media query
 */
export function createMediaQuery(breakpoint, type = 'min') {
  return `@media (${type}-width: ${breakpoints[breakpoint]})`;
}

/**
 * Shadow utilities
 */
export const shadows = {
  soft: '0 2px 8px 0 rgba(0, 0, 0, 0.05)',
  medium: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
  strong: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
  glow: '0 0 20px rgba(59, 130, 246, 0.3)',
};

/**
 * Get theme-appropriate shadow
 */
export function getThemeShadow(shadowName, theme = null) {
  const currentTheme = theme || resolveTheme(getStoredTheme());
  
  if (currentTheme === 'dark') {
    const darkShadows = {
      soft: '0 2px 8px 0 rgba(0, 0, 0, 0.3)',
      medium: '0 4px 16px 0 rgba(0, 0, 0, 0.4)',
      strong: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      glow: '0 0 20px rgba(59, 130, 246, 0.4)',
    };
    return darkShadows[shadowName] || shadows[shadowName];
  }
  
  return shadows[shadowName];
}