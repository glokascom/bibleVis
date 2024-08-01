import { NextResponse } from 'next/server'

import acceptLanguage from 'accept-language'

import { cookieName, fallbackLng, languages } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!api|_next/static|doc|_next/image|favicon.ico|icon[1,2,3,4].png|swagger.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export function middleware(req) {
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

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}
