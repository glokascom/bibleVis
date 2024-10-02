import { notFound } from 'next/navigation'

import {
  checkIfLiked,
  getRandomImagesExcluding,
  incrementImageViews,
} from '@/app/(web)/[@username]/actions/imagesActions'
import { checkIfSubscribed } from '@/app/(web)/[@username]/actions/userActions'
import { getImageInfoBySlug } from '@/app/(web)/user/[uuid]/actions/getImage'
import { getUser } from '@/app/actions/getUser'
import ImagePageContent from '@/app/components/ImagePageContent'
import { Modal } from '@/app/components/Modal'
import ServerImage from '@/app/components/ServerImage'

export default async function ImagePage({ params }) {
  const { title } = params

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

  const username = imageInfo.users.username
  const isCurrentUser = user?.username === username

  imageInfo.total_views++
  if (!(await incrementImageViews(imageInfo.id))) {
    imageInfo.total_views--
  }

  return (
    <Modal>
      <ImagePageContent
        imageInfo={imageInfo}
        relatedImages={relatedImages}
        isFollowed={isFollowed}
        isLike={isLike}
        isCurrentUser={isCurrentUser}
        isAuthenticated={!!user}
        isModal
      >
        <ServerImage image={imageInfo} />
      </ImagePageContent>
    </Modal>
  )
}
