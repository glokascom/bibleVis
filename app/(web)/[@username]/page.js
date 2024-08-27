import { redirect } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'

import { getUserInfoByUsername } from '../user/edit/actions/userService'
import Cover from './components/Cover'
import UserInfo from './components/UserInfo'

export default async function UserDetail({ params }) {
  const username = decodeURIComponent(params['@username']).replace('@', '')
  const data = await getUser()
  const userInfo = data?.user

  if (!userInfo) {
    redirect(`/login?redirectedFrom=@${username}`)
    return null
  }

  const isCurrentUser = username === userInfo.username
  const followUserInfo = await getUserInfoByUsername(username)
  if (!followUserInfo) {
    redirect(`/login`)
    return null
  }

  return (
    <div className="mt-2.5 flex h-[400px] flex-col items-start gap-7 px-4 md:mt-9 md:flex-row md:gap-1 md:px-12">
      <div className="max-w-7xl">
        <Cover isCurrentUser={isCurrentUser} followUserInfo={followUserInfo} />
      </div>
      <div className="h-full w-full md:w-auto md:min-w-44 md:grow lg:min-w-96">
        <UserInfo
          isCurrentUser={isCurrentUser}
          userInfo={userInfo}
          followUserInfo={followUserInfo}
        />
      </div>
    </div>
  )
}
