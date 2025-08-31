'use client';

import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

const SunIcon = () => (
  <svg
    className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const SystemIcon = () => (
  <svg
    className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

export function ThemeToggle({ className = '' }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-muted animate-pulse ${className}`} />
    );
  }

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon />;
      case 'dark':
        return <MoonIcon />;
      case 'system':
        return <SystemIcon />;
      default:
        return <SystemIcon />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark theme';
      case 'dark':
        return 'Switch to system theme';
      case 'system':
        return 'Switch to light theme';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        bg-background border border-border
        text-foreground hover:bg-accent hover:text-accent-foreground
        transition-all duration-200 ease-in-out
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        shadow-soft hover:shadow-medium
        ${className}
      `}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      <div className="relative">
        {getIcon()}
        {theme === 'system' && (
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        )}
      </div>
    </button>
  );
}

export function ThemeToggleDropdown({ className = '' }) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-32 h-10 rounded-lg bg-muted animate-pulse ${className}`} />
    );
  }

  const themes = [
    { value: 'light', label: 'Light', icon: <SunIcon /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon /> },
    { value: 'system', label: 'System', icon: <SystemIcon /> },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[2];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          inline-flex items-center justify-between
          w-32 px-3 py-2 rounded-lg
          bg-background border border-border
          text-sm font-medium text-foreground
          hover:bg-accent hover:text-accent-foreground
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          shadow-soft hover:shadow-medium
        "
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-2">
          {currentTheme.icon}
          <span>{currentTheme.label}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="
          absolute top-full left-0 mt-1 w-full
          bg-background border border-border rounded-lg
          shadow-strong backdrop-blur-sm
          animate-fade-in z-50
        ">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => {
                setTheme(themeOption.value);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-2 px-3 py-2
                text-sm text-left
                hover:bg-accent hover:text-accent-foreground
                transition-colors duration-150
                first:rounded-t-lg last:rounded-b-lg
                ${theme === themeOption.value ? 'bg-accent text-accent-foreground' : ''}
              `}
            >
              {themeOption.icon}
              <span>{themeOption.label}</span>
              {theme === themeOption.value && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}