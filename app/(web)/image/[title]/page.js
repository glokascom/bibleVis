import { getUser } from '@/app/actions/getUser'
import ImagePageContent from '@/app/components/ImagePageContent'

import {
  checkIfLiked,
  getRandomImagesExcluding,
  incrementImageViews,
} from '../../[@username]/actions/imagesActions'
import { checkIfSubscribed } from '../../[@username]/actions/userActions'
import { getImageInfoById } from '../../user/[uuid]/actions/getImage'

export default async function ImagePage({ params }) {
  const { title } = params

  const parts = title ? title.split('-') : []
  let idImage = ''
  let searchText = ''

  if (parts.length > 1) {
    idImage = parts.pop()
    searchText = parts.join(' ')
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

  const { user } = await getUser()

  const relatedImages = await getRandomImagesExcluding(imageInfo.users.id, idImage)
  const isFollowed = await checkIfSubscribed(imageInfo.users.id)
  const { existingLike: isLike } = await checkIfLiked(imageInfo.id)

  const username = imageInfo.users.username
  const isCurrentUser = user?.username === username

  imageInfo.total_views++
  if (!(await incrementImageViews(imageInfo.id))) {
    imageInfo.total_views--
  }

  return (
    <main className="mx-auto mt-7 w-full max-w-[1806px] md:px-12">
      <ImagePageContent
        imageInfo={imageInfo}
        relatedImages={relatedImages}
        isFollowed={isFollowed}
        isLike={isLike}
        isCurrentUser={isCurrentUser}
        isAuthenticated={!!user}
      />
    </main>
  )
}
