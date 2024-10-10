import { Wix_Madefor_Text } from 'next/font/google'

import { Providers } from '@/app/providers'

import '@/styles/globals.css'

import React from 'react'

import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

import { openGraph } from './(web)/meta'

const baseFont = Wix_Madefor_Text({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | BibleVis',
    default: 'Images inspired by Bible | BibleVis',
  },
  description:
    'BibleVis offers stunning, royalty-free, AI-generated Bible and Christian images. Discover and share high-quality visuals inspired by Scripture',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }],
  },
  manifest: '/site.webmanifest',
  openGraph: { ...openGraph },
}

export const viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout(props: { children: React.ReactNode }): JSX.Element {
  const { children } = props

  return (
    <html lang="en" className="light">
      <body className={`${baseFont.className}`}>
        <Providers>
          <div className="flex min-h-screen w-full flex-col">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
