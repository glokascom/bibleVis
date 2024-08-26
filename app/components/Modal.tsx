'use client'

import { useRouter } from 'next/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <div className="p fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/40">
      {children}
      <button
        onClick={onDismiss}
        className="rounded-medium bg-secondary px-5 py-3 text-red-500"
      >
        Close
      </button>
    </div>
  )
}
