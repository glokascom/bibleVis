import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET(request) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const email = searchParams.get('email')
  const password = searchParams.get('password')

  if (!email || !password) {
    return NextResponse.redirect(
      `${url.origin}/error?message=${encodeURIComponent('Missing email or password.')}`
    )
  }

  const supabaseServer = createClient()
  const { error } = await supabaseServer.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('Login error:', error)
    return NextResponse.redirect(
      `${url.origin}/error?message=${encodeURIComponent(error.message || 'An unknown error occurred.')}`
    )
  }

  return NextResponse.redirect(`${url.origin}/private`)
}
