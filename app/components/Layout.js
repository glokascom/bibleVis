// components/Layout.js
import React from 'react'

import Link from 'next/link'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-600 py-4 text-white">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="text-lg font-bold">
            <Link href="/">MyApp</Link>
          </div>
          <div className="space-x-4">
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto mt-8">{children}</main>
    </div>
  )
}

export default Layout
