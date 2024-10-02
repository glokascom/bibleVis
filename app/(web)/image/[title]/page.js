import { notFound } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'
import ImagePageContent from '@/app/components/ImagePageContent'
import ServerImage from '@/app/components/ServerImage'

import {
  checkIfLiked,
  getRandomImagesExcluding,
  incrementImageViews,
} from '../../[@username]/actions/imagesActions'
import { checkIfSubscribed } from '../../[@username]/actions/userActions'
import { getImageInfoBySlug } from '../../user/[uuid]/actions/getImage'

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
    <main className="mx-auto mt-7 w-full max-w-[1806px] md:px-12">
      <ImagePageContent
        imageInfo={imageInfo}
        relatedImages={relatedImages}
        isFollowed={isFollowed}
        isLike={isLike}
        isCurrentUser={isCurrentUser}
        isAuthenticated={!!user}
      >
        <ServerImage image={imageInfo} />
      </ImagePageContent>
    </main>
  )
}
