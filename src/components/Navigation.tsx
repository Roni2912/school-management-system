'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Professional navigation items without emoji icons
  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/schools', label: 'Schools' },
    { href: '/add-school', label: 'Add School' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Professional Header Navigation */}
      <nav 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-gray-200' 
            : 'bg-white/85 backdrop-blur-sm border-b border-gray-100/60'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Professional Logo Section */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="group flex items-center transition-all duration-200 hover:opacity-90"
                onClick={closeMobileMenu}
                aria-label="SchoolHub Pro - Go to Dashboard"
              >
                <Logo 
                  variant="full" 
                  size="md" 
                  className="hidden sm:flex group-hover:scale-105 transition-transform duration-200"
                />
                <Logo 
                  variant="icon" 
                  size="md" 
                  className="sm:hidden group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Professional Layout */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group',
                      'hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100/50 hover:scale-105 active:scale-95',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                      'transform hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]',
                      isActive(item.href)
                        ? 'text-primary-600 bg-gradient-to-br from-primary-50 to-primary-100/50 shadow-sm scale-105 border border-primary-200/50'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* Enhanced Active indicator with animation */}
                    {isActive(item.href) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-primary-600 rounded-full animate-scale-in" />
                    )}
                    
                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-400 rounded-full transition-all duration-300 group-hover:w-6" />
                  </Link>
                ))}
              </div>
              
              {/* User Profile Section - Placeholder for future implementation */}
              <div className="ml-6 pl-6 border-l border-gray-200">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button - Professional Design */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  'inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 ease-in-out',
                  'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-105 active:scale-95',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  'hover:shadow-soft',
                  isMobileMenuOpen && 'bg-gray-100 text-gray-900 scale-105'
                )}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <svg
                  className={cn('h-6 w-6 transition-all duration-500 ease-out', {
                    'rotate-180 scale-110': isMobileMenuOpen,
                  })}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Slide-out Panel */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'visible' : 'invisible'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={closeMobileMenu}
        />
        
        {/* Slide-out Panel */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl',
            'transform transition-transform duration-300 ease-in-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Mobile Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Logo variant="full" size="sm" />
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:shadow-soft"
              aria-label="Close navigation menu"
            >
              <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Items */}
          <div className="px-6 py-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200',
                    'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                      : 'text-gray-700 hover:text-gray-900'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <svg className="ml-auto h-4 w-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Panel Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Administrator</p>
                <p className="text-xs text-gray-500">School Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;