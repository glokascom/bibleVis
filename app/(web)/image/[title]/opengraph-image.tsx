import { ImageResponse } from 'next/og'

import { getImageInfoBySlug } from '../../user/[uuid]/actions/getImage'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

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

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url(${image.imagePath})`,
          width: '1200px',
          height: '630px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    ),
    {
      ...size,
    }
  )
}
