import { getUser } from '@/app/actions/getUser'

import UserInfo from './components/UserInfo'

export default async function UserDetail({ params }) {
  const auth = await getUser()
  const isCurrentUser = params.uuid === auth.id

  return (
    <div>
      <UserInfo isCurrentUser={isCurrentUser} />
    </div>
  )
}
