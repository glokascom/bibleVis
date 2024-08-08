import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function POST() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Logout successful' })
}
