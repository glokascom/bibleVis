import { headers } from 'next/headers'

import { getImageInfoBySlug } from '@/app/(web)/user/[uuid]/actions/getImage'
import ImagePageComponent from '@/app/components/ImagePage'
import { Modal } from '@/app/components/Modal'

export async function generateMetadata({ params: { title } }, parent) {
  const parts = title ? title.split('-') : []
  let urlSlug = ''

  if (parts.length > 1) {
    urlSlug = parts.pop()
  } else {
    urlSlug = title
  }

  if (!urlSlug) {
    return parent
  }
  const { error, data: image } = await getImageInfoBySlug(urlSlug)
  if (error) {
    return parent
  }

  const headersList = headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const origin = `${protocol}://${host}`

  return {
    title: 'Image by @' + image.users.username,
    description:
      image.title + ' | Download this image by @' + image.users.username + ' on BibleVis',
    openGraph: {
      title: 'Image by @' + image.users.username,
      description:
        image.title +
        ' | Download this image by @' +
        image.users.username +
        ' on BibleVis',
      images: [
        {
          url: origin + '/api/og-image?src=' + encodeURIComponent(image.imagePath),
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function ImagePage({ params }) {
  const { title } = params

  return (
    <Modal>
      <ImagePageComponent title={title} isModal />
    </Modal>
  )
}
