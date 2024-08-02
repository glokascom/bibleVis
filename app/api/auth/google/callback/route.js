import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET() {
  const supabase = createClient()

  const { error } = await supabase.auth.getSessionFromUrl({
    storeSession: true,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.redirect('/private')
}
