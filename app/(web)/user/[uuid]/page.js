import { notFound } from 'next/navigation'

import { getSoftwares, getTags } from '../upload/actions/getSoftwares'
import { getImageInfoById } from './actions/getImage'
import EditImage from './components/EditImage'

export default async function Page({ params }) {
  const { uuid } = params
  if (!uuid) {
    return <div>Invalid ID</div>
  }
  const { error, data: imageInfo } = await getImageInfoById(uuid)
  if (error) {
    notFound()
  }

  const softwareOptions = (await getSoftwares()).data
  const tagsOptions = (await getTags()).data

  return (
    <EditImage
      imageInfo={imageInfo}
      softwareOptions={softwareOptions}
      tagsOptions={tagsOptions}
    />
  )
}
