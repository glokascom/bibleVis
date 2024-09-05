import { getDataFromTable } from './actions/getSoftwares'
import UploadImage from './components/UploadImage'

export default async function EditUser() {
  const softwareOptions = (await getDataFromTable('softwares')).data
  const tagsOptions = (await getDataFromTable('tags')).data
  return (
    <>
      <UploadImage softwareOptions={softwareOptions} tagsOptions={tagsOptions} />
    </>
  )
}
