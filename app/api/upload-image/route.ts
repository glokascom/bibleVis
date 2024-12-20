import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import sharp from 'sharp'

import { getImageInfoById } from '@/app/(web)/user/[uuid]/actions/getImage'
import { uploadOriginalImage } from '@/app/actions/bucketService'
import { getUser } from '@/app/actions/getUser'
import { ApiError, ApiResponse, ApiSuccess } from '@/app/types/api'

import {
  addImageSoftware,
  getCurrentSoftwareIds,
  getCurrentTagIds,
  insertImage,
  removeImageSoftware,
  removeImageTags,
  tagImage,
  updateImage,
} from './actions/insertImage'

interface Software {
  id: string
}

interface Tag {
  name: string
}

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse<{ imageId: string }>>> {
  try {
    const user = (await getUser())?.user
    if (!user) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'User not authenticated' },
        { status: 401 }
      )
    }

    const formData = await request.formData()

    const title = formData.get('title')?.toString().trim()
    const description = formData.get('description')?.toString().trim()
    const prompt = formData.get('prompt')?.toString().trim()
    const is_ai_generated = formData.get('is_ai_generated') === 'true'
    const validImage = formData.get('validImage') as File
    const software = JSON.parse(formData.get('software') as string) as Software[]
    const tags = JSON.parse(formData.get('tags') as string) as Tag[]

    if (!title) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Title is required' },
        { status: 400 }
      )
    }

    if (!description) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Description is required' },
        { status: 400 }
      )
    }

    if (is_ai_generated && !prompt) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Prompt is required' },
        { status: 400 }
      )
    }

    if (!software.length) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Softwares is required' },
        { status: 400 }
      )
    }

    if (!validImage) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Invalid or missing image file' },
        { status: 400 }
      )
    }

    const imageBuffer = Buffer.from(await validImage.arrayBuffer())
    const metadata = await sharp(imageBuffer).metadata()

    if (!metadata.width || !metadata.height) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Invalid or unreadable image format' },
        { status: 400 }
      )
    }

    const smallWidth = 720
    const mediumWidth = 1920

    const calculateHeight = (width: number) =>
      Math.round((metadata.height! / metadata.width!) * width)

    const sizesImages: {
      small: { width: number; height: number }
      medium?: { width: number; height: number }
      original: { width: number; height: number }
    } = {
      small: { width: smallWidth, height: calculateHeight(smallWidth) },
      original: { width: metadata.width, height: metadata.height },
    }

    if (metadata.width > mediumWidth) {
      sizesImages.medium = { width: mediumWidth, height: calculateHeight(mediumWidth) }
    }

    const { uploadedPath: originalFilePath, blurPreview } =
      await uploadOriginalImage(validImage)

    if (!originalFilePath) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Failed to upload image to storage' },
        { status: 500 }
      )
    }

    const imageData = {
      title,
      description,
      prompt,
      is_ai_generated,
      preview: blurPreview,
      user_id: user.id,
      original_file_path: originalFilePath,
      file_type: validImage.type,
      orientation: metadata.width > metadata.height ? 'landscape' : 'portrait',
      file_sizes: sizesImages,
    }

    const { id: imageId } = await insertImage(imageData)

    if (!imageId) {
      throw new Error('Failed to insert image into database.')
    }

    try {
      await Promise.all(
        software.map(async (soft) => {
          const softwareIdNumber = parseInt(soft.id, 10)
          if (!isNaN(softwareIdNumber)) {
            await addImageSoftware(imageId, softwareIdNumber)
          } else {
            throw new Error(`Invalid software ID: ${soft.id}`)
          }
        })
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error while adding software'
      console.error(`Error adding software to image ${imageId}:`, errorMessage)
      return NextResponse.json<ApiError>(
        { status: 'error', message: errorMessage },
        { status: 500 }
      )
    }

    try {
      await Promise.all(
        tags.map(async (tag) => {
          const tagName = tag.name
          if (typeof tagName === 'string' && tagName.trim().length > 0) {
            await tagImage(imageId, tagName)
          } else {
            throw new Error(`Invalid tag: ${tag.name}`)
          }
        })
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error while adding tags'
      console.error(`Error adding tags to image ${imageId}:`, errorMessage)
      return NextResponse.json<ApiError>(
        { status: 'error', message: errorMessage },
        { status: 500 }
      )
    }

    return NextResponse.json<
      ApiSuccess<{ imageId: string; size: { width: number; height: number } }>
    >({
      status: 'success',
      data: { imageId, size: sizesImages.original },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error processing POST request:', errorMessage)
    return NextResponse.json<ApiError>(
      { status: 'error', message: errorMessage },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse<ApiResponse<{ imageId: string }>>> {
  try {
    const user = (await getUser())?.user
    if (!user) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'User not authenticated' },
        { status: 401 }
      )
    }

    const formData = await request.formData()

    const imageId = formData.get('imageId')?.toString().trim()
    const title = formData.get('title')?.toString().trim()
    const description = formData.get('description')?.toString().trim()
    const prompt = formData.get('prompt')?.toString().trim()
    const is_ai_generated = formData.get('is_ai_generated') === 'true'
    const software = JSON.parse(formData.get('software') as string) as Software[]
    const tags = JSON.parse(formData.get('tags') as string) as Tag[]

    if (!imageId) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Image ID is required' },
        { status: 400 }
      )
    }

    if (!title) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Title is required' },
        { status: 400 }
      )
    }

    if (!description) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Description is required' },
        { status: 400 }
      )
    }

    if (is_ai_generated && !prompt) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Prompt is required' },
        { status: 400 }
      )
    }

    if (!software.length) {
      return NextResponse.json<ApiError>(
        { status: 'error', message: 'Softwares is required' },
        { status: 400 }
      )
    }

    const existingImage = await getImageInfoById(parseInt(imageId))
    if (!existingImage) {
      return NextResponse.json<ApiError>(
        {
          status: 'error',
          message: 'Image not found or you do not have permission to update this image',
        },
        { status: 404 }
      )
    }

    const imageData = {
      title,
      description,
      prompt,
      is_ai_generated,
    }

    const success = await updateImage(imageId, imageData)

    if (!success) {
      throw new Error('Failed to update image in database.')
    }

    try {
      const currentSoftwareIds = await getCurrentSoftwareIds(imageId)
      const newSoftwareIds = software.map((soft) => parseInt(soft.id, 10))

      const softwareToRemove = currentSoftwareIds.filter(
        (id) => !newSoftwareIds.includes(id)
      )
      await removeImageSoftware(imageId, softwareToRemove)

      await Promise.all(
        newSoftwareIds.map(async (softwareIdNumber) => {
          if (!isNaN(softwareIdNumber)) {
            await addImageSoftware(imageId, softwareIdNumber)
          } else {
            throw new Error(`Invalid software ID: ${softwareIdNumber}`)
          }
        })
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error while updating software'
      console.error(`Error updating software for image ${imageId}:`, errorMessage)
      return NextResponse.json<ApiError>(
        { status: 'error', message: errorMessage },
        { status: 500 }
      )
    }

    try {
      const currentTagIds = await getCurrentTagIds(imageId)
      const newTagNames = tags.map((tag) => tag.name)

      const tagsToRemove = currentTagIds.filter((name) => !newTagNames.includes(name))
      await removeImageTags(imageId, tagsToRemove)

      await Promise.all(
        newTagNames.map(async (tagName) => {
          if (typeof tagName === 'string' && tagName.trim().length > 0) {
            await tagImage(imageId, tagName)
          } else {
            throw new Error(`Invalid tag: ${tagName}`)
          }
        })
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error while updating tags'
      console.error(`Error updating tags for image ${imageId}:`, errorMessage)
      return NextResponse.json<ApiError>(
        { status: 'error', message: errorMessage },
        { status: 500 }
      )
    }
    revalidatePath('/', 'layout')

    return NextResponse.json<ApiSuccess<{ imageId: string }>>({
      status: 'success',
      data: { imageId },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error processing PUT request:', errorMessage)
    return NextResponse.json<ApiError>(
      { status: 'error', message: errorMessage },
      { status: 500 }
    )
  }
}
