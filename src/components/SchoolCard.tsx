'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
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
    <Card className={cn(
      'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
      'bg-white border border-gray-200 overflow-hidden',
      className
    )}>
      {/* School Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        {image ? (
          <Image
            src={image.startsWith('/') ? image : `/${image}`}
            alt={`${name} - School Image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          // Placeholder when no image is available
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <p className="mt-2 text-sm text-gray-500 font-medium">School Image</p>
            </div>
          </div>
        )}
        
        {/* Overlay gradient for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* School Information */}
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* School Name */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {name}
            </h3>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {fullAddress}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <svg
                className="w-4 h-4 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href={`tel:${contact}`}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {formatContact(contact)}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <svg
                className="w-4 h-4 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href={`mailto:${email_id}`}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 truncate"
              >
                {email_id}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;