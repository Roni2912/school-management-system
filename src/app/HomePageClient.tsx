'use client';

import React from 'react';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/Button';

export default function HomePageClient() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Home Page</h2>
            <p className="text-gray-600 mb-6">There was an error loading the home page. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      }
    >
      {/* Professional Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e5e7eb%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            
            {/* Professional Badge */}
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium border border-primary-200 shadow-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
                </svg>
                Enterprise-Grade School Management
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-display-large lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight animate-slide-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Welcome to
              <span className="block text-primary-600 font-bold" style={{ 
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: '#2563eb' /* Fallback color */
              }}>
                SchoolHub Pro
              </span>
            </h1>
            
            {/* Professional Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Transform your educational institution management with our professional platform. 
              Streamline operations, enhance communication, and deliver exceptional educational experiences.
            </p>
            
            {/* Professional CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <Button
                asChild
                size="lg"
                className="group px-8 py-4 text-lg font-semibold shadow-medium hover:shadow-strong"
              >
                <Link href="/add-school">
                  <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New School
                </Link>
              </Button>
              
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="group px-8 py-4 text-lg font-semibold shadow-medium hover:shadow-strong"
              >
                <Link href="/schools">
                  <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Browse Directory
                </Link>
              </Button>
            </div>

            {/* Professional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-scale" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">Streamlined</div>
                <div className="text-gray-600">Registration Process</div>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">Reliable</div>
                <div className="text-gray-600">Data Management</div>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">Professional</div>
                <div className="text-gray-600">User Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Features Section */}
      <div className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700 border border-primary-200 mb-6">
              Platform Features
            </div>
            <h2 className="text-display-small lg:text-display-medium font-bold text-gray-900 mb-6">
              Everything you need for professional school management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools and features designed to streamline educational institution management 
              with enterprise-grade reliability and user experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <ErrorBoundary
              fallback={
                <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-gray-500">Feature unavailable</div>
                </div>
              }
            >
              <div className="group text-center p-8 lg:p-10 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-1 animate-fade-in-scale" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-headline-large font-semibold mb-4 text-gray-900">Streamlined Registration</h3>
                <p className="text-body-medium text-gray-600 leading-relaxed">
                  Intuitive registration process with comprehensive school details, contact information, 
                  and media uploads. Professional forms with real-time validation and guidance.
                </p>
              </div>
            </ErrorBoundary>
            
            <ErrorBoundary
              fallback={
                <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-gray-500">Feature unavailable</div>
                </div>
              }
            >
              <div className="group text-center p-8 lg:p-10 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-1 animate-fade-in-scale" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-headline-large font-semibold mb-4 text-gray-900">Professional Directory</h3>
                <p className="text-body-medium text-gray-600 leading-relaxed">
                  Elegant, responsive directory with advanced search and filtering capabilities. 
                  Rich visual presentation with optimized performance across all devices.
                </p>
              </div>
            </ErrorBoundary>
            
            <ErrorBoundary
              fallback={
                <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-gray-500">Feature unavailable</div>
                </div>
              }
            >
              <div className="group text-center p-8 lg:p-10 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-1 animate-fade-in-scale" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-headline-large font-semibold mb-4 text-gray-900">Enterprise Security</h3>
                <p className="text-body-medium text-gray-600 leading-relaxed">
                  Built with enterprise-grade security, performance optimization, and accessibility compliance. 
                  Reliable infrastructure with comprehensive error handling and monitoring.
                </p>
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>

      {/* Professional CTA Section */}
      <div className="py-20 lg:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            
            {/* CTA Header */}
            <div className="mb-8">
              <h2 className="text-display-small lg:text-display-medium font-bold text-white mb-6">
                Ready to transform your school management?
              </h2>
              <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed">
                Join educational institutions worldwide who trust SchoolHub Pro for their management needs. 
                Start building your professional school directory today.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                asChild
                size="lg"
                className="group px-8 py-4 text-lg font-semibold bg-white text-primary-600 hover:bg-gray-50 shadow-strong hover:shadow-glow"
              >
                <Link href="/add-school">
                  <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Your School
                </Link>
              </Button>
              
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="group px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-primary-600 shadow-medium"
              >
                <Link href="/schools">
                  <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Explore Directory
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-xl">
                <div className="text-4xl font-bold text-primary-600 mb-3 leading-none">99.9%</div>
                <div className="text-gray-700 text-base font-semibold tracking-wide">Uptime Reliability</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-xl">
                <div className="text-4xl font-bold text-green-600 mb-3 leading-none">24/7</div>
                <div className="text-gray-700 text-base font-semibold tracking-wide">Support Available</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-xl">
                <div className="text-4xl font-bold text-purple-600 mb-3 leading-none">WCAG</div>
                <div className="text-gray-700 text-base font-semibold tracking-wide">Accessibility Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}