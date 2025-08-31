import { schoolFormResolver, validateFormData } from '../form-utils'
import { schoolSchema } from '../validations'

describe('Form Utilities', () => {
  describe('schoolFormResolver', () => {
    test('should be a valid resolver function', () => {
      expect(typeof schoolFormResolver).toBe('function')
    })
  })

  describe('validateFormData', () => {
    const validSchoolData = {
      name: 'Test School',
      address: '123 Main Street',
      city: 'Test City',
      state: 'Test State',
      contact: '(555) 123-4567',
      email_id: 'test@school.edu'
    }

    test('should validate correct form data', () => {
      const result = validateFormData(validSchoolData)
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    test('should reject invalid form data', () => {
      const invalidData = { ...validSchoolData, email_id: 'invalid-email' }
      const result = validateFormData(invalidData)
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
    })

    test('should handle missing required fields', () => {
      const incompleteData = { name: 'Test School' }
      const result = validateFormData(incompleteData)
      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
    })
  })
})