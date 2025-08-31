'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function TestButtonsPage() {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const handleLoadingTest = (buttonId: string) => {
    setLoading(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Button Component Library
          </h1>
          <p className="text-lg text-gray-600">
            Showcasing the new professional button variants with sophisticated hover effects and animations
          </p>
        </div>

        <div className="space-y-12">
          {/* Button Variants */}
          <section className="bg-white rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Primary</h3>
                <div className="space-y-3">
                  <Button variant="primary" size="sm">
                    Small Primary
                  </Button>
                  <Button variant="primary" size="md">
                    Medium Primary
                  </Button>
                  <Button variant="primary" size="lg">
                    Large Primary
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Secondary</h3>
                <div className="space-y-3">
                  <Button variant="secondary" size="sm">
                    Small Secondary
                  </Button>
                  <Button variant="secondary" size="md">
                    Medium Secondary
                  </Button>
                  <Button variant="secondary" size="lg">
                    Large Secondary
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Ghost</h3>
                <div className="space-y-3">
                  <Button variant="ghost" size="sm">
                    Small Ghost
                  </Button>
                  <Button variant="ghost" size="md">
                    Medium Ghost
                  </Button>
                  <Button variant="ghost" size="lg">
                    Large Ghost
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Loading States */}
          <section className="bg-white rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loading States</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Primary Loading</h3>
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="md"
                    loading={loading.primary}
                    onClick={() => handleLoadingTest('primary')}
                  >
                    {loading.primary ? 'Processing...' : 'Click to Load'}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Secondary Loading</h3>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    size="md"
                    loading={loading.secondary}
                    onClick={() => handleLoadingTest('secondary')}
                  >
                    {loading.secondary ? 'Processing...' : 'Click to Load'}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Ghost Loading</h3>
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    size="md"
                    loading={loading.ghost}
                    onClick={() => handleLoadingTest('ghost')}
                  >
                    {loading.ghost ? 'Processing...' : 'Click to Load'}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Disabled States */}
          <section className="bg-white rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Disabled States</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Primary Disabled</h3>
                <div className="space-y-3">
                  <Button variant="primary" size="md" disabled>
                    Disabled Primary
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Secondary Disabled</h3>
                <div className="space-y-3">
                  <Button variant="secondary" size="md" disabled>
                    Disabled Secondary
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Ghost Disabled</h3>
                <div className="space-y-3">
                  <Button variant="ghost" size="md" disabled>
                    Disabled Ghost
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Examples */}
          <section className="bg-white rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Interactive Examples</h2>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="md">
                  Save Changes
                </Button>
                <Button variant="secondary" size="md">
                  Cancel
                </Button>
                <Button variant="ghost" size="md">
                  Reset
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">
                  Quick Action
                </Button>
                <Button variant="ghost" size="sm">
                  Skip
                </Button>
              </div>
            </div>
          </section>

          {/* Focus States Demo */}
          <section className="bg-white rounded-lg p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accessibility & Focus States</h2>
            <p className="text-gray-600 mb-4">
              Use Tab key to navigate through buttons and see the professional focus states:
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md">
                Tab to me
              </Button>
              <Button variant="secondary" size="md">
                Then to me
              </Button>
              <Button variant="ghost" size="md">
                Finally to me
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}