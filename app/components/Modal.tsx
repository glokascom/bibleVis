'use client'

import { useRouter } from 'next/navigation'

import { useGallery } from '../GaleryContext'
import { ModalProps } from '../types/api'
import CloseIcon from './svg/CloseIcon'

export function Modal({ closeModal, isCloseButton = true, children }: ModalProps) {
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
        className={`relative my-6 max-h-[90vh] lg:mx-0 ${isCloseButton ? 'mt-6 lg:mt-0' : ''}`}
      >
        {isCloseButton && (
          <button
            onClick={onDismiss}
            className={`absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary lg:-right-12 lg:top-0`}
          >
            <CloseIcon />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
