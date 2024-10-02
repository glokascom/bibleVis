import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET(request) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${request.nextUrl.origin}/api/auth/google/callback?next=${request.nextUrl.searchParams.get('redirectedFrom') ?? '/'}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.redirect(data.url)
}
