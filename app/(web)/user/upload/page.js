import { redirect } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'

import { getSoftwares, getTags } from './actions/getSoftwares'
import UploadImage from './components/UploadImage'

export const dynamic = 'force-dynamic'
export default async function UploadImagePage() {
  const softwareOptions = (await getSoftwares()).data
  const tagsOptions = (await getTags()).data

  const { user } = await getUser()
  if (!user) {
    redirect('/login?redirectedFrom=/user/upload')
  }
  if (!user.is_creator) {
    redirect('/')
  }
  return (
    <UploadImage
      user={user}
      softwareOptions={softwareOptions}
      tagsOptions={tagsOptions}
    />
  )
}
