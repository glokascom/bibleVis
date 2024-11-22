import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'

import { getSoftwares } from './actions/getSoftwares'
import { getTags } from './actions/getTags'
import UploadImage from './components/UploadImage'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Upload your image',
}

export default async function UploadImagePage() {
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

  const { user } = await getUser()
  if (!user) {
    redirect('/login?redirectedFrom=/user/upload')
  }
  if (!user.is_creator) {
    redirect('/')
  }
  return (
    <div className="flex flex-col pt-10">
      <div className="my-5 text-balance text-center font-medium md:hidden">
        <p className="text-3xl">Upload your image</p>
        <p className="mt-5 text-wrap text-small text-secondary-400">
          Join our community of creators and showcase your talent by uploading your media!
          Learn more about the BibleVis{' '}
          <Link href="/pages/license" className="underline">
            Content License
          </Link>
          .
        </p>
      </div>
      <UploadImage
        user={user}
        softwareOptions={softwareOptions}
        tagsOptions={tagsOptions}
      />
    </div>
  )
}
