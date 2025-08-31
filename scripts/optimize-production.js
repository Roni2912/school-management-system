#!/usr/bin/env node

/**
 * Production optimization script
 * Runs various optimizations before deployment
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Starting production optimization...')

// 1. Clean previous builds
console.log('🧹 Cleaning previous builds...')
try {
  execSync('npm run clean', { stdio: 'inherit' })
} catch (error) {
  console.warn('Clean command failed, continuing...')
}

// 2. Run linting
console.log('🔍 Running linter...')
try {
  execSync('npm run lint:fix', { stdio: 'inherit' })
  console.log('✅ Linting completed')
} catch (error) {
  console.error('❌ Linting failed')
  process.exit(1)
}

// 3. Run tests
console.log('🧪 Running tests...')
try {
  execSync('npm test', { stdio: 'inherit' })
  console.log('✅ Tests passed')
} catch (error) {
  console.error('❌ Tests failed')
  process.exit(1)
}

// 4. Check environment variables
console.log('🔧 Checking environment configuration...')
const requiredEnvVars = [
  'DB_HOST',
  'DB_USER', 
  'DB_PASSWORD',
  'DB_NAME',
  'NEXT_PUBLIC_BASE_URL'
]

const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '))
  console.log('Please set these variables in your .env.production file')
  process.exit(1)
}
console.log('✅ Environment variables configured')

// 5. Optimize images (if imagemin is available)
console.log('🖼️  Checking for image optimization...')
const publicImagesDir = path.join(process.cwd(), 'public', 'schoolImages')
if (fs.existsSync(publicImagesDir)) {
  const images = fs.readdirSync(publicImagesDir)
  console.log(`Found ${images.length} images in schoolImages directory`)
} else {
  console.log('No images directory found, skipping optimization')
}

// 6. Build the application
console.log('🏗️  Building application...')
try {
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ Build completed successfully')
} catch (error) {
  console.error('❌ Build failed')
  process.exit(1)
}

// 7. Analyze bundle size
console.log('📊 Analyzing bundle size...')
try {
  execSync('npm run build:analyze', { stdio: 'inherit' })
  console.log('✅ Bundle analysis completed - check bundle-analyzer-report.html')
} catch (error) {
  console.warn('Bundle analysis failed, continuing...')
}

// 8. Generate deployment summary
console.log('📋 Generating deployment summary...')
const buildInfo = {
  timestamp: new Date().toISOString(),
  nodeVersion: process.version,
  environment: process.env.NODE_ENV || 'production',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
}

fs.writeFileSync(
  path.join(process.cwd(), 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
)

console.log('🎉 Production optimization completed successfully!')
console.log('📦 Your application is ready for deployment')
console.log('\nNext steps:')
console.log('1. Deploy to your hosting platform')
console.log('2. Set up monitoring and alerts')
console.log('3. Configure CDN for static assets')
console.log('4. Set up database backups')