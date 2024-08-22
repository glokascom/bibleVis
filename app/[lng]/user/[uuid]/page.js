import { getUser } from '@/app/actions/getUser'

import Cover from './components/Cover'
import UserInfo from './components/UserInfo'

export default async function UserDetail({ params }) {
  const auth = await getUser()
  const isCurrentUser = params.uuid === auth.id

  return (
    <div className="mt-2.5 flex flex-col items-center gap-7 md:mt-9 md:flex-row md:gap-1">
      <div className="max-w-7xl">
        <Cover isCurrentUser={isCurrentUser} />
      </div>
      <div className="w-full md:w-auto md:grow lg:h-full">
        <UserInfo isCurrentUser={isCurrentUser} />
      </div>
    </div>
  )
}
