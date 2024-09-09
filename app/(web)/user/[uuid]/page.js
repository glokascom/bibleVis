import { getDataFromTable } from '../upload/actions/getSoftwares'
import { getImageInfoById } from './actions/getImage'
import EditImage from './components/EditImage'

export default async function Page({ params }) {
  const { uuid } = params
  if (!uuid) {
    return <div>Invalid ID</div>
  }
  const { error, data: imageInfo } = await getImageInfoById(uuid)
  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  const softwareOptions = (await getDataFromTable('softwares')).data
  const tagsOptions = (await getDataFromTable('tags')).data

  return (
    <EditImage
      imageInfo={imageInfo}
      softwareOptions={softwareOptions}
      tagsOptions={tagsOptions}
    />
  )
}
