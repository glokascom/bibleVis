import { NextResponse } from 'next/server'

import { supabaseMiddleware } from './app/supabase/middleware'

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!_next/static|doc|_next/image|favicon.ico|swagger.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function middleware(req) {
  if (
    !req.nextUrl.pathname.startsWith('/api') &&
    req.nextUrl.pathname.startsWith('/user')
  ) {
    const { supabase, response } = supabaseMiddleware(req)
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        throw error
      }
      if (!data?.user) {
        throw Error('Middleware error: Unauthorized user')
      }
    } catch {
      // Если пользователь не аутентифицирован, то редиректим на страницу логина
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    return response
  }

  return NextResponse.next()
}
