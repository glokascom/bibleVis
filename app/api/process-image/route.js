import { NextResponse } from 'next/server'

import sharp from 'sharp'

import { supabaseService } from '@/app/supabase/service'

export async function POST(request) {
  try {
    const { src, width } = await request.json()

    if (!src || !width) {
      return NextResponse.json(
        { error: 'Missing or invalid parameters' },
        { status: 400 }
      )
    }
    const { data, error } = await supabaseService.storage.from('profile').download(src)
    if (error) {
      throw new Error('Failed to download image')
    }

    const buffer = await data.arrayBuffer()
    const resizedBuffer = await sharp(Buffer.from(buffer))
      .resize(width)
      .jpeg({ quality: 80 })
      .toBuffer()

    return new Response(resizedBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `inline; filename="processed_${width}.jpg"`,
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const src = searchParams.get('src')
    const width = parseInt(searchParams.get('w'), 10)

    if (!src || isNaN(width)) {
      return NextResponse.json(
        { error: 'Missing or invalid parameters' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseService.storage.from('profile').download(src)

    if (error) {
      throw new Error('Failed to download image')
    }

    const buffer = await data.arrayBuffer()
    const resizedBuffer = await sharp(Buffer.from(buffer))
      .resize(width)
      .jpeg({ quality: 80 })
      .toBuffer()

    return new Response(resizedBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="image_${width}.jpg"`,
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
