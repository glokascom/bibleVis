import { Wix_Madefor_Text } from 'next/font/google'

import { Providers } from '@/app/providers'

import '@/styles/globals.css'

import React from 'react'

const baseFont = Wix_Madefor_Text({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'BibleVis',
  description: 'Some description here',
}

export default function RootLayout(props: { children: React.ReactNode }): JSX.Element {
  const { children } = props

  return (
    <html lang="en" className="light">
      <head />
      <body className={`${baseFont.className}`}>
        <Providers>
          <div className="w-full">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
