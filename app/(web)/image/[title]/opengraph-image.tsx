import { NextResponse } from 'next/server'

import sharp from 'sharp'

import { getImageInfoBySlug } from '../../user/[uuid]/actions/getImage'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/jpeg'

export default async function Image({
  params: { title },
}: {
  params: { title: string }
}) {
  const parts = title ? title.split('-') : []
  let urlSlug: string | undefined = ''

  if (parts.length > 1) {
    urlSlug = parts.pop()
  } else {
    urlSlug = title
  }

  if (!urlSlug) {
    return null
  }
  const { error, data: image } = await getImageInfoBySlug(urlSlug)
  if (error) {
    return null
  }

  const response = await fetch(image.imagePath)
  const imageBuffer = await response.arrayBuffer()

  const resizedImage = await sharp(Buffer.from(imageBuffer))
    .resize(1200, 630)
    .jpeg({ quality: 80 })
    .toBuffer()

  return new NextResponse(resizedImage, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'inline',
    },
  })
}
