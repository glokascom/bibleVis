import { getSoftwares, getTags } from './actions/getSoftwares'
import UploadImage from './components/UploadImage'

export default async function EditUser() {
  const softwareOptions = (await getSoftwares()).data
  const tagsOptions = (await getTags()).data
  return (
    <>
      <UploadImage softwareOptions={softwareOptions} tagsOptions={tagsOptions} />
    </>
  )
}
