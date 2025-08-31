'use client';

import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { LoadingOverlay } from '@/components/ui/LoadingSpinner';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useLoadingState } from '@/hooks/useLoadingState';
import { schoolFormResolver, resetFormWithDefaults } from '@/lib/form-utils';
import { validateFileUpload, type SchoolFormData } from '@/lib/validations';
import { cn } from '@/lib/utils';

interface SchoolFormProps {
  onSubmit?: (data: SchoolFormData) => Promise<{ success: boolean; message?: string; data?: unknown }>;
  className?: string;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({ onSubmit, className }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  
  const { showSuccess, showError, showInfo } = useToast();
  const { handleError } = useErrorHandler();
  const loadingState = useLoadingState({
    timeout: 30000, // 30 second timeout
    onTimeout: () => {
      showError('Request Timeout', 'The request is taking too long. Please try again.');
    }
  });

  const form = useForm<SchoolFormData>({
    resolver: schoolFormResolver,
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      contact: '',
      email_id: '',
      image: undefined,
    },
    mode: 'onChange',
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, clearErrors } = form;

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    const validation = validateFileUpload(file);
    
    if (!validation.success) {
      const errorMessage = validation.errors ? Object.values(validation.errors)[0] : 'Invalid file';
      form.setError('image', { type: 'manual', message: errorMessage });
      return;
    }

    // Clear any previous errors
    clearErrors('image');
    
    // Set the file
    setImageFile(file);
    setValue('image', file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [setValue, clearErrors, form]);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // Remove image
  const removeImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setValue('image', undefined);
    clearErrors('image');
    setUploadProgress(0);
  }, [setValue, clearErrors]);

  // Handle form reset
  const handleFormReset = useCallback(() => {
    resetFormWithDefaults(form);
    removeImage();
    setUploadProgress(0);
    setIsSubmissionSuccessful(false);
    showInfo('Form Reset', 'All fields have been cleared.');
  }, [form, removeImage, showInfo]);

  // Handle form submission
  const handleFormSubmit = async (data: SchoolFormData) => {
    const result = await loadingState.executeAsync(async () => {
      setUploadProgress(0);
      setIsSubmissionSuccessful(false);
      
      if (onSubmit) {
        // Simulate upload progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 10;
          });
        }, 100);

        try {
          const result = await onSubmit(data);
          
          clearInterval(progressInterval);
          setUploadProgress(100);
          
          if (result.success) {
            setIsSubmissionSuccessful(true);
            showSuccess(
              'School Added Successfully!',
              `${data.name} has been added to the directory.`
            );
            
            // Reset form after successful submission
            setTimeout(() => {
              resetFormWithDefaults(form);
              removeImage();
              setUploadProgress(0);
              setIsSubmissionSuccessful(false);
            }, 2000);
            
            return result;
          } else {
            throw new Error(result.message || 'Failed to add school');
          }
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      } else {
        // Default behavior when no onSubmit handler is provided
        showSuccess(
          'Form Validated Successfully!',
          'All fields are valid. Ready for submission.'
        );
        
        // Reset form after a delay
        setTimeout(() => {
          resetFormWithDefaults(form);
          removeImage();
        }, 2000);
        
        return { success: true };
      }
    }, (error) => {
      setUploadProgress(0);
      setIsSubmissionSuccessful(false);
      
      // Use error handler for consistent error handling
      const handledError = handleError(error, { showToast: false });
      return handledError.message;
    });

    // Show error toast if submission failed
    if (!result) {
      showError(
        'Failed to Add School',
        loadingState.error || 'An unexpected error occurred'
      );
    }
  };

  return (
    <LoadingOverlay 
      isLoading={loadingState.loading} 
      message="Adding school to directory..."
      className={cn('max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border', className)}
    >
      {/* Enhanced Form Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-6">
          <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h2 className="text-display-small text-gray-900 mb-4">Add New School</h2>
        <p className="text-body-large text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Fill in the details below to add a new educational institution to our comprehensive directory. 
          All required fields are marked with an asterisk (*).
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">
        {/* Enhanced Form Sections with Animations */}
        
        {/* Basic Information Section */}
        <div className="space-y-8 animate-fade-in-scale" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <div className="border-l-4 border-primary-500 pl-6 animate-slide-in-left">
            <h3 className="text-headline-medium text-gray-900 mb-2">Basic Information</h3>
            <p className="text-body-small text-gray-600">Essential details about the educational institution</p>
          </div>
          
          <div className="space-y-6">
            <Input
              {...register('name')}
              label="School Name"
              placeholder="Enter the full name of the educational institution"
              error={errors.name?.message}
              success={!errors.name && (form.watch('name')?.length || 0) > 2}
              helperText="This will be displayed as the primary school identifier"
              required
            />

            <Input
              {...register('address')}
              label="Complete Address"
              placeholder="Enter the full street address including building number"
              error={errors.address?.message}
              success={!errors.address && (form.watch('address')?.length || 0) > 10}
              helperText="Include street number, street name, and any apartment/suite details"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                {...register('city')}
                label="City"
                placeholder="Enter city name"
                error={errors.city?.message}
                success={!errors.city && (form.watch('city')?.length || 0) > 1}
                required
              />
              <Input
                {...register('state')}
                label="State/Province"
                placeholder="Enter state or province"
                error={errors.state?.message}
                success={!errors.state && (form.watch('state')?.length || 0) > 1}
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-8 animate-fade-in-scale" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <div className="border-l-4 border-blue-500 pl-6 animate-slide-in-left">
            <h3 className="text-headline-medium text-gray-900 mb-2">Contact Information</h3>
            <p className="text-body-small text-gray-600">How people can reach the school</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              {...register('contact')}
              type="tel"
              label="Contact Number"
              placeholder="+1 (555) 123-4567"
              error={errors.contact?.message}
              success={!errors.contact && (form.watch('contact')?.length || 0) > 9}
              helperText="Include country code for international numbers"
              required
            />
            <Input
              {...register('email_id')}
              type="email"
              label="Email Address"
              placeholder="contact@school.edu"
              error={errors.email_id?.message}
              success={!errors.email_id && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.watch('email_id') || '')}
              helperText="Primary contact email for the institution"
              required
            />
          </div>
        </div>

        {/* Visual Identity Section */}
        <div className="space-y-8 animate-fade-in-scale" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <div className="border-l-4 border-purple-500 pl-6 animate-slide-in-left">
            <h3 className="text-headline-medium text-gray-900 mb-2">Visual Identity</h3>
            <p className="text-body-small text-gray-600">Upload an image to represent the school</p>
          </div>

        {/* Enhanced Image Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold leading-6 text-gray-700">
              School Image
              <span className="text-gray-500 ml-2 font-normal">(Optional)</span>
            </label>
            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove Image
              </button>
            )}
          </div>
          
          <p className="text-sm text-gray-600 leading-relaxed">
            Upload a high-quality image that represents your school. Supported formats include JPG, PNG, and WebP with a maximum size of 5MB.
          </p>
          
          {/* Enhanced Upload Area */}
          <div
            className={cn(
              'relative border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out group',
              'hover:shadow-lg hover:shadow-primary-100',
              isDragOver ? [
                'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100',
                'scale-[1.02] shadow-lg shadow-primary-200'
              ] : [
                'border-gray-300 hover:border-primary-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-primary-50'
              ],
              errors.image ? [
                'border-red-400 bg-gradient-to-br from-red-50 to-red-100',
                'shadow-lg shadow-red-200'
              ] : '',
              imagePreview ? 'p-6' : 'p-8'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              /* Enhanced Image Preview */
              <div className="space-y-4">
                <div className="relative group">
                  <Image
                    src={imagePreview}
                    alt="School preview"
                    width={400}
                    height={240}
                    className="w-full h-60 object-cover rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl"
                  />
                  
                  {/* Professional overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label="Remove image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Success indicator */}
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Image Ready
                  </div>
                </div>
                
                {/* Enhanced Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-3 p-4 bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-blue-700 font-medium">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Uploading image...
                      </div>
                      <span className="text-blue-600 font-semibold">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Enhanced File Information */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 truncate max-w-48">
                          {imageFile?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {((imageFile?.size || 0) / 1024 / 1024).toFixed(2)} MB • {imageFile?.type?.split('/')[1]?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-green-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Enhanced Upload Prompt */
              <div className="text-center py-4">
                {/* Animated Upload Icon */}
                <div className="relative mx-auto w-16 h-16 mb-6">
                  <div className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300",
                    isDragOver ? "bg-primary-200 scale-110" : "bg-gray-100 group-hover:bg-primary-100"
                  )}>
                  </div>
                  <svg
                    className={cn(
                      "absolute inset-0 w-16 h-16 transition-all duration-300",
                      isDragOver ? "text-primary-600 scale-110" : "text-gray-400 group-hover:text-primary-500"
                    )}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="space-y-4">
                  <label htmlFor="image-upload" className="cursor-pointer group block">
                    <span className={cn(
                      "block text-lg font-semibold mb-2 transition-colors duration-200",
                      isDragOver ? "text-primary-700" : "text-gray-900 group-hover:text-primary-600"
                    )}>
                      {isDragOver ? 'Drop your image here' : 'Drop an image here, or '}
                      {!isDragOver && (
                        <span className="text-primary-600 group-hover:text-primary-700 underline decoration-2 underline-offset-2">
                          browse files
                        </span>
                      )}
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileInputChange}
                    />
                  </label>
                  
                  {/* Enhanced Format Information */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        JPG, PNG, WebP
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Max 5MB
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      High-resolution images (1200x800px or larger) provide the best results for school showcases
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Error Message */}
          {errors.image && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-in" role="alert">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-red-800 mb-1">Image Upload Error</h4>
                  <p className="text-sm text-red-700">{errors.image.message as string}</p>
                  <p className="text-xs text-red-600 mt-1">Please select a valid image file and try again.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Form Status Indicator with Advanced Animations */}
        {isSubmissionSuccessful && (
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-lg animate-zoom-in">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-heartbeat shadow-lg">
                  <svg className="w-7 h-7 text-white animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-1 animate-slide-in-right">Success!</h3>
                <p className="text-sm text-green-700 animate-slide-in-right" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>School has been added to the directory successfully.</p>
                <p className="text-xs text-green-600 mt-1 animate-slide-in-right" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>Redirecting to schools page...</p>
              </div>
            </div>
          </div>
        )}

        </div>

        {/* Enhanced Submit Section */}
        <div className="pt-10 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600 mb-1">
                Ready to add this school to the directory?
              </p>
              <p className="text-xs text-gray-500">
                All information will be reviewed before publication
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={handleFormReset}
                disabled={isSubmitting || loadingState.loading}
                className="px-8 w-full sm:w-auto order-2 sm:order-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Form
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting || loadingState.loading}
                disabled={isSubmitting || loadingState.loading || isSubmissionSuccessful}
                className="px-10 w-full sm:w-auto order-1 sm:order-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting || loadingState.loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding School...
                  </>
                ) : isSubmissionSuccessful ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    School Added!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add School
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </LoadingOverlay>
  );
};

export default SchoolForm;