import { Pool } from 'pg'

// Use connection string in production (Supabase), individual params for local dev
const dbConfig = process.env.POSTGRES_URL 
  ? {
      connectionString: process.env.POSTGRES_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: false } 
        : false, // No SSL for local development with Supabase URL
    }
  : {
      // Local development configuration
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'school_management',
      port: parseInt(process.env.DB_PORT || '5432'),
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ssl: false,
    }

// Create connection pool
const pool = new Pool(dbConfig)

export default pool

export async function testConnection(): Promise<boolean> {
  try {
    // Production debugging - will be removed later
    if (process.env.NODE_ENV === 'production') {
      console.log('🔍 Production DB Debug:', {
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        urlPrefix: process.env.POSTGRES_URL?.substring(0, 25) + '...',
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV
      })
    }
    
    const client = await pool.connect()
    await client.query('SELECT NOW()')
    client.release()
    return true
  } catch (error) {
    // Production debugging - will be removed later
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Production DB Error:', {
        message: error instanceof Error ? error.message : 'Unknown',
        code: (error as Record<string, unknown>)?.code,
        name: (error as Record<string, unknown>)?.name
      })
    }
    return false
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    // PostgreSQL database should already exist (created manually)
    // Just create the schools table
    await createSchoolsTable()
  } catch (error) {
    throw error
  }
}

export async function createSchoolsTable(): Promise<void> {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      contact VARCHAR(20) NOT NULL,
      email_id VARCHAR(255) NOT NULL,
      image VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_schools_city ON schools(city);
    CREATE INDEX IF NOT EXISTS idx_schools_state ON schools(state);
    CREATE INDEX IF NOT EXISTS idx_schools_name ON schools(name);
  `

  try {
    const client = await pool.connect()
    await client.query(createTableQuery)
    client.release()
  } catch (error) {
    throw error
  }
}

export async function executeQuery<T = unknown>(
  query: string,
  params: unknown[] = []
): Promise<T> {
  let client
  try {
    client = await pool.connect()
    const result = await client.query(query, params)
    return result.rows as T
  } catch (error) {
    throw error
  } finally {
    if (client) {
      client.release()
    }
  }
}

export async function closePool(): Promise<void> {
  try {
    await pool.end()
  } catch (error) {
    throw error
  }
}