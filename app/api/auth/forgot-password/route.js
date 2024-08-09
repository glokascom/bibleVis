import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET(request) {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const email = searchParams.get('email')

  if (!email) {
    console.error('Email parameter is missing.')
    return NextResponse.redirect(
      `${url.origin}/error?message=${encodeURIComponent('Email parameter is missing.')}`
    )
  }

  const supabaseServer = createClient()
  const { error } = await supabaseServer.auth.resetPasswordForEmail(email)

  if (error) {
    console.error('Error sending password reset email:', error)
    return NextResponse.redirect(
      `${url.origin}/error?message=${encodeURIComponent(error.message || 'An unknown error occurred.')}`
    )
  }

  return NextResponse.redirect(`${url.origin}/password-reset-sent`)
}
