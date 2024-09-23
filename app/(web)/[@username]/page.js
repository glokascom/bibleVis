import { notFound } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'

import { getUserByUsername } from '../user/edit/actions/userService'
import { checkIfSubscribed } from './actions/userActions'
import Cover from './components/Cover'
import Gallery from './components/Gallery'
import UserInfo from './components/UserInfo'

export default async function ProfileUserPage({ params }) {
  const profileUsername = decodeURIComponent(params['@username']).replace('@', '')
  const { user: currentUser } = await getUser()

  const isCurrentUser = profileUsername === currentUser?.username
  let profileUser
  try {
    profileUser = await getUserByUsername(profileUsername)
  } catch {
    notFound()
  }

  const isFollowed = currentUser ? await checkIfSubscribed(profileUser.id) : false

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <div className="mb-12 mt-2.5 flex max-h-[400px] flex-col items-stretch gap-7 px-4 md:mt-9 md:flex-row md:gap-[10px] md:px-0">
        <div className="flex-initial md:flex-[2_0_0] xl:flex-[3_0_0]">
          <Cover isCurrentUser={isCurrentUser} profileUser={profileUser} />
        </div>
        <div className="w-full flex-initial md:flex-[1_0_0]">
          <UserInfo
            isCurrentUser={isCurrentUser}
            user={currentUser}
            profileUser={profileUser}
            initialIsFollowed={isFollowed}
          />
        </div>
      </div>
      <Gallery profileUserId={profileUser.id} />
    </main>
  )
}
