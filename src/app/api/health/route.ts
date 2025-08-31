import { NextResponse } from 'next/server'
import { getDatabaseStatus, ensureDatabaseInitialized } from '@/lib/db-init'

export async function GET() {
  try {
    // Ensure database is initialized
    await ensureDatabaseInitialized()
    
    // Get database status
    const dbStatus = await getDatabaseStatus()
    
    if (dbStatus.available) {
      const response = NextResponse.json(
        { 
          status: 'healthy', 
          database: 'connected',
          initialized: dbStatus.initialized,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      )
      
      // Short cache for health checks
      response.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60')
      return response
    } else {
      const response = NextResponse.json(
        { 
          status: 'degraded', 
          database: 'disconnected',
          initialized: dbStatus.initialized,
          error: dbStatus.error,
          message: 'Application running in offline mode',
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      )
      
      // No caching for error states
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      return response
    }
  } catch (error) {
    console.error('Health check failed:', error)
    const response = NextResponse.json(
      { 
        status: 'error', 
        database: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
    
    // No caching for error states
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    return response
  }
}