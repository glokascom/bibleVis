import { Inter } from 'next/font/google'

import { dir } from 'i18next'

import { languages } from '@/app/i18n/settings'
import { Providers } from '@/app/providers'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
        <Providers className={inter.className}>{children}</Providers>
      </body>
    </html>
  )
}
