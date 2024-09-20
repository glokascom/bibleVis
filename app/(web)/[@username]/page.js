import { notFound } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'

import { getUserInfoByUsername } from '../user/edit/actions/userService'
import {
  checkIfLiked,
  getRandomImagesExcluding,
  loadNextPageExtended,
} from './actions/imagesActions'
import { checkIfSubscribed } from './actions/userActions'
import Cover from './components/Cover'
import Gallery from './components/Gallery'
import UserInfo from './components/UserInfo'

export default async function UserDetail({ params }) {
  const username = decodeURIComponent(params['@username']).replace('@', '')
  const { user } = await getUser()

  const followUserInfo = await getUserInfoByUsername(username)

  if (!followUserInfo) {
    notFound()
    return null
  }

  const isCurrentUser = username === user.username
  const isFollowed = user ? await checkIfSubscribed(followUserInfo.id) : false

  const { images: newImages } = await loadNextPageExtended(1, followUserInfo.id)

  const extendedImages = await Promise.all(
    newImages.map(async (image) => {
      if (image.fullInfo) return image

      const [relatedImages, { existingLike }] = await Promise.all([
        getRandomImagesExcluding(followUserInfo.id, image.id),
        checkIfLiked(image.id),
      ])

      return {
        ...image,
        fullInfo: {
          imageInfo: image,
          relatedImages,
          isLike: !!existingLike,
          isFollowed,
          isCurrentUser: user.id === image.user_id,
        },
      }
    })
  )

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <div className="mb-12 mt-2.5 flex max-h-[400px] flex-col items-stretch gap-7 px-4 md:mt-9 md:flex-row md:gap-[10px] md:px-0">
        <div className="flex-initial md:flex-[2_0_0] xl:flex-[3_0_0]">
          <Cover isCurrentUser={isCurrentUser} followUserInfo={followUserInfo} />
        </div>
        <div className="w-full flex-initial md:flex-[1_0_0]">
          <UserInfo
            isCurrentUser={isCurrentUser}
            userInfo={user}
            followUserInfo={followUserInfo}
            initialIsFollowed={isFollowed}
          />
        </div>
      </div>
      <Gallery
        userId={user.id}
        followUserId={followUserInfo.id}
        initialImages={extendedImages}
        isAuthenticated={!!user}
      />
    </main>
  )
}
