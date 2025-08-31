import pool, { executeQuery } from './db'

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
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
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
    const result = await executeQuery<School[]>(query, params)
    
    if (result.length > 0) {
      return result[0]
    } else {
      throw new DatabaseError('Failed to create school: No data returned')
    }
  } catch (error) {
    throw new DatabaseError(
      'Failed to create school',
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function getSchoolById(id: number): Promise<School> {
  const query = 'SELECT * FROM schools WHERE id = $1'
  
  try {
    const results = await executeQuery<School[]>(query, [id])
    
    if (results.length === 0) {
      throw new DatabaseError(`School with ID ${id} not found`)
    }
    
    return results[0]
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
    const results = await executeQuery<School[]>(query)
    return results
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
  
  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ')
  const query = `UPDATE schools SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`
  const params = [...fields.map(field => schoolData[field as keyof CreateSchoolData]), id]
  
  try {
    const result = await executeQuery<School[]>(query, params)
    
    if (result.length === 0) {
      throw new DatabaseError(`School with ID ${id} not found`)
    }
    
    return result[0]
  } catch (error) {
    throw new DatabaseError(
      `Failed to update school with ID ${id}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function deleteSchool(id: number): Promise<boolean> {
  const query = 'DELETE FROM schools WHERE id = $1'
  
  try {
    const client = await pool.connect()
    const result = await client.query(query, [id])
    client.release()
    return result.rowCount !== null && result.rowCount > 0
  } catch (error) {
    throw new DatabaseError(
      `Failed to delete school with ID ${id}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function getSchoolsByCity(city: string): Promise<School[]> {
  const query = 'SELECT * FROM schools WHERE city = $1 ORDER BY name'
  
  try {
    const results = await executeQuery<School[]>(query, [city])
    return results
  } catch (error) {
    throw new DatabaseError(
      `Failed to get schools by city ${city}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}

export async function getSchoolsByState(state: string): Promise<School[]> {
  const query = 'SELECT * FROM schools WHERE state = $1 ORDER BY city, name'
  
  try {
    const results = await executeQuery<School[]>(query, [state])
    return results
  } catch (error) {
    throw new DatabaseError(
      `Failed to get schools by state ${state}`,
      error instanceof Error ? error : new Error(String(error))
    )
  }
}