import { notFound } from 'next/navigation' // Import notFound for 404 handling

import { getImageInfoById } from './actions/getImage'
import EditImage from './components/EditImage'

export default async function Page({ searchParams }) {
  const imageId = searchParams.id
  if (!imageId) {
    return <div>Invalid ID</div>
  }

  const { error, data: imageInfo } = await getImageInfoById(imageId)

  if (error) {
    return <div>Error fetching image information: {error.message}</div>
  }

  if (!imageInfo) {
    return notFound()
  }

  return <EditImage imageInfo={imageInfo} />
}
