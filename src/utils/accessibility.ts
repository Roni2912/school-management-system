/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 */

// Color contrast ratios for WCAG 2.1 AA compliance
export const WCAG_AA_NORMAL = 4.5;
export const WCAG_AA_LARGE = 3.0;
export const WCAG_AAA_NORMAL = 7.0;
export const WCAG_AAA_LARGE = 4.5;

/**
 * Calculate relative luminance of a color
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns Relative luminance (0-1)
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Convert hex color to RGB
 * @param hex Hex color string (e.g., "#ffffff" or "ffffff")
 * @returns RGB object or null if invalid
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 First color (hex)
 * @param color2 Second color (hex)
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format. Use hex colors like "#ffffff"');
  }
  
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 * @param foreground Foreground color (hex)
 * @param background Background color (hex)
 * @param isLargeText Whether text is large (18pt+ or 14pt+ bold)
 * @returns Object with compliance information
 */
export function checkWCAGCompliance(
  foreground: string, 
  background: string, 
  isLargeText: boolean = false
) {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? WCAG_AA_LARGE : WCAG_AA_NORMAL;
  const requiredRatioAAA = isLargeText ? WCAG_AAA_LARGE : WCAG_AAA_NORMAL;
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA: ratio >= requiredRatio,
    passesAAA: ratio >= requiredRatioAAA,
    requiredAA: requiredRatio,
    requiredAAA: requiredRatioAAA,
    grade: ratio >= requiredRatioAAA ? 'AAA' : ratio >= requiredRatio ? 'AA' : 'Fail'
  };
}

/**
 * Professional color palette with WCAG AA compliance
 */
export const accessibleColors = {
  // Primary colors (WCAG AA compliant on white)
  primary: {
    600: '#2563eb', // 4.5:1 on white
    700: '#1d4ed8', // 6.3:1 on white
  },
  
  // Gray colors (WCAG AA compliant combinations)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    500: '#6b7280', // 4.6:1 on white
    600: '#4b5563', // 7.0:1 on white
    700: '#374151', // 10.8:1 on white
    800: '#1f2937', // 16.0:1 on white
    900: '#111827', // 18.7:1 on white
  },
  
  // Semantic colors (WCAG AA compliant) - Updated for better contrast
  success: '#047857', // 5.2:1 on white (darker green)
  warning: '#b45309', // 4.8:1 on white (darker orange)
  error: '#dc2626',   // 5.9:1 on white
  info: '#0369a1',    // 4.9:1 on white (darker blue)
};

/**
 * Generate accessible focus ring styles
 * @param color Primary color for focus ring
 * @returns CSS-in-JS object for focus styles
 */
export function generateFocusStyles(color: string = '#2563eb') {
  return {
    outline: `2px solid ${color}`,
    outlineOffset: '2px',
    boxShadow: `0 0 0 4px ${color}20`, // 20% opacity
  };
}

/**
 * Check if user prefers reduced motion
 * @returns Boolean indicating reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 * @returns Boolean indicating high contrast preference
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Generate skip link for keyboard navigation
 * @param targetId ID of the main content element
 * @returns JSX element for skip link
 */
export function createSkipLink(targetId: string = 'main-content') {
  return {
    href: `#${targetId}`,
    className: 'skip-link',
    children: 'Skip to main content'
  };
}

/**
 * Validate and suggest improvements for accessibility
 * @param element DOM element to check
 * @returns Array of accessibility suggestions
 */
export function auditAccessibility(element: HTMLElement): string[] {
  const suggestions: string[] = [];
  
  // Check for missing alt text on images
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      suggestions.push('Image missing alt text or aria-label');
    }
  });
  
  // Check for missing labels on form inputs
  const inputs = element.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    const hasLabel = input.getAttribute('aria-label') || 
                    input.getAttribute('aria-labelledby') ||
                    element.querySelector(`label[for="${input.id}"]`);
    if (!hasLabel) {
      suggestions.push(`Form input missing label: ${input.tagName.toLowerCase()}`);
    }
  });
  
  // Check for missing headings hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > lastLevel + 1) {
      suggestions.push(`Heading hierarchy skip detected: ${heading.tagName} after h${lastLevel}`);
    }
    lastLevel = level;
  });
  
  // Check for missing focus indicators
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusableElements.forEach(el => {
    const computedStyle = window.getComputedStyle(el);
    if (computedStyle.outline === 'none' && !computedStyle.boxShadow.includes('inset')) {
      suggestions.push('Focusable element missing focus indicator');
    }
  });
  
  return suggestions;
}

/**
 * ARIA live region announcer for dynamic content
 */
export class LiveRegionAnnouncer {
  private liveRegion: HTMLElement | null = null;
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.createLiveRegion();
    }
  }
  
  private createLiveRegion() {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'live-region';
    document.body.appendChild(this.liveRegion);
  }
  
  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.liveRegion) return;
    
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = '';
      }
    }, 1000);
  }
  
  destroy() {
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
      this.liveRegion = null;
    }
  }
}

// Export singleton instance
export const liveAnnouncer = new LiveRegionAnnouncer();