import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
