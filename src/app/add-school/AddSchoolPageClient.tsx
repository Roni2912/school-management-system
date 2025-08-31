'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SchoolForm } from '@/components/SchoolForm';
import { useToast } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import type { SchoolFormData } from '@/lib/validations';

export default function AddSchoolPageClient() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const handleFormSubmit = async (data: SchoolFormData) => {
    try {
      const formData = new FormData();
      
      // Add all form fields to FormData
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add school');
      }

      showSuccess(
        'School Added Successfully!',
        `${data.name} has been added to the directory.`
      );

      // Navigate to schools page after successful submission
      setTimeout(() => {
        router.push('/schools');
      }, 2000);

      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add school';
      showError('Submission Failed', errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const handleViewSchools = () => {
    router.push('/schools');
  };

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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Add School Form</h2>
            <p className="text-gray-600 mb-6">There was an error loading the school registration form. Please try refreshing the page.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={handleViewSchools}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                View Schools Instead
              </button>
            </div>
          </div>
        </div>
      }
    >
      {/* Professional Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>
      </div>

      {/* Professional Page Header */}
      <PageHeader
        title="Add New School"
        subtitle="School Registration"
        description="Expand our educational network by adding a new institution to our comprehensive directory. Your submission will help students and families discover quality educational opportunities."
        variant="default"
      >
        <Button
          variant="secondary"
          onClick={handleViewSchools}
          className="group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          View All Schools
        </Button>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg border border-primary-200">
          <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-primary-700 font-medium">Form auto-saves as you type</span>
        </div>
      </PageHeader>

      {/* Enhanced Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorBoundary
          fallback={
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12">
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-headline-large text-gray-900 mb-3">Form Error</h3>
                <p className="text-body-medium text-gray-600 mb-8 max-w-md mx-auto">
                  The school registration form encountered an error and cannot be displayed. Please try reloading the page.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Reload Form
                  </button>
                  <button
                    onClick={handleViewSchools}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    View Schools Instead
                  </button>
                </div>
              </div>
            </div>
          }
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <SchoolForm
              onSubmit={handleFormSubmit}
              className="p-8 md:p-12"
            />
          </div>
        </ErrorBoundary>
        
        {/* Enhanced Help Section */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {/* Guidelines Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-headline-medium text-blue-900">Form Guidelines</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-800 mb-3">Required Information</h4>
                <div className="space-y-2">
                  {[
                    'School name (2-255 characters)',
                    'Complete address (5-500 characters)',
                    'City and state information',
                    'Valid contact number',
                    'Valid email address'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-blue-700">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-800 mb-3">Image Upload</h4>
                <div className="space-y-2">
                  {[
                    'Supported: JPG, PNG, WebP',
                    'Maximum size: 5MB',
                    'High-quality photos preferred',
                    'Auto-optimization included'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-blue-700">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Tips Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-semibold text-green-800">Quick Tips</h4>
            </div>
            
            <div className="space-y-3 text-sm text-green-700">
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Use official school names for better recognition</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Include area codes in phone numbers</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Upload building or campus photos when possible</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Double-check email addresses for accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}