import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET(request) {
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirectTo')

  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.redirect(`${url.origin}/${redirectTo}`)
}
