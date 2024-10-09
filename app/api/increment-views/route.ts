import { NextResponse } from 'next/server'

import { incrementImageViews } from '@/app/(web)/[@username]/actions/imagesActions'

export async function POST(request: Request) {
  try {
    const { imageId } = await request.json()

    if (!imageId) {
      return NextResponse.json(
        { success: false, message: 'Image ID is required' },
        { status: 400 }
      )
    }

    const success = await incrementImageViews(imageId)

    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Failed to increment views' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in incrementImageViews API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
