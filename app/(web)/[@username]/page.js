import { notFound } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'

import { openGraph } from '../meta'
import { getUserByUsername } from '../user/edit/actions/userService'
import { checkIfSubscribed } from './actions/userActions'
import Cover from './components/Cover'
import Gallery from './components/Gallery'
import UserInfo from './components/UserInfo'

export async function generateMetadata({ params }) {
  const username = decodeURIComponent(params['@username'] ?? '')

  return {
    title: 'Images by ' + username,
    description: 'See the best free to download images by ' + username + ' on BibleVis',
    openGraph: {
      ...openGraph,
      title: 'Images by @' + username,
      description: 'See the best free to download images by ' + username + ' on BibleVis',
    },
  }
}

export default async function ProfileUserPage({ params }) {
  const username = decodeURIComponent(params['@username'])
  if (!username.startsWith('@')) {
    notFound()
  }
  const profileUsername = username.slice(1)
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
    <div className="mx-auto w-full max-w-[1806px] flex-auto px-6 md:px-12">
      <div className="mb-12 mt-2.5 flex max-h-[400px] flex-col items-stretch gap-7 px-0 md:mt-9 md:flex-row md:gap-[10px]">
        <div className="flex-initial md:flex-[2_0_0] xl:flex-[3_0_0]">
          <Cover isCurrentUser={isCurrentUser} profileUser={profileUser} />
        </div>
        <div className="w-full flex-initial md:flex-[1_0_0]">
          <UserInfo
            isCurrentUser={isCurrentUser}
            user={currentUser}
            profileUser={profileUser}
            initialIsFollowed={isFollowed}
            className="border-0 md:h-full md:rounded-medium md:border md:px-5 md:py-8 lg:border-secondary-200"
          />
        </div>
      </div>
      <Gallery
        isAuthenticated={!!currentUser}
        profileUserId={profileUser.id}
        backUrl={`/@${profileUser.username}`}
      />
    </div>
  )
}
