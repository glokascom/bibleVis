import { Plus_Jakarta_Sans } from 'next/font/google'

import { dir } from 'i18next'

import { languages } from '@/app/i18n/settings'
import { Providers } from '@/app/providers'

import '@/styles/globals.css'

import Navigation from '../components/Navigation'

const baseFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
})

export async function generateStaticParams(): Promise<{ lng: string }[]> {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout(props: {
  children: React.ReactNode
  params: { lng: string }
}): JSX.Element {
  const {
    children,
    params: { lng },
  } = props
  return (
    <html lang={lng} dir={dir(lng)} className="light">
      <head />
      <body className={`${baseFont.className}`}>
        <Providers>
          <div className="w-full">
            <Navigation lng={lng} />
            <div id="hero-block"></div>
            <main className="mx-auto w-full max-w-[1796px] px-6 md:px-12">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
