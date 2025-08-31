'use client';

import { useEffect } from 'react';

export function ThemeScript() {
  useEffect(() => {
    // This script runs on the client to initialize theme before hydration
    const initializeTheme = () => {
      try {
        const storedTheme = localStorage.getItem('theme') || 'system';
        const root = document.documentElement;
        
        let resolvedTheme = 'light';
        
        if (storedTheme === 'system') {
          resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
          resolvedTheme = storedTheme;
        }
        
        // Remove existing theme classes
        root.classList.remove('light', 'dark');
        
        // Add resolved theme class
        root.classList.add(resolvedTheme);
        
        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          const themeColors = {
            light: '#ffffff',
            dark: '#0a0a0a'
          };
          metaThemeColor.setAttribute('content', themeColors[resolvedTheme as keyof typeof themeColors]);
        }
      } catch (error) {
        // Fallback to light theme if there's any error
        document.documentElement.classList.add('light');
      }
    };

    initializeTheme();
  }, []);

  return null;
}

// Inline script to prevent FOUC (Flash of Unstyled Content)
export const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'system';
    var root = document.documentElement;
    var resolvedTheme = 'light';
    
    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolvedTheme = theme;
    }
    
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    
    // Update meta theme-color
    var metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      var themeColors = {
        light: '#ffffff',
        dark: '#0a0a0a'
      };
      metaThemeColor.setAttribute('content', themeColors[resolvedTheme]);
    }
  } catch (e) {
    document.documentElement.classList.add('light');
  }
})();
`;