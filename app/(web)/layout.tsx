import React from 'react'

import { getUser } from '../actions/getUser'
import CookiesBanner from '../components/CookiesBanner'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}): Promise<JSX.Element> {
  const { children, modal } = props

  const { user } = await getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation user={user} />
      <main className="flex-grow">{children}</main>
      {modal}
      <div id="modal-root"></div>
      <CookiesBanner />
      <Footer />
    </div>
  )
}
