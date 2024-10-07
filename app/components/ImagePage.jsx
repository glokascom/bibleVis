import { notFound } from 'next/navigation'

import {
  checkIfLiked,
  getImageStats,
  getRandomImagesExcluding,
  incrementImageViews,
} from '../(web)/[@username]/actions/imagesActions'
import { checkIfSubscribed } from '../(web)/[@username]/actions/userActions'
import { getImageInfoBySlug } from '../(web)/user/[uuid]/actions/getImage'
import { getUser } from '../actions/getUser'
import ImagePageContent from './ImagePageContent'
import ServerImage from './ServerImage'

export default async function ImagePageComponent({ title, isModal }) {
  const parts = title ? title.split('-') : []
  let urlSlug = ''

  if (parts.length > 1) {
    urlSlug = parts.pop()
  } else {
    urlSlug = title
  }

  if (!urlSlug) {
    return notFound()
  }

  const { error, data: imageInfo } = await getImageInfoBySlug(urlSlug)

  if (error) {
    notFound()
  }

  const { user } = await getUser()

  const relatedImages = await getRandomImagesExcluding(imageInfo.users.id, urlSlug)
  const isFollowed = await checkIfSubscribed(imageInfo.users.id)
  const { existingLike: isLike } = await checkIfLiked(imageInfo.id)

  const { totalViews, totalDownloads } = await getImageStats(imageInfo.id)
  const username = imageInfo.users.username
  const isCurrentUser = user?.username === username

  imageInfo.total_views = totalViews
  imageInfo.total_downloads = totalDownloads

  imageInfo.total_views++
  if (!(await incrementImageViews(imageInfo.id))) {
    imageInfo.total_views--
  }

  //Выводиться только по одному разу на картинку
  console.log(47)
  return (
    <ImagePageContent
      imageInfo={imageInfo}
      relatedImages={relatedImages}
      isFollowed={isFollowed}
      isLike={isLike}
      isCurrentUser={isCurrentUser}
      isAuthenticated={!!user}
      isModal={isModal}
    >
      <ServerImage image={imageInfo} />
    </ImagePageContent>
  )
}
