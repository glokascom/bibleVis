'use client'

import { useRouter } from 'next/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/40">
      {children}
      <button
        onClick={onDismiss}
        className="absolute right-[calc(5vw_-_2.5rem_-_10px)] top-[5vh] flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L8 8M14 14L8 8M8 8L14 2L2 14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
