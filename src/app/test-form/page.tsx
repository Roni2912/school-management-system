'use client';

import React from 'react';
import { SchoolForm } from '@/components/SchoolForm';
import { ToastProvider } from '@/components/ui/Toast';
import { type SchoolFormData } from '@/lib/validations';

// Mock submission handler for testing
const handleFormSubmit = async (data: SchoolFormData): Promise<{ success: boolean; message?: string; data?: unknown }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success/failure randomly for testing
  const isSuccess = Math.random() > 0.3; // 70% success rate
  
  if (isSuccess) {
    return {
      success: true,
      message: 'School added successfully',
      data: { id: Math.random().toString(36).substring(2, 15), ...data }
    };
  } else {
    return {
      success: false,
      message: 'Failed to add school. Please try again.'
    };
  }
};

export default function TestFormPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">School Form Test</h1>
            <p className="text-gray-600">Test the school form with image upload and feedback functionality</p>
          </div>
          
          <SchoolForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </ToastProvider>
  );
}