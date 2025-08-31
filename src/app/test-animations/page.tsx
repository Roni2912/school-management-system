'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SchoolCard } from '@/components/SchoolCard';
import { LoadingSpinner, LoadingOverlay } from '@/components/ui/LoadingSpinner';
import { GridSkeleton, SchoolCardSkeleton, FormFieldSkeleton } from '@/components/ui/SkeletonLoader';
import { FadeIn, Stagger, ScaleIn, HoverLift, LoadingDots, Shimmer, BounceIn } from '@/components/ui/AnimationUtils';

export default function TestAnimationsPage() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const mockSchool = {
    id: 1,
    name: "Springfield Elementary School",
    address: "123 Education Street",
    city: "Springfield",
    state: "IL",
    contact: "+1 (555) 123-4567",
    email_id: "info@springfield-elementary.edu",
    image: "/api/placeholder/400/240"
  };

  const handleTestLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const handleTestValidation = () => {
    if (inputValue.length < 3) {
      setInputError('Input must be at least 3 characters long');
    } else {
      setInputError('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <FadeIn direction="down" className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Micro-Interactions Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the enhanced animations, transitions, and micro-interactions 
            that make our school management system feel professional and engaging.
          </p>
        </FadeIn>

        {/* Button Animations Section */}
        <section className="mb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Enhanced Button Interactions</h2>
            <p className="text-gray-600 mb-6">
              Buttons now feature sophisticated hover effects, shine animations, and ripple effects.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={200}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">Primary Buttons</h3>
                <div className="space-y-3">
                  <Button variant="primary" size="lg" className="w-full">
                    Hover for Shine Effect
                  </Button>
                  <Button variant="primary" loading className="w-full">
                    Loading State
                  </Button>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={400}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">Secondary Buttons</h3>
                <div className="space-y-3">
                  <Button variant="secondary" size="lg" className="w-full">
                    Subtle Hover Fill
                  </Button>
                  <Button variant="ghost" size="lg" className="w-full">
                    Ghost Variant
                  </Button>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={600}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">Interactive States</h3>
                <div className="space-y-3">
                  <Button variant="primary" size="lg" className="w-full" onClick={handleTestLoading}>
                    Test Loading Overlay
                  </Button>
                  <Button variant="secondary" size="lg" className="w-full" disabled>
                    Disabled State
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Form Animations Section */}
        <section className="mb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Enhanced Form Validation</h2>
            <p className="text-gray-600 mb-6">
              Form fields now feature smooth validation feedback with shake animations for errors and success states.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={200}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">Validation Animations</h3>
                <div className="space-y-4">
                  <Input
                    label="Test Input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    error={inputError}
                    success={!inputError && inputValue.length >= 3}
                    placeholder="Type at least 3 characters"
                    helperText="Watch the validation animations"
                  />
                  <Button onClick={handleTestValidation} className="w-full">
                    Test Validation
                  </Button>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={400}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">Floating Label Animation</h3>
                <div className="space-y-4">
                  <Input
                    label="Floating Label"
                    floatingLabel
                    placeholder=""
                    helperText="Click to see floating label animation"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    floatingLabel
                    placeholder=""
                    helperText="Professional floating label design"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Card Animations Section */}
        <section className="mb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Enhanced Card Interactions</h2>
            <p className="text-gray-600 mb-6">
              School cards now feature sophisticated hover effects with elevation, scaling, and image zoom.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FadeIn delay={200}>
              <SchoolCard school={mockSchool} />
            </FadeIn>
            <FadeIn delay={400}>
              <SchoolCard school={{...mockSchool, id: 2, name: "Riverside High School"}} />
            </FadeIn>
            <FadeIn delay={600}>
              <SchoolCard school={{...mockSchool, id: 3, name: "Oakwood Academy"}} />
            </FadeIn>
          </div>
        </section>

        {/* Loading States Section */}
        <section className="mb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Loading States</h2>
            <p className="text-gray-600 mb-6">
              Enhanced loading spinners, skeleton loaders, and loading overlays with glow effects.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={200}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">Loading Spinners</h3>
                <div className="flex items-center justify-around">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                  <LoadingSpinner size="xl" />
                </div>
                <div className="mt-4 flex justify-center">
                  <LoadingDots size="lg" />
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={400}>
              <LoadingOverlay isLoading={loading} message="Testing loading overlay...">
                <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200 min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Loading Overlay Test</h3>
                    <p className="text-gray-600 mb-4">Click the button above to test the loading overlay</p>
                    {showSuccess && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-zoom-in">
                        <p className="text-green-700 font-medium">Success! Animation completed.</p>
                      </div>
                    )}
                  </div>
                </div>
              </LoadingOverlay>
            </FadeIn>
          </div>
        </section>

        {/* Skeleton Loaders Section */}
        <section className="mb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Skeleton Loaders</h2>
            <p className="text-gray-600 mb-6">
              Sophisticated skeleton loading states that match the actual content structure.
            </p>
          </FadeIn>
          
          <div className="space-y-8">
            <FadeIn delay={200}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">School Card Skeleton</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SchoolCardSkeleton />
                  <SchoolCardSkeleton />
                  <SchoolCardSkeleton />
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={400}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">Form Field Skeleton</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormFieldSkeleton />
                  <FormFieldSkeleton />
                  <FormFieldSkeleton />
                  <FormFieldSkeleton />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Animation Utilities Section */}
        <section className="mb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Animation Utilities</h2>
            <p className="text-gray-600 mb-6">
              Various animation components for creating engaging user experiences.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScaleIn delay={200}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200 text-center">
                <h3 className="font-semibold mb-2">Scale In Animation</h3>
                <p className="text-gray-600">Smooth scale-in effect on scroll</p>
              </div>
            </ScaleIn>
            
            <BounceIn delay={400}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200 text-center">
                <h3 className="font-semibold mb-2">Bounce In Animation</h3>
                <p className="text-gray-600">Playful bounce effect on appearance</p>
              </div>
            </BounceIn>
            
            <HoverLift>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200 text-center">
                <h3 className="font-semibold mb-2">Hover Lift Effect</h3>
                <p className="text-gray-600">Hover to see the lift animation</p>
              </div>
            </HoverLift>
          </div>
        </section>

        {/* Staggered Animation Section */}
        <section className="mb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Staggered Animations</h2>
            <p className="text-gray-600 mb-6">
              Elements appear in sequence for a more dynamic and professional feel.
            </p>
          </FadeIn>
          
          <Stagger staggerDelay={150}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="p-4 bg-white rounded-lg shadow-soft border border-gray-200 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {item}
                  </div>
                  <div>
                    <h4 className="font-semibold">Staggered Item {item}</h4>
                    <p className="text-gray-600 text-sm">Each item appears with a slight delay</p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </section>

        {/* Shimmer Effect Section */}
        <section className="mb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shimmer Effects</h2>
            <p className="text-gray-600 mb-6">
              Subtle shimmer animations for highlighting important elements.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={200}>
              <Shimmer>
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
                  <h3 className="font-semibold mb-2">Shimmer Effect</h3>
                  <p>Watch the subtle shimmer animation</p>
                </div>
              </Shimmer>
            </FadeIn>
            
            <FadeIn delay={400}>
              <div className="p-6 bg-white rounded-xl shadow-soft border border-gray-200">
                <h3 className="font-semibold mb-4">CSS Animation Classes</h3>
                <div className="space-y-2 text-sm">
                  <div className="animate-heartbeat p-2 bg-red-100 rounded">Heartbeat Animation</div>
                  <div className="animate-float p-2 bg-blue-100 rounded">Float Animation</div>
                  <div className="animate-glow p-2 bg-purple-100 rounded">Glow Animation</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Summary */}
        <FadeIn direction="up" className="text-center">
          <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Professional Micro-Interactions Complete
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All components now feature enhanced animations, smooth transitions, and professional 
              micro-interactions that create an engaging and polished user experience.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}