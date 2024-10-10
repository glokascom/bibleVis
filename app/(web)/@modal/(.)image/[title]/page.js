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

  const meta = await parent
  return {
    ...meta,
    title: image.title,
    description: image.description,
    openGraph: {
      ...meta?.openGraph,
      title: image.title,
      description: image.description,
      images: [
        {
          url: image.imagePath,
          width: image.file_sizes.original.width,
          height: image.file_sizes.original.height,
        },
        ...meta.openGraph.images,
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
