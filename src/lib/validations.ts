import { z } from 'zod'

// Phone number validation helper
export const phoneNumberRegex = /^(\+1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/
export const internationalPhoneRegex = /^\+?[\d\s\-\(\)]{7,20}$/

// Email validation helper (more comprehensive than default)
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// File validation constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

// Custom validation helpers
export const validatePhoneNumber = (phone: string): boolean => {
  return internationalPhoneRegex.test(phone.trim())
}

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email.trim().toLowerCase())
}

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size must be less than 5MB' }
  }
  
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { isValid: false, error: 'Only JPEG, PNG, and WebP images are allowed' }
  }
  
  return { isValid: true }
}

// Enhanced school validation schema
export const schoolSchema = z.object({
  name: z.string()
    .min(2, 'School name must be at least 2 characters')
    .max(255, 'School name must not exceed 255 characters')
    .trim()
    .refine((name) => name.length > 0, 'School name is required'),
  
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must not exceed 500 characters')
    .trim()
    .refine((address) => address.length > 0, 'Address is required'),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters')
    .trim()
    .refine((city) => city.length > 0, 'City is required'),
  
  state: z.string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must not exceed 100 characters')
    .trim()
    .refine((state) => state.length > 0, 'State is required'),
  
  contact: z.string()
    .trim()
    .refine((phone) => phone.length > 0, 'Contact number is required')
    .refine(validatePhoneNumber, 'Please enter a valid phone number (e.g., +1-234-567-8900 or (234) 567-8900)'),
  
  email_id: z.string()
    .trim()
    .toLowerCase()
    .refine((email) => email.length > 0, 'Email is required')
    .refine(validateEmail, 'Please enter a valid email address'),
  
  image: z.any().optional()
})

// File upload validation schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File size must be less than 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPEG, PNG, and WebP images are allowed'
    )
    .refine((file) => file.name.length > 0, 'File name is required')
})

// Client-side file validation (for browser File objects)
export const clientFileSchema = z.instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, 'File size must be less than 5MB')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only JPEG, PNG, and WebP images are allowed'
  )

// Server-side validation schema (for API routes)
export const serverSchoolSchema = schoolSchema.extend({
  image: z.string().optional() // On server, image is a file path string
})

// Form validation utilities
export const formatValidationErrors = (errors: z.ZodError) => {
  const formattedErrors: Record<string, string> = {}
  
  if (errors && errors.issues) {
    errors.issues.forEach((error) => {
      const path = error.path.join('.')
      formattedErrors[path] = error.message
    })
  }
  
  return formattedErrors
}

export const getFieldError = (errors: Record<string, string>, fieldName: string): string | undefined => {
  return errors[fieldName]
}

export const hasFieldError = (errors: Record<string, string>, fieldName: string): boolean => {
  return Boolean(errors[fieldName])
}

// Validation result types
export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: Record<string, string>
}

// Generic validation function
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> => {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return {
      success: true,
      data: result.data
    }
  } else {
    return {
      success: false,
      errors: formatValidationErrors(result.error)
    }
  }
}

// Specific validation functions
export const validateSchoolData = (data: unknown): ValidationResult<z.infer<typeof schoolSchema>> => {
  return validateData(schoolSchema, data)
}

export const validateFileUpload = (file: File): ValidationResult<File> => {
  return validateData(clientFileSchema, file)
}

// Error message formatting utilities
export const formatErrorMessage = (error: string): string => {
  return error.charAt(0).toUpperCase() + error.slice(1)
}

export const getErrorMessages = (errors: Record<string, string>): string[] => {
  return Object.values(errors).map(formatErrorMessage)
}

export const hasAnyErrors = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length > 0
}

// Type exports
export type SchoolFormData = z.infer<typeof schoolSchema>
export type ServerSchoolData = z.infer<typeof serverSchoolSchema>
export type FileUploadData = z.infer<typeof fileUploadSchema>
export type ValidationErrors = Record<string, string>