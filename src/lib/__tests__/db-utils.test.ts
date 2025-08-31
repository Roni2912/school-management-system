/**
 * Database utilities test suite
 * These tests verify database operations work correctly
 * Note: These tests require a running MySQL server
 */

import {
  createSchool,
  getSchoolById,
  getAllSchools,
  updateSchool,
  deleteSchool,
  getSchoolsByCity,
  getSchoolsByState,
  DatabaseError,
  CreateSchoolData
} from '../db-utils'

// Mock data for testing
const mockSchoolData: CreateSchoolData = {
  name: 'Test Elementary School',
  address: '123 Test Street',
  city: 'Test City',
  state: 'Test State',
  contact: '+1-555-0123',
  email_id: 'test@testschool.edu',
  image: '/images/test-school.jpg'
}

describe('Database Utils', () => {
  let createdSchoolId: number

  beforeAll(async () => {
    // Ensure database is initialized before running tests
    const { ensureDatabaseInitialized } = await import('../db-init')
    await ensureDatabaseInitialized()
  })

  describe('createSchool', () => {
    it('should create a new school successfully', async () => {
      const school = await createSchool(mockSchoolData)
      
      expect(school).toBeDefined()
      expect(school.id).toBeDefined()
      expect(school.name).toBe(mockSchoolData.name)
      expect(school.address).toBe(mockSchoolData.address)
      expect(school.city).toBe(mockSchoolData.city)
      expect(school.state).toBe(mockSchoolData.state)
      expect(school.contact).toBe(mockSchoolData.contact)
      expect(school.email_id).toBe(mockSchoolData.email_id)
      expect(school.image).toBe(mockSchoolData.image)
      expect(school.created_at).toBeDefined()
      expect(school.updated_at).toBeDefined()
      
      createdSchoolId = school.id
    })

    it('should throw DatabaseError for invalid data', async () => {
      const invalidData = { ...mockSchoolData, name: '' }
      
      await expect(createSchool(invalidData)).rejects.toThrow(DatabaseError)
    })
  })

  describe('getSchoolById', () => {
    it('should retrieve a school by ID', async () => {
      const school = await getSchoolById(createdSchoolId)
      
      expect(school).toBeDefined()
      expect(school.id).toBe(createdSchoolId)
      expect(school.name).toBe(mockSchoolData.name)
    })

    it('should throw DatabaseError for non-existent ID', async () => {
      await expect(getSchoolById(99999)).rejects.toThrow(DatabaseError)
    })
  })

  describe('getAllSchools', () => {
    it('should retrieve all schools', async () => {
      const schools = await getAllSchools()
      
      expect(Array.isArray(schools)).toBe(true)
      expect(schools.length).toBeGreaterThan(0)
      
      const createdSchool = schools.find(s => s.id === createdSchoolId)
      expect(createdSchool).toBeDefined()
    })
  })

  describe('updateSchool', () => {
    it('should update a school successfully', async () => {
      const updateData = { name: 'Updated Test School' }
      const updatedSchool = await updateSchool(createdSchoolId, updateData)
      
      expect(updatedSchool.name).toBe(updateData.name)
      expect(updatedSchool.id).toBe(createdSchoolId)
    })

    it('should throw DatabaseError for non-existent ID', async () => {
      await expect(updateSchool(99999, { name: 'Test' })).rejects.toThrow(DatabaseError)
    })
  })

  describe('getSchoolsByCity', () => {
    it('should retrieve schools by city', async () => {
      const schools = await getSchoolsByCity(mockSchoolData.city)
      
      expect(Array.isArray(schools)).toBe(true)
      expect(schools.every(s => s.city === mockSchoolData.city)).toBe(true)
    })
  })

  describe('getSchoolsByState', () => {
    it('should retrieve schools by state', async () => {
      const schools = await getSchoolsByState(mockSchoolData.state)
      
      expect(Array.isArray(schools)).toBe(true)
      expect(schools.every(s => s.state === mockSchoolData.state)).toBe(true)
    })
  })

  describe('deleteSchool', () => {
    it('should delete a school successfully', async () => {
      const result = await deleteSchool(createdSchoolId)
      expect(result).toBe(true)
      
      // Verify school is deleted
      await expect(getSchoolById(createdSchoolId)).rejects.toThrow(DatabaseError)
    })

    it('should return false for non-existent ID', async () => {
      const result = await deleteSchool(99999)
      expect(result).toBe(false)
    })
  })
})

describe('DatabaseError', () => {
  it('should create a DatabaseError with message', () => {
    const error = new DatabaseError('Test error')
    
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(DatabaseError)
    expect(error.name).toBe('DatabaseError')
    expect(error.message).toBe('Test error')
  })

  it('should create a DatabaseError with original error', () => {
    const originalError = new Error('Original error')
    const error = new DatabaseError('Test error', originalError)
    
    expect(error.originalError).toBe(originalError)
  })
})