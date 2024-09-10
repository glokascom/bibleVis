import ImagePageContent from '@/app/components/ImagePageContent'

import { getRandomImagesExcluding } from '../../[@username]/actions/imagesActions'
import { getImageInfoById } from '../../user/[uuid]/actions/getImage'

export default async function ImagePage({ params }) {
  const { title } = params

  const parts = title ? title.split('-') : []
  let uuid = ''
  let searchText = ''

  if (parts.length > 1) {
    uuid = parts.pop() // забираем последний элемент как uuid
    searchText = parts.join(' ') // оставшиеся части объединяем в строку
  } else {
    uuid = title
    searchText = ''
  }

  if (!uuid) {
    return <div>Invalid ID</div>
  }

  const { error, data: imageInfo } = await getImageInfoById(uuid)
  console.log(imageInfo, 29)

  if (error) {
    return <div className="text-danger-500">{error}</div>
  }

  const relatedImages = await getRandomImagesExcluding(uuid)
  console.log('Search Text:', searchText)
  console.log('Related Images:', relatedImages)

  return (
    <main className="mx-auto w-full max-w-[1806px] md:px-12">
      <ImagePageContent imageInfo={imageInfo} relatedImages={relatedImages} />
    </main>
  )
}
