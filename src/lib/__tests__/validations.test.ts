import {
  schoolSchema,
  fileUploadSchema,
  clientFileSchema,
  serverSchoolSchema,
  validatePhoneNumber,
  validateEmail,
  validateImageFile,
  formatValidationErrors,
  getFieldError,
  hasFieldError,
  validateData,
  validateSchoolData,
  validateFileUpload,
  formatErrorMessage,
  getErrorMessages,
  hasAnyErrors,
  phoneNumberRegex,
  internationalPhoneRegex,
  emailRegex,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES
} from '../validations'
import { z } from 'zod'

describe('Validation Schemas and Utilities', () => {
  describe('Phone Number Validation', () => {
    test('should validate US phone numbers', () => {
      expect(validatePhoneNumber('(555) 123-4567')).toBe(true)
      expect(validatePhoneNumber('555-123-4567')).toBe(true)
      expect(validatePhoneNumber('555 123 4567')).toBe(true)
      expect(validatePhoneNumber('5551234567')).toBe(true)
      expect(validatePhoneNumber('+1-555-123-4567')).toBe(true)
    })

    test('should validate international phone numbers', () => {
      expect(validatePhoneNumber('+44 20 7946 0958')).toBe(true)
      expect(validatePhoneNumber('+91 98765 43210')).toBe(true)
      expect(validatePhoneNumber('+33 1 42 86 83 26')).toBe(true)
    })

    test('should reject invalid phone numbers', () => {
      expect(validatePhoneNumber('123')).toBe(false)
      expect(validatePhoneNumber('abc-def-ghij')).toBe(false)
      expect(validatePhoneNumber('')).toBe(false)
      expect(validatePhoneNumber('123-45')).toBe(false)
    })
  })

  describe('Email Validation', () => {
    test('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('admin+tag@company.org')).toBe(true)
      expect(validateEmail('123@numbers.net')).toBe(true)
    })

    test('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('user@domain')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('File Validation', () => {
    const createMockFile = (name: string, size: number, type: string): File => {
      const file = new File([''], name, { type })
      Object.defineProperty(file, 'size', { value: size })
      return file
    }

    test('should validate correct image files', () => {
      const validFile = createMockFile('test.jpg', 1024 * 1024, 'image/jpeg')
      const result = validateImageFile(validFile)
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    test('should reject files that are too large', () => {
      const largeFile = createMockFile('large.jpg', MAX_FILE_SIZE + 1, 'image/jpeg')
      const result = validateImageFile(largeFile)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('File size must be less than 5MB')
    })

    test('should reject unsupported file types', () => {
      const invalidFile = createMockFile('document.pdf', 1024, 'application/pdf')
      const result = validateImageFile(invalidFile)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Only JPEG, PNG, and WebP images are allowed')
    })
  })

  describe('School Schema Validation', () => {
    const validSchoolData = {
      name: 'Test School',
      address: '123 Main Street',
      city: 'Test City',
      state: 'Test State',
      contact: '(555) 123-4567',
      email_id: 'test@school.edu'
    }

    test('should validate correct school data', () => {
      const result = schoolSchema.safeParse(validSchoolData)
      expect(result.success).toBe(true)
    })

    test('should reject school data with missing required fields', () => {
      const invalidData = { ...validSchoolData }
      delete invalidData.name
      
      const result = schoolSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    test('should reject school data with invalid email', () => {
      const invalidData = { ...validSchoolData, email_id: 'invalid-email' }
      const result = schoolSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    test('should reject school data with invalid phone', () => {
      const invalidData = { ...validSchoolData, contact: '123' }
      const result = schoolSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    test('should trim whitespace from string fields', () => {
      const dataWithWhitespace = {
        ...validSchoolData,
        name: '  Test School  ',
        email_id: '  test@school.edu  '
      }
      
      const result = schoolSchema.safeParse(dataWithWhitespace)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('Test School')
        expect(result.data.email_id).toBe('test@school.edu')
      }
    })
  })

  describe('File Upload Schema', () => {
    const createMockFile = (name: string, size: number, type: string): File => {
      const file = new File([''], name, { type })
      Object.defineProperty(file, 'size', { value: size })
      return file
    }

    test('should validate correct file upload', () => {
      const validFile = createMockFile('test.jpg', 1024 * 1024, 'image/jpeg')
      const result = fileUploadSchema.safeParse({ file: validFile })
      expect(result.success).toBe(true)
    })

    test('should reject invalid file upload', () => {
      const invalidFile = createMockFile('test.pdf', 1024, 'application/pdf')
      const result = fileUploadSchema.safeParse({ file: invalidFile })
      expect(result.success).toBe(false)
    })
  })

  describe('Validation Utilities', () => {
    test('should format validation errors correctly', () => {
      // Create a schema that will fail validation
      const testSchema = z.object({
        name: z.string().min(5, 'Name is too short'),
        email_id: z.string().email('Invalid email')
      })
      
      const result = testSchema.safeParse({
        name: 'Hi',
        email_id: 'not-an-email'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        const formatted = formatValidationErrors(result.error)
        expect(formatted).toHaveProperty('name', 'Name is too short')
        expect(formatted).toHaveProperty('email_id', 'Invalid email')
      }
    })

    test('should get field errors correctly', () => {
      const errors = { name: 'Name is required', email_id: 'Invalid email' }
      
      expect(getFieldError(errors, 'name')).toBe('Name is required')
      expect(getFieldError(errors, 'nonexistent')).toBeUndefined()
    })

    test('should check if field has error', () => {
      const errors = { name: 'Name is required' }
      
      expect(hasFieldError(errors, 'name')).toBe(true)
      expect(hasFieldError(errors, 'email_id')).toBe(false)
    })

    test('should validate data generically', () => {
      const schema = z.object({ name: z.string().min(2) })
      
      const validResult = validateData(schema, { name: 'Test' })
      expect(validResult.success).toBe(true)
      expect(validResult.data).toEqual({ name: 'Test' })
      
      const invalidResult = validateData(schema, { name: 'T' })
      expect(invalidResult.success).toBe(false)
      expect(invalidResult.errors).toBeDefined()
    })

    test('should validate school data specifically', () => {
      const validData = {
        name: 'Test School',
        address: '123 Main Street',
        city: 'Test City',
        state: 'Test State',
        contact: '(555) 123-4567',
        email_id: 'test@school.edu'
      }
      
      const result = validateSchoolData(validData)
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    test('should validate file upload specifically', () => {
      const validFile = new File([''], 'test.jpg', { type: 'image/jpeg' })
      Object.defineProperty(validFile, 'size', { value: 1024 })
      
      const result = validateFileUpload(validFile)
      expect(result.success).toBe(true)
    })

    test('should format error messages', () => {
      expect(formatErrorMessage('name is required')).toBe('Name is required')
      expect(formatErrorMessage('INVALID EMAIL')).toBe('INVALID EMAIL')
    })

    test('should get all error messages', () => {
      const errors = { name: 'name is required', email: 'invalid email' }
      const messages = getErrorMessages(errors)
      
      expect(messages).toEqual(['Name is required', 'Invalid email'])
    })

    test('should check if any errors exist', () => {
      expect(hasAnyErrors({})).toBe(false)
      expect(hasAnyErrors({ name: 'Error' })).toBe(true)
    })
  })

  describe('Constants', () => {
    test('should have correct file size limit', () => {
      expect(MAX_FILE_SIZE).toBe(5 * 1024 * 1024)
    })

    test('should have correct accepted image types', () => {
      expect(ACCEPTED_IMAGE_TYPES).toEqual([
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/webp'
      ])
    })

    test('should have valid regex patterns', () => {
      expect(phoneNumberRegex).toBeInstanceOf(RegExp)
      expect(internationalPhoneRegex).toBeInstanceOf(RegExp)
      expect(emailRegex).toBeInstanceOf(RegExp)
    })
  })
})