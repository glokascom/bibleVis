import { getUser } from '@/app/actions/getUser'

import { getSoftwares, getTags } from './actions/getSoftwares'
import UploadImage from './components/UploadImage'

export const dynamic = 'force-dynamic'
export default async function EditUser() {
  const softwareOptions = (await getSoftwares()).data
  const tagsOptions = (await getTags()).data

  const user = (await getUser()).user
  return (
    <UploadImage
      user={user}
      softwareOptions={softwareOptions}
      tagsOptions={tagsOptions}
    />
  )
}
