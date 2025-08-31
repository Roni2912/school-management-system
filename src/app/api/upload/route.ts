import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

// POST /api/upload - Handle file uploads
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed',
          allowedTypes 
        },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { 
          error: 'File size too large. Maximum size is 5MB',
          maxSize: '5MB',
          receivedSize: `${(file.size / (1024 * 1024)).toFixed(2)}MB`
        },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension) {
      return NextResponse.json(
        { error: 'Invalid file name' },
        { status: 400 }
      )
    }

    const uniqueFilename = `${uuidv4()}.${fileExtension}`
    
    // Ensure schoolImages directory exists
    const uploadDir = join(process.cwd(), 'public', 'schoolImages')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, continue
      console.log('Upload directory already exists or created')
    }
    
    // Save file
    const filePath = join(uploadDir, uniqueFilename)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    try {
      await writeFile(filePath, buffer)
    } catch (error) {
      console.error('Failed to save file:', error)
      return NextResponse.json(
        { error: 'Failed to save file to server' },
        { status: 500 }
      )
    }

    // Return success response with file information
    const publicPath = `/schoolImages/${uniqueFilename}`
    
    return NextResponse.json(
      {
        success: true,
        message: 'File uploaded successfully',
        data: {
          filename: uniqueFilename,
          originalName: file.name,
          path: publicPath,
          size: file.size,
          type: file.type,
          url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${publicPath}`
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error uploading file:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'File upload failed',
        message: 'An error occurred while uploading the file. Please try again.',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    )
  }
}

// GET /api/upload - Get upload information (optional endpoint for debugging)
export async function GET() {
  return NextResponse.json(
    {
      message: 'File upload endpoint',
      methods: ['POST'],
      maxFileSize: '5MB',
      allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
      uploadPath: '/schoolImages/'
    },
    { status: 200 }
  )
}