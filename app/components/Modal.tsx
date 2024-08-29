'use client'

import NextImage from 'next/image'
import { useRouter } from 'next/navigation'

import { Image } from '@nextui-org/react'

interface ModalProps {
  children: React.ReactNode
  isImageForm?: boolean
  closeModal?: () => void
}

export function Modal({ children, closeModal, isImageForm = false }: ModalProps) {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/70">
      <div className="relative">
        {children}
        {isImageForm && (
          <Image
            removeWrapper
            as={NextImage}
            height={42}
            width={42}
            src="/close.svg"
            alt="close"
            radius="none"
            className="absolute -right-9 top-5 hidden cursor-pointer md:block"
            onClick={closeModal}
          />
        )}
      </div>
      {!isImageForm && (
        <button
          onClick={onDismiss}
          className="rounded-medium bg-secondary px-5 py-3 text-red-500"
        >
          Close
        </button>
      )}
    </div>
  )
}
