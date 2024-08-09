import { getUser } from './actions/getUser'
import UserGreeting from './components/UserGreeting'

export default async function PrivatePage() {
  const user = await getUser()

  return <UserGreeting email={user.email} />
}
