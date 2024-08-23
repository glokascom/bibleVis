import { NextResponse } from 'next/server'

import acceptLanguage from 'accept-language'

import { cookieName, fallbackLng, languages } from './app/i18n/settings'
import { supabaseMiddleware } from './app/supabase/middleware'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!_next/static|doc|_next/image|favicon.ico|swagger.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function middleware(req) {
  let lng

  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  }
  if (!lng) {
    lng = fallbackLng
  }

  if (!req.nextUrl.pathname.startsWith('/api')) {
    // Если язык не указан в пути, то редиректим на страницу с языком
    if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith('/_next')
    ) {
      return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
    }

    // Если в referer есть язык, то записываем его в cookie
    if (req.headers.has('referer')) {
      const refererUrl = new URL(req.headers.get('referer'))
      const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
      const response = NextResponse.next()
      if (lngInReferer) {
        response.cookies.set(cookieName, lngInReferer)
      }
      return response
    }
  }

  if (
    !req.nextUrl.pathname.startsWith('/api') &&
    req.nextUrl.pathname.split('/')?.[2] === 'user'
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
      redirectUrl.pathname = '/' + lng + '/login'
      redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    return response
  }
  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}
