import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

import { uploadImage } from '../actions/uploadImage'

function ImageUpload({
  label,
  buttonLabel,
  isAvatar = false,
  requiredWidth,
  requiredHeight,
  previewSize = { width: 100, height: 100 },
  userInfo,
}) {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [parentWidth, setParentWidth] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setParentWidth(entry.contentRect.width)
      }
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const getButtonText = () => {
    if (parentWidth < 200) return 'Upload'
    if (parentWidth < 280) return 'Upload Image'
    return buttonLabel
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setError(null)
    setIsLoading(true)

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!validImageTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an image.')
      setIsLoading(false)
      return
    }

    const maxFileSizeMB = 2
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`Max file size is ${maxFileSizeMB}MB`)
      setIsLoading(false)
      return
    }

    const img = new window.Image()
    const objectUrl = URL.createObjectURL(file)
    img.src = objectUrl

    img.onload = async () => {
      if (
        requiredWidth &&
        requiredHeight &&
        (img.width !== requiredWidth || img.height !== requiredHeight)
      ) {
        setError(`Image must be ${requiredWidth} x ${requiredHeight} pixels.`)
        URL.revokeObjectURL(objectUrl)
        setIsLoading(false)
        return
      }

      try {
        const formData = new FormData()
        formData.append(isAvatar ? 'avatar' : 'cover', file)

        const { error } = await uploadImage(formData)
        if (error) {
          throw new Error(error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
        URL.revokeObjectURL(objectUrl)
      }
    }

    img.onerror = () => {
      setError('Failed to load image.')
      setIsLoading(false)
      URL.revokeObjectURL(objectUrl)
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-2.5 font-bold">{label}</div>
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-5 rounded-small bg-secondary-50 px-4 py-7"
      >
        {isAvatar ? (
          <BVAvatar size="xxl" src={userInfo.avatarUrl} />
        ) : (
          <div className="w-full max-w-xs">
            <Image
              src={userInfo.coverUrl}
              alt="preview"
              width={previewSize.width}
              height={previewSize.height}
              layout="responsive"
              sizes="(max-width: 640px) 100vw, 50vw"
              className="rounded-medium"
            />
          </div>
        )}
        <label className="w-full max-w-xs">
          <BVButton as="span" isLoading={isLoading} className="w-full justify-center">
            {getButtonText()}
          </BVButton>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={isLoading}
          />
        </label>
        {requiredWidth && requiredHeight && (
          <div className="text-center text-small">
            {requiredWidth} x {requiredHeight} pixels
          </div>
        )}
        {error && <div className="text-center text-danger-500">{error}</div>}
      </div>
    </div>
  )
}

export default ImageUpload
