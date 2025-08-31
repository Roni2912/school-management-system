'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SchoolForm } from '@/components/SchoolForm';
import { useToast } from '@/components/ui/Toast';
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
    <>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <SchoolForm
            onSubmit={handleFormSubmit}
            className="w-full"
          />
        </div>
        
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
    </>
  );
}