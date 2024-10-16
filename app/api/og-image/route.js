import { NextResponse } from 'next/server'

import sharp from 'sharp'

export async function GET(request) {
  const src = new URL(request.nextUrl.searchParams.get('src'))
  try {
    const response = await fetch(decodeURIComponent(src))
    const imageBuffer = await response.arrayBuffer()

    const resizedImage = await sharp(Buffer.from(imageBuffer))
      .resize(1200, 630)
      .jpeg({ quality: 60 })
      .toBuffer()

    return new NextResponse(resizedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
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
