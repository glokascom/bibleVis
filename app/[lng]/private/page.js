import { redirect } from 'next/navigation'

import { getUser } from './actions/getUser'
import UserGreeting from './components/UserGreeting'

export default async function PrivatePage() {
  let user
  let errorMessage = ''

  try {
    user = await getUser()
  } catch (error) {
    console.error(error)
    errorMessage = error.message

    redirect('/login')

    return null
  }

  return (
    <div>
      {errorMessage ? (
        <p>An error has occurred: {errorMessage}</p>
      ) : (
        <UserGreeting email={user.email} />
      )}
    </div>
  )
}
