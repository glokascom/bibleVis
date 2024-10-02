'use client'

import { NextUIProvider } from '@nextui-org/system'

import { ToastProvider } from './components/ToastProvider'
import { GalleryProvider } from './GaleryContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ToastProvider>
        <GalleryProvider>{children}</GalleryProvider>
      </ToastProvider>
    </NextUIProvider>
  )
}
