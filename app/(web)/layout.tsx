import React from 'react'

import { getUser } from '../actions/getUser'
import CookiesBanner from '../components/CookiesBanner'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

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

  return (
    <>
      <Navigation user={user} />
      {children}
      {modal}
      <div id="modal-root"></div>
      <CookiesBanner />
      <Footer />
    </>
  )
}
