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
    .resize(width)
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
