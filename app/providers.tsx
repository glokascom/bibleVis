'use client'

import { NextUIProvider } from '@nextui-org/system'

import { ToastProvider } from './components/ToastProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ToastProvider>{children}</ToastProvider>
    </NextUIProvider>
  )
}
