'use client'

import { MouseEvent, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useGallery } from '../GaleryContext'
import { ModalProps } from '../types/api'
import CloseIcon from './svg/CloseIcon'

export function Modal({
  closeModal,
  isCloseButton = true,
  showCloseOnMobile = false,
  children,
}: ModalProps) {
  const router = useRouter()
  const { basePageUrl, searchParams } = useGallery()
  const mouseDownInside = useRef(false)

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

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    mouseDownInside.current = event.target !== event.currentTarget
  }

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    if (mouseDownInside.current) {
      return
    }

    if (event.target === event.currentTarget) {
      onDismiss()
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-secondary/90"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className={`relative ${showCloseOnMobile ? 'mt-14 max-h-[calc(100vh-3.5rem)]' : 'mx-5'}`}
      >
        {isCloseButton && (
          <button
            onClick={onDismiss}
            className={`absolute -top-12 right-5 h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary md:-right-12 md:top-0 ${showCloseOnMobile ? 'flex' : 'hidden md:flex'}`}
          >
            <CloseIcon />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
