'use client'

import { useEffect } from 'react'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

import Cookies from 'js-cookie'

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    const handleRouteChange = (url) => {
      let allowAnalytics = false
      const consent = Cookies.get('userConsent')
      if (consent) {
        allowAnalytics = JSON.parse(consent).analytics ?? false
      }
      const isProtectedRoute = !(
        url.startsWith('/reset-password') ||
        url.startsWith('/user/') ||
        url.startsWith('/forgot-password')
      )

      if (allowAnalytics && !isProtectedRoute) {
        window.gtag('config', 'G-BLWEBXRQL3', {
          page_path: url,
        })
      }
    }

    handleRouteChange(pathname)
  }, [pathname])

  let allowAnalytics = false
  const consent = Cookies.get('userConsent')
  if (consent) {
    allowAnalytics = JSON.parse(consent).analytics ?? false
  }
  const isProtectedRoute = !(
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/user/') ||
    pathname.startsWith('/forgot-password')
  )

  if (!allowAnalytics || isProtectedRoute) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-BLWEBXRQL3`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BLWEBXRQL3');
        `}
      </Script>
    </>
  )
}
