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
    const isConnected = await testConnection()
    
    if (!isConnected) {
      return
    }

    await initializeDatabase()
    
    isInitialized = true
    
  } catch (error) {
    // Application will continue in offline mode
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