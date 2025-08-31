import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

export default pool

export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    console.log('Database connection successful')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    // First, create the database if it doesn't exist
    const tempConfig = { ...dbConfig }
    const { database, ...configWithoutDb } = tempConfig
    const tempPool = mysql.createPool(configWithoutDb)
    
    const connection = await tempPool.getConnection()
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``)
    connection.release()
    await tempPool.end()

    // Now create the schools table
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
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      contact VARCHAR(20) NOT NULL,
      email_id VARCHAR(255) NOT NULL,
      image VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_city (city),
      INDEX idx_state (state),
      INDEX idx_name (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `

  try {
    const connection = await pool.getConnection()
    await connection.execute(createTableQuery)
    connection.release()
    console.log('Schools table created successfully')
  } catch (error) {
    console.error('Failed to create schools table:', error)
    throw error
  }
}

export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T> {
  let connection
  try {
    connection = await pool.getConnection()
    const [results] = await connection.execute(query, params)
    return results as T
  } catch (error) {
    console.error('Query execution failed:', error)
    throw error
  } finally {
    if (connection) {
      connection.release()
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