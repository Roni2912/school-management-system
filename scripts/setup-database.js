#!/usr/bin/env node

/**
 * Database setup script
 * This script initializes the database and creates the required tables
 * Run this after setting up MySQL server and configuring environment variables
 */

const { Pool } = require('pg')
require('dotenv').config({ path: '.env.local' })

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

async function setupDatabase() {
  console.log('🚀 Starting database setup...')
  console.log('📋 Configuration:')
  console.log(`   Host: ${dbConfig.host}`)
  console.log(`   User: ${dbConfig.user}`)
  console.log(`   Database: ${dbConfig.database}`)
  console.log(`   Port: ${dbConfig.port}`)
  console.log('')

  let pool

  try {
    // Step 1: Connect to the database (should already exist)
    console.log('🔌 Connecting to database...')
    pool = new Pool(dbConfig)
    
    const client = await pool.connect()
    await client.query('SELECT NOW()')
    client.release()
    console.log('✅ Database connection successful')

    // Step 2: Create schools table
    console.log('🏗️  Creating schools table...')
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

    const tableClient = await pool.connect()
    await tableClient.query(createTableQuery)
    tableClient.release()
    console.log('✅ Schools table created successfully')

    // Step 3: Verify table structure
    console.log('🔍 Verifying table structure...')
    const verifyClient = await pool.connect()
    const columnsResult = await verifyClient.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'schools' 
      ORDER BY ordinal_position
    `)
    verifyClient.release()
    
    console.log('📊 Table structure:')
    columnsResult.rows.forEach(col => {
      console.log(`   ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(required)' : '(optional)'}`)
    })

    // Step 4: Test basic operations
    console.log('🧪 Testing basic operations...')
    const queryClient = await pool.connect()
    const countResult = await queryClient.query('SELECT COUNT(*) as count FROM schools')
    queryClient.release()
    console.log(`✅ Schools table has ${countResult.rows[0].count} records`)

    console.log('')
    console.log('🎉 Database setup completed successfully!')
    console.log('💡 You can now start the application with: npm run dev')
    console.log('🔗 Health check endpoint: http://localhost:3000/api/health')

  } catch (error) {
    console.error('')
    console.error('❌ Database setup failed:')
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🔴 Cannot connect to PostgreSQL server')
      console.error('💡 Make sure PostgreSQL is running and accessible')
      console.error('   - Windows: Check PostgreSQL service in Services panel')
      console.error('   - macOS: brew services start postgresql')
      console.error('   - Linux: sudo systemctl start postgresql')
    } else if (error.code === '28P01') {
      console.error('🔴 Access denied - check your credentials')
      console.error('💡 Verify DB_USER and DB_PASSWORD in .env.local')
    } else if (error.code === '3D000') {
      console.error('🔴 Database does not exist')
      console.error('💡 Create the database first: CREATE DATABASE school_management;')
    } else {
      console.error('🔴 Unexpected error:', error.message)
    }
    
    console.error('')
    console.error('📖 For detailed setup instructions, see README-DATABASE.md')
    process.exit(1)
  } finally {
    // Clean up connections
    if (pool) {
      await pool.end()
    }
  }
}

// Run the setup
setupDatabase()