import { Pool } from 'pg'

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 10, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle
  connectionTimeoutMillis: 2000, // how long to wait for a connection
}

// Create connection pool
const pool = new Pool(dbConfig)

export default pool

export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect()
    await client.query('SELECT NOW()')
    client.release()
    console.log('Database connection successful')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    // PostgreSQL database should already exist (created manually)
    // Just create the schools table
    await createSchoolsTable()
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization failed:', error)
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
    console.log('Schools table created successfully')
  } catch (error) {
    console.error('Failed to create schools table:', error)
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
    console.error('Query execution failed:', error)
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
    console.log('Database pool closed')
  } catch (error) {
    console.error('Error closing database pool:', error)
    throw error
  }
}