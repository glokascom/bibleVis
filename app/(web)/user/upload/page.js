import { getSoftwares, getTags } from './actions/getSoftwares'
import UploadImage from './components/UploadImage'

export default async function EditUser() {
  const softwareOptions = await getSoftwares()
  const tagsOptions = await getTags()
  return (
    <>
      <UploadImage softwareOptions={softwareOptions} tagsOptions={tagsOptions} />
    </>
  )
}
