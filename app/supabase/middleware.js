import { NextResponse } from 'next/server'

import { createClient } from '@supabase/supabase-js'

export function supabaseMiddleware(request) {
  const response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const cookies = request.cookies
  const cookieOptions = { path: '/', sameSite: 'lax', httpOnly: true }

  function getCookie(name) {
    return cookies.get(name)?.value || ''
  }

  function setCookie(name, value, options = cookieOptions) {
    response.cookies.set(name, value, options)
  }

  function removeCookie(name, options = cookieOptions) {
    response.cookies.set(name, '', { ...options, maxAge: -1 })
  }

  return { supabase, response, getCookie, setCookie, removeCookie }
}
