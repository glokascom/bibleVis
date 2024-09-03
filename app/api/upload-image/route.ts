import { NextResponse } from 'next/server'

import sharp from 'sharp'

import { uploadOriginalImage } from '@/app/actions/bucketService'
import { getUser } from '@/app/actions/getUser'

import { addImageSoftware, insertImage, tagImage } from './actions/insertImage'

export async function POST(request: Request) {
  try {
    const user = (await getUser())?.user
    const formData = await request.formData()

    const title = formData.get('title')
    const description = formData.get('description')
    const prompt = formData.get('prompt')
    const is_ai_generated = formData.get('is_ai_generated') === 'true'
    const validImage = formData.get('validImage') as File
    const software = JSON.parse(formData.get('software') as string)
    const tags = JSON.parse(formData.get('tags') as string)
    if (!validImage) {
      return NextResponse.json({ message: 'No image file provided' }, { status: 400 })
    }

    const imageBuffer = Buffer.from(await validImage.arrayBuffer())
    const metadata = await sharp(imageBuffer).metadata()

    if (!metadata) {
      return NextResponse.json({ message: 'Invalid image format' }, { status: 400 })
    }

    const sizes = {
      small: { width: 640, height: Math.round((metadata.height / metadata.width) * 640) },
      medium: {
        width: 1920,
        height: Math.round((metadata.height / metadata.width) * 1920),
      },
      large: {
        width: 2400,
        height: Math.round((metadata.height / metadata.width) * 2400),
      },
      original: { width: metadata.width, height: metadata.height },
    }

    console.log('Sizes data:', sizes)

    const originalFilePath = await uploadOriginalImage(validImage)

    if (!originalFilePath) {
      return NextResponse.json(
        { message: 'Failed to upload image to storage' },
        { status: 500 }
      )
    }

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
      orientation: metadata.width > metadata.height ? 'landscape' : 'portrait',
    }

    const { id: imageId } = await insertImage(imageData)

    if (!imageId) {
      throw new Error('Failed to insert image into database.')
    }

    for (let i = 0; i < software.length; i++) {
      const softwareIdNumber = parseInt(software[i].id, 10)

      if (!isNaN(softwareIdNumber)) {
        await addImageSoftware(imageId, softwareIdNumber)
      } else {
        console.error('Invalid software ID:', software[i])
      }
    }

    for (let i = 0; i < tags.length; i++) {
      const tagName = tags[i].name
      if (typeof tagName === 'string' && tagName.trim().length > 0) {
        await tagImage(imageId, tagName)
      } else {
        console.error('Invalid tag:', tags[i])
      }
    }

    return NextResponse.json({ message: 'Image uploaded successfully', imageId })
  } catch (error) {
    console.error(error.message)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
