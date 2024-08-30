import { NextResponse } from 'next/server'

import { uploadOriginalImage } from '@/app/actions/bucketService'
import { getUser } from '@/app/actions/getUser'

import { insertImage } from './actions/insertImage'

export async function POST(request: Request) {
  try {
    const user = (await getUser())?.user
    const formData = await request.formData()

    const title = formData.get('title')
    const description = formData.get('description')
    const prompt = formData.get('prompt')
    const is_ai_generated = formData.get('is_ai_generated') === 'true'
    const validImage = formData.get('validImage') as File

    if (!validImage) {
      return NextResponse.json({ message: 'No image file provided' }, { status: 400 })
    }

    const originalFilePath = await uploadOriginalImage(validImage)
    const imageData = {
      title,
      description,
      prompt,
      is_ai_generated,
      user_id: user.id,
      original_file_path: originalFilePath,
      medium_file_path: '',
      small_file_path: '',
      file_type: validImage.type,
      file_size: validImage.size,
      orientation: 'landscape',
    }

    const data = await insertImage(imageData)

    return NextResponse.json(data)
  } catch (error) {
    console.error(error.message)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
