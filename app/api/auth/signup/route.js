import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function POST(request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    const missingParams = []
    if (!email) missingParams.push('email')
    if (!password) missingParams.push('password')

    const errorMessage = `Missing parameter(s): ${missingParams.join(', ')}`
    console.error(errorMessage)

    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const supabaseServer = createClient()
  const { error } = await supabaseServer.auth.signUp({ email, password })

  if (error) {
    console.error('Singup error:', error)

    return new NextResponse(
      JSON.stringify({ error: error.message || 'An unknown error occurred.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  return new NextResponse(JSON.stringify({ message: 'Singup successful' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
