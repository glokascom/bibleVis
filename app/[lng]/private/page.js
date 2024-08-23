import { redirect } from 'next/navigation'

import { getUser } from '../../actions/getUser'
import UserGreeting from './components/UserGreeting'

export const dynamic = 'force-dynamic'

export default async function PrivatePage() {
  let { user, error } = await getUser()
  if (!user) {
    redirect('/login')
    return null
  }

  return (
    <div>
      {error ? (
        <p>An error has occurred: {error.message}</p>
      ) : (
        <UserGreeting email={user.email} />
      )}
    </div>
  )
}
