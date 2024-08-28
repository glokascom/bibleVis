import { notFound } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'

import { getUserInfoByUsername } from '../user/edit/actions/userService'
import { checkIfSubscribed } from './actions/userActions'
import Cover from './components/Cover'
import Gallery from './components/Gallery'
import UserInfo from './components/UserInfo'

export default async function UserDetail({ params }) {
  const username = decodeURIComponent(params['@username']).replace('@', '')
  const data = await getUser()
  const userInfo = data?.user

  const isCurrentUser = username === userInfo?.username ? true : false
  const followUserInfo = await getUserInfoByUsername(username)

  if (!followUserInfo) {
    notFound()
    return null
  }

  const isFollowed = userInfo ? await checkIfSubscribed(followUserInfo.id) : false

  // const count_images_username = 50 //TODO нужно подсчитать кол-во картинок юзера

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <div className="mt-2.5 flex h-[400px] flex-col items-start gap-7 px-4 md:mb-12 md:mt-9 md:flex-row md:gap-1 md:px-0">
        <div className="max-w-7xl">
          <Cover isCurrentUser={isCurrentUser} followUserInfo={followUserInfo} />
        </div>
        <div className="h-full w-full md:w-auto md:min-w-44 md:grow lg:min-w-96">
          <UserInfo
            isCurrentUser={isCurrentUser}
            userInfo={userInfo}
            followUserInfo={followUserInfo}
            initialIsFollowed={isFollowed}
          />
        </div>
      </div>
      <Gallery />
    </main>
  )
}
