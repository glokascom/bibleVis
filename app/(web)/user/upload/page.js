import { getSoftwares } from './actions/getSoftwares'
import UploadImage from './components/UploadImage'

export default async function EditUser() {
  const softwareOptions = (await getSoftwares()).body
  const initialSoftwareTags = softwareOptions.map((option) => option.name)
  return (
    <>
      <UploadImage softwareOptions={initialSoftwareTags} />
    </>
  )
}
