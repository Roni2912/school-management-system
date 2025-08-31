import { NextRequest, NextResponse } from 'next/server'
import { createSchool, getAllSchools, DatabaseError } from '@/lib/db-utils'
import { validateData, serverSchoolSchema, formatValidationErrors } from '@/lib/validations'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

// POST /api/schools - Create a new school
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const schoolData = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      contact: formData.get('contact') as string,
      email_id: formData.get('email_id') as string,
    }

    // Handle image file if present
    const imageFile = formData.get('image') as File | null
    let imagePath: string | undefined

    if (imageFile && imageFile.size > 0) {
      // Validate image file
      const maxSize = 5 * 1024 * 1024 // 5MB
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      
      if (imageFile.size > maxSize) {
        return NextResponse.json(
          { error: 'Image file size must be less than 5MB' },
          { status: 400 }
        )
      }
      
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: 'Only JPEG, PNG, and WebP images are allowed' },
          { status: 400 }
        )
      }

      // Generate unique filename
      const fileExtension = imageFile.name.split('.').pop()
      const uniqueFilename = `${uuidv4()}.${fileExtension}`
      
      // Ensure schoolImages directory exists
      const uploadDir = join(process.cwd(), 'public', 'schoolImages')
      try {
        await mkdir(uploadDir, { recursive: true })
      } catch (error) {
        // Directory might already exist, ignore error
      }
      
      // Save file
      const filePath = join(uploadDir, uniqueFilename)
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      try {
        await writeFile(filePath, buffer)
        imagePath = `/schoolImages/${uniqueFilename}`
      } catch (error) {
        console.error('Failed to save image file:', error)
        return NextResponse.json(
          { error: 'Failed to save image file' },
          { status: 500 }
        )
      }
    }

    // Add image path to school data
    const completeSchoolData = {
      ...schoolData,
      image: imagePath
    }

    // Validate school data
    const validation = validateData(serverSchoolSchema, completeSchoolData)
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.errors
        },
        { status: 400 }
      )
    }

    // Create school in database
    const newSchool = await createSchool(validation.data)
    
    return NextResponse.json(
      {
        success: true,
        message: 'School created successfully',
        data: newSchool
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating school:', error)
    
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/schools - Retrieve all schools
export async function GET() {
  try {
    const schools = await getAllSchools()
    
    return NextResponse.json(
      {
        success: true,
        data: schools,
        count: schools.length
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Error fetching schools:', error)
    
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}