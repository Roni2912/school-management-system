'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SchoolForm } from '@/components/SchoolForm';
import { useToast } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
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
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add New School
              </h1>
              <p className="mt-2 text-gray-600">
                Fill out the form below to add a new educational institution to our directory
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleViewSchools}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                View Schools
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary
          fallback={
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Form Error</h3>
                <p className="text-gray-600 mb-4">The school registration form encountered an error and cannot be displayed.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Reload Form
                </button>
              </div>
            </div>
          }
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <SchoolForm
              onSubmit={handleFormSubmit}
              className="w-full"
            />
          </div>
        </ErrorBoundary>
        
        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📝 Form Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Required Information:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>School name (2-255 characters)</li>
                <li>Complete address (5-500 characters)</li>
                <li>City and state information</li>
                <li>Valid contact number</li>
                <li>Valid email address</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Image Upload:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Supported formats: JPG, PNG, WebP</li>
                <li>Maximum file size: 5MB</li>
                <li>Recommended: High-quality school photos</li>
                <li>Images will be optimized automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}