'use client';

import React from 'react';
import { ProfessionalGrid, ProfessionalContainer, ProfessionalSection } from '@/components/ui/ProfessionalGrid';

export default function TestGridPage() {
  const mockItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is a test item ${i + 1} to demonstrate the professional grid system.`
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfessionalSection spacing="lg" background="gradient">
        <ProfessionalContainer size="xl" padding="md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Grid System Test
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testing the responsive grid layout with professional spacing and alignment
            </p>
          </div>

          <ProfessionalGrid
            spacing="md"
            columns={{
              mobile: 1,
              tablet: 2,
              desktop: 3,
              large: 4,
              ultrawide: 5
            }}
          >
            {mockItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </ProfessionalGrid>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              Grid system test completed successfully
            </p>
          </div>
        </ProfessionalContainer>
      </ProfessionalSection>
    </div>
  );
}