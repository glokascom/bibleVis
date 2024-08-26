import { getUser } from '@/app/actions/getUser'

import { getUserInfoByUsername } from '../user/edit/actions/userService'
import Cover from './components/Cover'
import UserInfo from './components/UserInfo'

export default async function UserDetail({ params }) {
  const username = decodeURIComponent(params['@username']).replace('@', '')
  const data = await getUser()
  const userInfo = data.user
  const isCurrentUser = username === userInfo.username
  const followUserInfo = await getUserInfoByUsername(username)
  return (
    <div className="mt-2.5 flex h-[400px] flex-col items-start gap-7 md:mt-9 md:flex-row md:gap-1">
      <div className="max-w-7xl">
        <Cover isCurrentUser={isCurrentUser} followUserInfo={followUserInfo} />
      </div>
      <div className="h-full w-full md:w-auto md:min-w-44 md:grow lg:min-w-96">
        <UserInfo isCurrentUser={isCurrentUser} followUserInfo={followUserInfo} />
      </div>
    </div>
  )
}
