'use client'

import { MouseEvent } from 'react'

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
  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onDismiss()
    }
  }
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-secondary/90"
      onClick={handleClickOutside}
    >
      <div className={`relative mx-5 my-6`}>
        {isCloseButton && (
          <button
            onClick={onDismiss}
            className={`absolute -right-12 top-0 hidden h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary md:flex`}
          >
            <CloseIcon />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
