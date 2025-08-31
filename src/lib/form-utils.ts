import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn } from 'react-hook-form'
import { schoolSchema, validateSchoolData, type SchoolFormData, type ValidationErrors } from './validations'

// React Hook Form resolver for school schema
export const schoolFormResolver = zodResolver(schoolSchema)

// Helper to get form field error message
export const getFormFieldError = (form: UseFormReturn<SchoolFormData>, fieldName: keyof SchoolFormData): string | undefined => {
  const error = form.formState.errors[fieldName]
  return error?.message as string | undefined
}

// Helper to check if form field has error
export const hasFormFieldError = (form: UseFormReturn<SchoolFormData>, fieldName: keyof SchoolFormData): boolean => {
  return Boolean(form.formState.errors[fieldName])
}

// Helper to get all form errors as a flat object
export const getFormErrors = (form: UseFormReturn<SchoolFormData>): ValidationErrors => {
  const errors: ValidationErrors = {}
  
  Object.keys(form.formState.errors).forEach(key => {
    const fieldKey = key as keyof SchoolFormData
    const error = form.formState.errors[fieldKey]
    if (error?.message) {
      errors[key] = error.message as string
    }
  })
  
  return errors
}

// Helper to clear specific form field error
export const clearFormFieldError = (form: UseFormReturn<SchoolFormData>, fieldName: keyof SchoolFormData): void => {
  form.clearErrors(fieldName)
}

// Helper to clear all form errors
export const clearAllFormErrors = (form: UseFormReturn<SchoolFormData>): void => {
  form.clearErrors()
}

// Helper to set form field error
export const setFormFieldError = (form: UseFormReturn<SchoolFormData>, fieldName: keyof SchoolFormData, message: string): void => {
  form.setError(fieldName, { type: 'manual', message })
}

// Helper to set multiple form errors
export const setFormErrors = (form: UseFormReturn<SchoolFormData>, errors: ValidationErrors): void => {
  Object.keys(errors).forEach(fieldName => {
    const key = fieldName as keyof SchoolFormData
    form.setError(key, { type: 'manual', message: errors[fieldName] })
  })
}

// Helper to validate form data manually (useful for custom validation)
export const validateFormData = (data: unknown) => {
  return validateSchoolData(data)
}

// Helper to reset form with default values
export const resetFormWithDefaults = (form: UseFormReturn<SchoolFormData>, defaultValues?: Partial<SchoolFormData>): void => {
  form.reset({
    name: '',
    address: '',
    city: '',
    state: '',
    contact: '',
    email_id: '',
    image: undefined,
    ...defaultValues
  })
}

// Helper to check if form is valid
export const isFormValid = (form: UseFormReturn<SchoolFormData>): boolean => {
  return form.formState.isValid && Object.keys(form.formState.errors).length === 0
}

// Helper to check if form has been modified
export const isFormDirty = (form: UseFormReturn<SchoolFormData>): boolean => {
  return form.formState.isDirty
}

// Helper to get form submission state
export const getFormSubmissionState = (form: UseFormReturn<SchoolFormData>) => {
  return {
    isSubmitting: form.formState.isSubmitting,
    isSubmitted: form.formState.isSubmitted,
    isSubmitSuccessful: form.formState.isSubmitSuccessful,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty
  }
}

// Type exports for form utilities
export type FormSubmissionState = ReturnType<typeof getFormSubmissionState>