'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';

export default function TestInputsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    floatingName: '',
    floatingEmail: '',
    floatingDescription: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Please provide a complete address';
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      floatingName: '',
      floatingEmail: '',
      floatingDescription: ''
    });
    setErrors({});
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Input Components</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase of redesigned form input components with professional styling, 
            floating labels, and sophisticated validation states.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-800">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">Form submitted successfully!</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Standard Inputs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Standard Input Fields</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={errors.name}
                required
                helperText="This will be displayed on your profile"
              />

              <Input
                type="email"
                label="Email Address"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                success={!!(formData.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}
                required
              />

              <Input
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={errors.phone}
                required
              />

              <TextArea
                label="Address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleInputChange('address')}
                error={errors.address}
                required
                rows={2}
                autoResize
                maxHeight={120}
              />

              <TextArea
                label="Description"
                placeholder="Tell us about yourself (optional)"
                value={formData.description}
                onChange={handleInputChange('description')}
                error={errors.description}
                helperText={`${formData.description.length}/500 characters`}
                rows={3}
                autoResize
                maxHeight={180}
              />

              <div className="flex space-x-4 pt-4">
                <Button type="submit" variant="primary" size="md">
                  Submit Form
                </Button>
                <Button type="button" variant="ghost" size="md" onClick={resetForm}>
                  Reset
                </Button>
              </div>
            </form>
          </div>

          {/* Floating Label Inputs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Floating Label Fields</h2>
            
            <div className="space-y-6">
              <Input
                label="Full Name"
                floatingLabel
                value={formData.floatingName}
                onChange={handleInputChange('floatingName')}
                required
              />

              <Input
                type="email"
                label="Email Address"
                floatingLabel
                value={formData.floatingEmail}
                onChange={handleInputChange('floatingEmail')}
                success={!!(formData.floatingEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.floatingEmail))}
                required
              />

              <TextArea
                label="Message"
                value={formData.floatingDescription}
                onChange={handleInputChange('floatingDescription')}
                rows={4}
                autoResize
                maxHeight={240}
              />

              {/* Input States Demo */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Input States</h3>
                
                <Input
                  label="Success State"
                  value="Valid input"
                  success
                  helperText="This field is valid"
                  readOnly
                />

                <Input
                  label="Error State"
                  value="Invalid input"
                  error="This field has an error"
                  readOnly
                />

                <Input
                  label="Warning State"
                  value="Warning input"
                  variant="warning"
                  helperText="This field has a warning"
                  readOnly
                />

                <Input
                  label="Disabled State"
                  value="Disabled input"
                  disabled
                  helperText="This field is disabled"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Component Features */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Component Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Professional Styling</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Clean, modern design</li>
                <li>• Professional color palette</li>
                <li>• Consistent spacing and typography</li>
                <li>• Sophisticated hover effects</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Enhanced UX</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Floating label animations</li>
                <li>• Smooth color transitions</li>
                <li>• Auto-resize textareas</li>
                <li>• Clear validation feedback</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• WCAG 2.1 AA compliant</li>
                <li>• Proper ARIA attributes</li>
                <li>• Keyboard navigation support</li>
                <li>• Screen reader friendly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}