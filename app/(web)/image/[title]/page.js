import { getUser } from '@/app/actions/getUser'
import ImagePageContent from '@/app/components/ImagePageContent'

import {
  checkIfLiked,
  getRandomImagesExcluding,
} from '../../[@username]/actions/imagesActions'
import { checkIfSubscribed } from '../../[@username]/actions/userActions'
import { getImageInfoById } from '../../user/[uuid]/actions/getImage'

export default async function ImagePage({ params }) {
  const { title } = params

  const parts = title ? title.split('-') : []
  let idImage = ''
  let searchText = ''

  if (parts.length > 1) {
    idImage = parts.pop() // забираем последний элемент как idImage
    searchText = parts.join(' ') // оставшиеся части объединяем в строку
  } else {
    idImage = title
    searchText = ''
  }
  //TODO: добавить логику поиска
  console.log('Search Text:', searchText)

  if (!idImage) {
    return <div>Invalid ID</div>
  }

  const { error, data: imageInfo } = await getImageInfoById(idImage)

  if (error) {
    return <div className="text-danger-500">{error}</div>
  }

  const relatedImages = await getRandomImagesExcluding(idImage)
  const isFollowed = await checkIfSubscribed(imageInfo.users.id)
  const { existingLike: isLike } = await checkIfLiked(imageInfo.id)

  const data = await getUser()
  const userInfo = data?.user
  const username = imageInfo.users.username
  const isCurrentUser = username === userInfo?.username ? true : false
  return (
    <main className="mx-auto mt-7 w-full max-w-[1806px] md:px-12">
      <ImagePageContent
        imageInfo={imageInfo}
        relatedImages={relatedImages}
        isFollowed={isFollowed}
        isLike={isLike}
        isCurrentUser={isCurrentUser}
      />
    </main>
  )
}
