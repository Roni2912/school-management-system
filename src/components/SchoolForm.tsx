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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New School</h2>
        <p className="text-gray-600">Fill in the details below to add a new school to the directory.</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* School Name */}
        <Input
          {...register('name')}
          label="School Name"
          placeholder="Enter school name"
          error={errors.name?.message}
          required
        />

        {/* Address */}
        <Input
          {...register('address')}
          label="Address"
          placeholder="Enter complete address"
          error={errors.address?.message}
          required
        />

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register('city')}
            label="City"
            placeholder="Enter city"
            error={errors.city?.message}
            required
          />
          <Input
            {...register('state')}
            label="State"
            placeholder="Enter state"
            error={errors.state?.message}
            required
          />
        </div>

        {/* Contact and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            {...register('contact')}
            type="tel"
            label="Contact Number"
            placeholder="+1 (234) 567-8900"
            error={errors.contact?.message}
            required
          />
          <Input
            {...register('email_id')}
            type="email"
            label="Email Address"
            placeholder="school@example.com"
            error={errors.email_id?.message}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-700">
            School Image
            <span className="text-gray-500 ml-1">(Optional)</span>
          </label>
          
          {/* Upload Area */}
          <div
            className={cn(
              'relative border-2 border-dashed rounded-lg p-6 transition-colors',
              isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
              errors.image ? 'border-red-500 bg-red-50' : ''
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              /* Image Preview */
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="School preview"
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-600 text-center">
                  {imageFile?.name} ({((imageFile?.size || 0) / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            ) : (
              /* Upload Prompt */
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Drop an image here, or{' '}
                      <span className="text-blue-600 hover:text-blue-500">browse</span>
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileInputChange}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Error Message */}
          {errors.image && (
            <p className="text-sm text-red-600" role="alert">
              {errors.image.message as string}
            </p>
          )}
        </div>

        {/* Form Status Indicator */}
        {isSubmissionSuccessful && (
          <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-800">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">School added successfully!</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={handleFormReset}
            disabled={isSubmitting}
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            loading={isSubmitting || loadingState.loading}
            disabled={isSubmitting || loadingState.loading || isSubmissionSuccessful}
          >
            {isSubmitting || loadingState.loading ? 'Adding School...' : isSubmissionSuccessful ? 'School Added!' : 'Add School'}
          </Button>
        </div>
      </form>
    </LoadingOverlay>
  );
};

export default SchoolForm;