import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function GET() {
  const supabase = createClient()

  const { error } = await supabase.auth.getSessionFromUrl()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  console.log(122)
  return NextResponse.json({ message: 'Успешно авторизован' })
}
