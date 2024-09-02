import { getSoftwares } from './actions/getSoftwares'
import UploadImage from './components/UploadImage'

export default async function EditUser() {
  const softwareOptions = await getSoftwares()
  return (
    <div>
      <UploadImage softwareOptions={softwareOptions} />
    </div>
  )
}
