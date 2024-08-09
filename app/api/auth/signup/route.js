import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET(request) {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const email = searchParams.get('email')
  const password = searchParams.get('password')

  if (!email || !password) {
    const missingParams = []
    if (!email) missingParams.push('email')
    if (!password) missingParams.push('password')

    const errorMessage = `Missing parameter(s): ${missingParams.join(', ')}`
    console.error(errorMessage)
    return NextResponse.redirect(
      `${url.origin}/error?message=${encodeURIComponent(errorMessage)}`
    )
  }

  const supabaseServer = createClient()

  try {
    const { error } = await supabaseServer.auth.signUp({ email, password })

    if (error) {
      throw error
    }

    return NextResponse.redirect(`${url.origin}/check-email`)
  } catch (error) {
    console.error('Error during signup:', error)
    return NextResponse.redirect(
      `${url.origin}/error?message=${encodeURIComponent(error.message || 'An unknown error occurred.')}`
    )
  }
}
