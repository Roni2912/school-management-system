import { NextResponse } from 'next/server'
import { getDatabaseStatus, ensureDatabaseInitialized } from '@/lib/db-init'

export async function GET() {
  try {
    // Ensure database is initialized
    await ensureDatabaseInitialized()
    
    // Get database status
    const dbStatus = await getDatabaseStatus()
    
    if (dbStatus.available) {
      return NextResponse.json(
        { 
          status: 'healthy', 
          database: 'connected',
          initialized: dbStatus.initialized,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
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
    }
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        database: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}