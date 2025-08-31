import pool, { executeQuery } from './db'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

export interface School {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image?: string
  created_at: Date
  updated_at: Date
}

export interface CreateSchoolData {
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image?: string
}

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export async function createSchool(schoolData: CreateSchoolData): Promise<School> {
  const query = `
    INSERT INTO schools (name, address, city, state, contact, email_id, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  
  const params = [
    schoolData.name,
    schoolData.address,
    schoolData.city,
    schoolData.state,
    schoolData.contact,
    schoolData.email_id,
    schoolData.image || null
  ]

  try {
    const result = await executeQuery<ResultSetHeader>(query, params)
    
    if (result.insertId) {
      return await getSchoolById(result.insertId)
    } else {
      throw new DatabaseError('Failed to create school: No insert ID returned')
    }
  } catch (error) {
    throw new DatabaseError(
      'Failed to create school',
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function getSchoolById(id: number): Promise<School> {
  const query = 'SELECT * FROM schools WHERE id = ?'
  
  try {
    const results = await executeQuery<RowDataPacket[]>(query, [id])
    
    if (results.length === 0) {
      throw new DatabaseError(`School with ID ${id} not found`)
    }
    
    return results[0] as School
  } catch (error) {
    throw new DatabaseError(
      `Failed to get school by ID ${id}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function getAllSchools(): Promise<School[]> {
  const query = 'SELECT * FROM schools ORDER BY created_at DESC'
  
  try {
    const results = await executeQuery<RowDataPacket[]>(query)
    return results as School[]
  } catch (error) {
    throw new DatabaseError(
      'Failed to get all schools',
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function updateSchool(id: number, schoolData: Partial<CreateSchoolData>): Promise<School> {
  const fields = Object.keys(schoolData).filter(key => schoolData[key as keyof CreateSchoolData] !== undefined)
  
  if (fields.length === 0) {
    throw new DatabaseError('No fields to update')
  }
  
  const setClause = fields.map(field => `${field} = ?`).join(', ')
  const query = `UPDATE schools SET ${setClause} WHERE id = ?`
  const params = [...fields.map(field => schoolData[field as keyof CreateSchoolData]), id]
  
  try {
    const result = await executeQuery<ResultSetHeader>(query, params)
    
    if (result.affectedRows === 0) {
      throw new DatabaseError(`School with ID ${id} not found`)
    }
    
    return await getSchoolById(id)
  } catch (error) {
    throw new DatabaseError(
      `Failed to update school with ID ${id}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function deleteSchool(id: number): Promise<boolean> {
  const query = 'DELETE FROM schools WHERE id = ?'
  
  try {
    const result = await executeQuery<ResultSetHeader>(query, [id])
    return result.affectedRows > 0
  } catch (error) {
    throw new DatabaseError(
      `Failed to delete school with ID ${id}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function getSchoolsByCity(city: string): Promise<School[]> {
  const query = 'SELECT * FROM schools WHERE city = ? ORDER BY name'
  
  try {
    const results = await executeQuery<RowDataPacket[]>(query, [city])
    return results as School[]
  } catch (error) {
    throw new DatabaseError(
      `Failed to get schools by city ${city}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function getSchoolsByState(state: string): Promise<School[]> {
  const query = 'SELECT * FROM schools WHERE state = ? ORDER BY city, name'
  
  try {
    const results = await executeQuery<RowDataPacket[]>(query, [state])
    return results as School[]
  } catch (error) {
    throw new DatabaseError(
      `Failed to get schools by state ${state}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}