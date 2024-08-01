import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  console.log(data?.url, 18)
  return NextResponse.redirect(data?.url || '/private')
}
