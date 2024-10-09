'use client'

import { useRouter } from 'next/navigation'

import { useGallery } from '../GaleryContext'
import { ModalProps } from '../types/api'

export function Modal({ closeModal, showCloseButton = false, children }: ModalProps) {
  const router = useRouter()
  const { basePageUrl, searchParams } = useGallery()

  function onDismiss() {
    if (closeModal) {
      closeModal()
    } else if (basePageUrl) {
      const urlWithParams = searchParams
        ? `${basePageUrl}?${searchParams.toString()}`
        : basePageUrl
      router.push(urlWithParams, { scroll: false })
    } else {
      router.back()
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-secondary/90">
      <div
        className={`relative my-6 max-h-[90vh] lg:mx-0 ${showCloseButton ? 'mt-6 lg:mt-0' : ''}`}
      >
        <button
          onClick={onDismiss}
          className={`absolute -top-12 right-0 h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary lg:-right-12 lg:top-0 ${showCloseButton ? 'flex' : 'hidden lg:flex'}`}
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
        {children}
      </div>
    </div>
  )
}
