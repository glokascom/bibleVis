import { Wix_Madefor_Text } from 'next/font/google'

import { dir } from 'i18next'

import { languages } from '@/app/i18n/settings'
import { Providers } from '@/app/providers'

import '@/styles/globals.css'

import React from 'react'

import { getUser } from '../actions/getUser'
import Navigation from '../components/Navigation'

const baseFont = Wix_Madefor_Text({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
})

export async function generateStaticParams(): Promise<{ lng: string }[]> {
  return languages.map((lng) => ({ lng }))
}

export const metadata = {
  title: 'BibleVis',
  description: 'Some description here',
}

export default async function RootLayout(props: {
  params: { lng: string }
  children: React.ReactNode
  modal: React.ReactNode
}): Promise<JSX.Element> {
  const {
    params: { lng },
    children,
    modal,
  } = props
  const { user } = await getUser()
  console.log({ user })
  return (
    <html lang={lng} dir={dir(lng)} className="light">
      <head />
      <body className={`${baseFont.className}`}>
        <Providers>
          <div className="w-full">
            <Navigation lng={lng} user={user} />
            <div id="hero-block"></div>
            <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
              {children}
            </main>
          </div>
          {modal}
          <div id="modal-root"></div>
        </Providers>
      </body>
    </html>
  )
}
