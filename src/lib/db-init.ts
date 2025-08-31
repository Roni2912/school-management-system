/**
 * Database initialization utilities
 * These functions handle database setup and verification
 */

import pool, { initializeDatabase, testConnection } from './db'

let isInitialized = false

/**
 * Initialize database on application startup
 * This function is called automatically when the database is first accessed
 */
export async function ensureDatabaseInitialized(): Promise<void> {
  if (isInitialized) {
    return
  }

  try {
    console.log('🔍 Checking database connection...')
    const isConnected = await testConnection()
    
    if (!isConnected) {
      console.warn('⚠️  Database connection failed - running in offline mode')
      console.warn('💡 Run "npm run setup-db" to initialize the database')
      return
    }

    console.log('🚀 Initializing database schema...')
    await initializeDatabase()
    
    isInitialized = true
    console.log('✅ Database initialized successfully')
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    console.warn('⚠️  Application will continue in offline mode')
    console.warn('💡 Check README-DATABASE.md for setup instructions')
  }
}

/**
 * Check if database is available and initialized
 */
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    return await testConnection()
  } catch (error) {
    return false
  }
}

/**
 * Get database status for health checks
 */
export async function getDatabaseStatus(): Promise<{
  available: boolean
  initialized: boolean
  error?: string
}> {
  try {
    const available = await testConnection()
    return {
      available,
      initialized: isInitialized,
    }
  } catch (error) {
    return {
      available: false,
      initialized: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}