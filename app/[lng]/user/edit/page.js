import { getUser } from '@/app/actions/getUser'

import { getUserInfoById } from './actions/userService'
import ProfileCard from './components/ProfileCard'

export default async function EditUser() {
  let userInfo = null
  let provider = null

  try {
    const data = await getUser()
    userInfo = await getUserInfoById(data.id)
    provider = data.identities[0].provider
  } catch (err) {
    console.error(err)
  }

  return (
    <div className="mx-auto mt-5 w-full max-w-5xl">
      <ProfileCard userInfo={userInfo} provider={provider} />
    </div>
  )
}
