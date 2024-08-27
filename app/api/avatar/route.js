import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${userId}/avatars/normal.jpg`

  // Проверяем, существует ли аватар
  const response = await fetch(url)
  if (response.ok) {
    return NextResponse.json({ url })
  } else {
    return NextResponse.json({ url: null })
  }
}
