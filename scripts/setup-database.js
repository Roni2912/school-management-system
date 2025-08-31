#!/usr/bin/env node

/**
 * Database setup script
 * This script initializes the database and creates the required tables
 * Run this after setting up MySQL server and configuring environment variables
 */

const mysql = require('mysql2/promise')
require('dotenv').config({ path: '.env.local' })

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

async function setupDatabase() {
  console.log('🚀 Starting database setup...')
  console.log('📋 Configuration:')
  console.log(`   Host: ${dbConfig.host}`)
  console.log(`   User: ${dbConfig.user}`)
  console.log(`   Database: ${dbConfig.database}`)
  console.log(`   Port: ${dbConfig.port}`)
  console.log('')

  let tempPool, mainPool

  try {
    // Step 1: Create database if it doesn't exist
    console.log('📦 Creating database if it doesn\'t exist...')
    const { database, ...configWithoutDb } = dbConfig
    tempPool = mysql.createPool(configWithoutDb)
    
    const connection = await tempPool.getConnection()
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\``)
    connection.release()
    console.log(`✅ Database '${database}' is ready`)

    // Step 2: Connect to the specific database
    console.log('🔌 Connecting to database...')
    mainPool = mysql.createPool(dbConfig)
    
    const testConnection = await mainPool.getConnection()
    await testConnection.ping()
    testConnection.release()
    console.log('✅ Database connection successful')

    // Step 3: Create schools table
    console.log('🏗️  Creating schools table...')
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

    const tableConnection = await mainPool.getConnection()
    await tableConnection.execute(createTableQuery)
    tableConnection.release()
    console.log('✅ Schools table created successfully')

    // Step 4: Verify table structure
    console.log('🔍 Verifying table structure...')
    const verifyConnection = await mainPool.getConnection()
    const [columns] = await verifyConnection.execute('DESCRIBE schools')
    verifyConnection.release()
    
    console.log('📊 Table structure:')
    columns.forEach(col => {
      console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'NO' ? '(required)' : '(optional)'}`)
    })

    // Step 5: Test basic operations
    console.log('🧪 Testing basic operations...')
    const queryConnection = await mainPool.getConnection()
    const [rows] = await queryConnection.execute('SELECT COUNT(*) as count FROM schools')
    queryConnection.release()
    console.log(`✅ Schools table has ${rows[0].count} records`)

    console.log('')
    console.log('🎉 Database setup completed successfully!')
    console.log('💡 You can now start the application with: npm run dev')
    console.log('🔗 Health check endpoint: http://localhost:3000/api/health')

  } catch (error) {
    console.error('')
    console.error('❌ Database setup failed:')
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🔴 Cannot connect to MySQL server')
      console.error('💡 Make sure MySQL is running and accessible')
      console.error('   - Windows: Check MySQL service in Services panel')
      console.error('   - macOS: brew services start mysql')
      console.error('   - Linux: sudo systemctl start mysql')
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('🔴 Access denied - check your credentials')
      console.error('💡 Verify DB_USER and DB_PASSWORD in .env.local')
    } else {
      console.error('🔴 Unexpected error:', error.message)
    }
    
    console.error('')
    console.error('📖 For detailed setup instructions, see README-DATABASE.md')
    process.exit(1)
  } finally {
    // Clean up connections
    if (tempPool) {
      await tempPool.end()
    }
    if (mainPool) {
      await mainPool.end()
    }
  }
}

// Run the setup
setupDatabase()