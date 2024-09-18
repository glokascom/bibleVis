'use client'

import { NextUIProvider } from '@nextui-org/system'

import { AuthProvider } from './components/AuthContext'
import { ToastProvider } from './components/ToastProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </NextUIProvider>
  )
}
