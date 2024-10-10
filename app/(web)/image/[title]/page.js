import ImagePageComponent from '@/app/components/ImagePage'

import { getImageInfoBySlug } from '../../user/[uuid]/actions/getImage'

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

  return {
    title: image.title,
    description: image.description,
    openGraph: {
      title: image.title,
      description: image.description,
    },
  }
}

export default async function ImagePage({ params }) {
  const { title } = params

  return (
    <main className="mx-auto mt-7 w-full max-w-[1806px] flex-auto md:px-12">
      <ImagePageComponent title={title} isModal={false} />
    </main>
  )
}
