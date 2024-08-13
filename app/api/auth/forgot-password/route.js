import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return new NextResponse(JSON.stringify({ error: 'Missing parameter: email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const supabaseServer = createClient()
    const { error } = await supabaseServer.auth.resetPasswordForEmail(email)

    if (error) {
      return new NextResponse(
        JSON.stringify({ error: error.message || 'An unknown error occurred.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new NextResponse(JSON.stringify({ message: 'Reset password successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return new NextResponse(JSON.stringify({ error: 'An unknown error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
