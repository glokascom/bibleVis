import { notFound } from 'next/navigation'

import { getSoftwares } from '../upload/actions/getSoftwares'
import { getTags } from '../upload/actions/getTags'
import { getImageInfoById } from './actions/getImage'
import EditImage from './components/EditImage'

export default async function Page({ params }) {
  const { uuid } = params
  if (!uuid) {
    notFound()
  }
  const { error, data: imageInfo } = await getImageInfoById(uuid)
  if (error) {
    notFound()
  }

  const getSoftwaresResult = await getSoftwares()
  if (getSoftwaresResult.status === 'error') {
    notFound()
  }
  const softwareOptions = getSoftwaresResult.data

  const getTagsResult = await getTags()
  if (getTagsResult.status === 'error') {
    notFound()
  }
  const tagsOptions = getTagsResult.data

  return (
    <EditImage
      imageInfo={imageInfo}
      softwareOptions={softwareOptions}
      tagsOptions={tagsOptions}
    />
  )
}
