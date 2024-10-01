import { useEffect, useRef, useState } from 'react'

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
      className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
        isOverDropZone ? 'border-0 p-0' : 'border border-dashed p-2.5 md:p-6 2xl:p-9'
      } rounded-medium shadow-small`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={`flex h-full flex-col items-center justify-center rounded-medium bg-gradient-to-r py-14 text-center ${isOverDropZone ? 'from-[#73ABC2]/50 to-primary-500/50 md:pb-14' : 'from-[#73ABC2]/30 to-primary-500/30 md:pb-20'} md:pt-14 2xl:pb-32 2xl:pt-24`}
      >
        <div
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 transform transition-all duration-300 ease-in-out ${isOverDropZone ? 'top-1/2 -translate-y-1/2' : 'top-20'}`}
        >
          <div className="relative h-24 w-24 2xl:h-32">
            <svg
              width="93"
              height="93"
              viewBox="0 0 93 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${isOverDropZone ? 'opacity-0' : 'opacity-100'} absolute inset-0 h-full w-full transition-opacity duration-300 ease-in-out`}
            >
              <path
                d="M46.5 0L51.169 41.831L93 46.5L51.169 51.169L46.5 93L41.831 51.169L0 46.5L41.831 41.831L46.5 0Z"
                fill="#01AB6C"
              />
            </svg>
            <svg
              width="226"
              height="226"
              viewBox="0 0 226 226"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 transform opacity-0 transition-opacity duration-300 ease-in-out ${isOverDropZone ? 'opacity-100' : ''}`}
            >
              <circle cx="113" cy="113" r="113" fill="white" fillOpacity="0.4" />
              <path
                d="M112.5 66L117.169 107.831L159 112.5L117.169 117.169L112.5 159L107.831 117.169L66 112.5L107.831 107.831L112.5 66Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div>
          {isOverDropZone ? (
            <>
              <p className="mt-72 text-mega font-medium text-white 2xl:mt-96">Drop</p>
            </>
          ) : (
            <>
              <p className="mb-7 text-xxlarge font-medium md:hidden">Add a file</p>

              <div className="group hidden flex-col items-center justify-center font-medium md:flex">
                <p className="mt-28 text-xxlarge leading-9 2xl:text-mega">
                  Drag and Drop
                </p>
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
