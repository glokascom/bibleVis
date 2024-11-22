import { getUser } from '@/app/actions/getUser'

import ProfileCard from './components/ProfileCard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Edit profile',
}

export default async function EditUser() {
  let user = null

  try {
    const result = await getUser()
    if (result.error) throw result.error
    user = result.user
  } catch (err) {
    console.error(err)
  }

  return (
    <div className="mx-auto mt-5 w-full max-w-5xl">
      <ProfileCard user={user} />
    </div>
  )
}
