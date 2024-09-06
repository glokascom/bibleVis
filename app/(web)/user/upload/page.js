import { getUser } from '@/app/actions/getUser'

import { getDataFromTable } from './actions/getSoftwares'
import UploadImage from './components/UploadImage'

export default async function EditUser() {
  const softwareOptions = (await getDataFromTable('softwares')).data
  const tagsOptions = (await getDataFromTable('tags')).data
  const user = (await getUser()).user
  return (
    <>
      <UploadImage
        user={user}
        softwareOptions={softwareOptions}
        tagsOptions={tagsOptions}
      />
    </>
  )
}
