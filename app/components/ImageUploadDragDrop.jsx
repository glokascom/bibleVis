import { useEffect, useRef, useState } from 'react'

import { Image } from '@nextui-org/image'

import { validateAndLoadImage } from '../utils/imageUpload'
import { BVButton } from './BVButton'

function ImageUploadDragDrop({ onImageChange }) {
  const [isOverDropZone, setIsOverDropZone] = useState(false)
  const [containerHeight, setContainerHeight] = useState('auto')
  const containerRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(`${containerRef.current.offsetHeight}px`)
    }
  }, [])

  function preventEventPropagation(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    preventEventPropagation(e)
    setIsOverDropZone(true)
  }

  const handleDragLeave = (e) => {
    preventEventPropagation(e)
    const rect = e.currentTarget.getBoundingClientRect()
    if (
      e.clientY < rect.top ||
      e.clientY >= rect.bottom ||
      e.clientX < rect.left ||
      e.clientX >= rect.right
    ) {
      setIsOverDropZone(false)
    }
  }

  const handleDragOver = (e) => {
    preventEventPropagation(e)
    setIsOverDropZone(true)
  }

  const handleDrop = (e) => {
    preventEventPropagation(e)
    setIsOverDropZone(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      if (files.length > 1) {
        onImageChange(null, 'Please drop only one image file.')
        return
      }
      validateAndLoadImage(files[0], onImageChange)
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      validateAndLoadImage(files[0], onImageChange)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current.click()
  }

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight }}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOverDropZone ? 'border-0 p-0' : 'border border-dashed p-2.5 md:p-6 2xl:p-9'
      } rounded-medium shadow-small`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex h-full flex-col items-center justify-center rounded-medium bg-gradient-to-r from-[#73ABC2]/30 to-primary-500/30 py-14 text-center md:pb-20 md:pt-14 2xl:pb-32 2xl:pt-24">
        <div>
          {isOverDropZone ? (
            <>
              <Image
                removeWrapper
                className="h-44 w-44 2xl:h-56 2xl:w-56"
                src="/star-white.svg"
                alt="white star"
                radius="none"
              />
              <p className="mt-10 text-mega font-medium text-white 2xl:mt-20">Drop</p>
            </>
          ) : (
            <>
              <p className="mb-7 text-xxlarge font-medium md:hidden">Add a file</p>

              <div className="hidden flex-col items-center justify-center font-medium md:flex">
                <Image
                  removeWrapper
                  className="h-16 w-16 2xl:h-24 2xl:w-24"
                  src="/star.svg"
                  alt="Star"
                  radius="none"
                />
                <p className="mt-5 text-xxlarge leading-9 2xl:text-mega">Drag and Drop</p>
                <p className="my-5 text-xlarge 2xl:my-7">or</p>
              </div>

              <BVButton size="lg" onClick={openFileDialog}>
                Browse file
              </BVButton>
            </>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept="image/jpeg,image/png"
        />
      </div>
    </div>
  )
}

export default ImageUploadDragDrop
