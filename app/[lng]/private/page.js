import { getUser } from './actions/PrivateRoute'
import UserGreeting from './components/UserGreeting'

export default async function PrivatePage() {
  const user = await getUser()

  return <UserGreeting email={user.email} />
}
