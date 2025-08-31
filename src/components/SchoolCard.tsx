'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface SchoolData {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SchoolCardProps {
  school: SchoolData;
  className?: string;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school, className }) => {
  const { name, address, city, state, contact, email_id, image } = school;
  
  // Format the full address
  const fullAddress = `${address}, ${city}, ${state}`;
  
  // Format contact number for display
  const formatContact = (contact: string): string => {
    // Remove any existing formatting
    const cleaned = contact.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX if it's a 10-digit US number
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    // Format as +X (XXX) XXX-XXXX if it's an 11-digit number starting with 1
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    // Return original if it doesn't match standard formats
    return contact;
  };

  return (
    <div className={cn(
      // Professional card base styling with enterprise-grade design
      'group relative bg-white rounded-xl border border-gray-200 overflow-hidden',
      'transition-all duration-500 ease-out cursor-pointer',
      // Enhanced sophisticated hover effects with elevation and shadow
      'hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] hover:-translate-y-4 hover:border-primary-300',
      'hover:scale-[1.02] active:scale-[0.98] active:transition-transform active:duration-150',
      // Add subtle glow effect on hover with enhanced opacity
      'hover:ring-2 hover:ring-primary-200 hover:ring-opacity-60',
      // Professional focus states for accessibility
      'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
      // Add subtle gradient border on hover
      'hover:bg-gradient-to-br hover:from-white hover:to-primary-50/30',
      className
    )}>
      {/* Professional Image Container with 16:9 Aspect Ratio */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {image ? (
          <Image
            src={image.startsWith('/') ? image : `/${image}`}
            alt={`${name} - School Campus`}
            fill
            className={cn(
              'object-cover transition-all duration-700 ease-out',
              'group-hover:scale-115 group-hover:brightness-110 group-hover:contrast-105'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
        ) : (
          // Professional placeholder with educational theme
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="text-center transform transition-transform duration-300 group-hover:scale-105">
              {/* Professional school building icon */}
              <svg
                className="mx-auto h-16 w-16 text-primary-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <p className="text-sm font-medium text-primary-600">School Campus</p>
              <p className="text-xs text-primary-500 mt-1">Image Coming Soon</p>
            </div>
          </div>
        )}
        
        {/* Sophisticated overlay gradient for enhanced visual depth */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-400'
        )} />
        
        {/* Subtle shimmer effect on hover */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          '-skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%]',
          'transition-transform duration-1000 ease-out'
        )} />
        
        {/* Professional status indicator (optional) */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <svg
              className="w-4 h-4 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Professional Content Section with Optimized Spacing */}
      <div className="p-6 space-y-5">
        {/* School Name with Professional Typography */}
        <div className="space-y-2">
          <h3 className={cn(
            'text-xl font-semibold text-gray-900 leading-tight',
            'group-hover:text-primary-700 transition-colors duration-200',
            'line-clamp-2 min-h-[3.5rem] flex items-start'
          )}>
            {name}
          </h3>
        </div>

        {/* Professional Contact Information Section */}
        <div className="space-y-4">
          {/* Address with Professional Location Icon */}
          <div className="flex items-start space-x-3 group/address">
            <div className="flex-shrink-0 mt-0.5">
              <div className={cn(
                'w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center',
                'group-hover/address:bg-primary-100 transition-colors duration-200'
              )}>
                <svg
                  className={cn(
                    'w-3 h-3 text-gray-500',
                    'group-hover/address:text-primary-600 transition-colors duration-200'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
              {fullAddress}
            </p>
          </div>

          {/* Contact Information with Professional Icons */}
          <div className="space-y-3">
            {/* Phone Number */}
            <div className="flex items-center space-x-3 group/phone">
              <div className="flex-shrink-0">
                <div className={cn(
                  'w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center',
                  'group-hover/phone:bg-green-100 transition-colors duration-200'
                )}>
                  <svg
                    className={cn(
                      'w-3 h-3 text-gray-500',
                      'group-hover/phone:text-green-600 transition-colors duration-200'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
              <a
                href={`tel:${contact}`}
                className={cn(
                  'text-sm font-medium text-gray-700 hover:text-primary-600',
                  'transition-colors duration-200 focus:outline-none focus:text-primary-600'
                )}
                tabIndex={0}
              >
                {formatContact(contact)}
              </a>
            </div>

            {/* Email Address */}
            <div className="flex items-center space-x-3 group/email">
              <div className="flex-shrink-0">
                <div className={cn(
                  'w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center',
                  'group-hover/email:bg-blue-100 transition-colors duration-200'
                )}>
                  <svg
                    className={cn(
                      'w-3 h-3 text-gray-500',
                      'group-hover/email:text-blue-600 transition-colors duration-200'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <a
                href={`mailto:${email_id}`}
                className={cn(
                  'text-sm font-medium text-gray-700 hover:text-primary-600',
                  'transition-colors duration-200 truncate focus:outline-none focus:text-primary-600'
                )}
                tabIndex={0}
              >
                {email_id}
              </a>
            </div>
          </div>
        </div>

        {/* Professional Action Buttons (Optional - can be enabled later) */}
        <div className="pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-3">
            <button className={cn(
              'flex-1 px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50',
              'border border-primary-200 rounded-lg hover:bg-primary-100',
              'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
            )}>
              View Details
            </button>
            <button className={cn(
              'px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50',
              'border border-gray-200 rounded-lg hover:bg-gray-100',
              'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            )}>
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Professional Loading State Overlay (for future use) */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;