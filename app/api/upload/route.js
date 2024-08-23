import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

import { updateAvatar, updateCover } from '@/app/actions/bucketService'

export async function POST(req) {
  const formData = await req.formData()
  const uuid = formData.get('uuid')
  if (!uuid) {
    return NextResponse.json({ error: 'UUID is missing' }, { status: 400 })
  }

  try {
    if (formData.get('avatar')) {
      await updateAvatar(uuid, formData.get('avatar'))
      revalidatePath('/', 'layout')
    }
    if (formData.get('cover')) {
      await updateCover(uuid, formData.get('cover'))
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
