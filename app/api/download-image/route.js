import { NextResponse } from 'next/server'

import sharp from 'sharp'

import { supabaseService } from '@/app/supabase/service'

async function processImage(src, width) {
  if (!src) {
    throw new Error('Missing or invalid parameters')
  }

  const { data, error } = await supabaseService.storage.from('profile').download(src)
  if (error) {
    throw new Error('Failed to download image')
  }

  const buffer = await data.arrayBuffer()

  if (!width) {
    return Buffer.from(buffer)
  }

  const resizedBuffer = await sharp(Buffer.from(buffer))
    .resize({ width: Number(width) })
    .jpeg({ quality: 80 })
    .toBuffer()

  return resizedBuffer
}

export async function POST(request) {
  try {
    const { src, width } = await request.json()
    const resizedBuffer = await processImage(src, width)

    return new Response(resizedBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `inline; filename="${width ? `processed_${width}` : 'original'}.jpg"`,
      },
    })
  } catch (error) {
    console.error('Error processing image:', error.message)
    return NextResponse.json(
      { error: `Failed to process image: ${error.message}` },
      { status: 500 }
    )
  }
}

async function incrementDownloads(src) {
  try {
    const { data, error: fetchError } = await supabaseService
      .from('images')
      .select('total_downloads')
      .eq('original_file_path', src)
      .single()

    if (fetchError || !data) {
      throw new Error('Failed to fetch total downloads')
    }

    const currentDownloads = data.total_downloads

    const { error: updateError } = await supabaseService
      .from('images')
      .update({ total_downloads: currentDownloads + 1 })
      .eq('original_file_path', src)

    if (updateError) {
      throw new Error('Failed to update total downloads')
    }

    return true
  } catch (error) {
    console.error('Error incrementing downloads:', error.message)
    return false
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const src = searchParams.get('src')
  const width = searchParams.get('width')

  try {
    const success = await incrementDownloads(src)
    if (!success) {
      throw new Error('Failed to increment downloads')
    }

    const resizedBuffer = await processImage(src, width)

    return new Response(resizedBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="${width ? `image_${width}` : 'image_original'}.jpg"`,
      },
    })
  } catch (error) {
    console.error('Error processing image:', error.message)
    return NextResponse.json(
      { error: `Failed to process image: ${error.message}` },
      { status: 500 }
    )
  }
}
