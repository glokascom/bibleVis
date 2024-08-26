import { Wix_Madefor_Text } from 'next/font/google'

import { Providers } from '@/app/providers'

import '@/styles/globals.css'

import React from 'react'

import { getUser } from '../actions/getUser'
import Navigation from '../components/Navigation'

const baseFont = Wix_Madefor_Text({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'BibleVis',
  description: 'Some description here',
}

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}): Promise<JSX.Element> {
  const { children, modal } = props
  const { user } = await getUser()
  console.log({ user })
  return (
    <html lang="en" className="light">
      <head />
      <body className={`${baseFont.className}`}>
        <Providers>
          <div className="w-full">
            <Navigation user={user} />
            {children}
          </div>
          {modal}
          <div id="modal-root"></div>
        </Providers>
      </body>
    </html>
  )
}
