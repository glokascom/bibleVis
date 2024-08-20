import { NextResponse } from 'next/server'

import { updateAvatar, updateCover } from '@/app/[lng]/user/[uuid]/actions/bucketService'

export async function POST(req) {
  const { searchParams } = new URL(req.url)
  const uuid = searchParams.get('uuid')

  if (!uuid) {
    return NextResponse.json({ error: 'UUID is missing' }, { status: 400 })
  }

  const formData = await req.formData()

  try {
    let avatarPath, coverPath

    if (formData.get('avatar')) {
      avatarPath = await updateAvatar(uuid, formData.get('avatar'))
    }

    if (formData.get('cover')) {
      coverPath = await updateCover(uuid, formData.get('cover'))
    }

    return NextResponse.json({ avatarPath, coverPath })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
