import { z } from 'zod'

export const schoolSchema = z.object({
  name: z.string()
    .min(2, 'School name must be at least 2 characters')
    .max(255, 'School name must not exceed 255 characters'),
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must not exceed 500 characters'),
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters'),
  state: z.string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must not exceed 100 characters'),
  contact: z.string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  email_id: z.string()
    .email('Please enter a valid email address'),
  image: z.any().optional()
})

export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WebP images are allowed'
    )
})

export type SchoolFormData = z.infer<typeof schoolSchema>
export type FileUploadData = z.infer<typeof fileUploadSchema>