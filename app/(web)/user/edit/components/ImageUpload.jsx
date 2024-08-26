import { useEffect, useState } from 'react'

import Image from 'next/image'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

import { generateUniqueId } from '../actions/generateUniqueId'

function ImageUpload({
  id,
  label,
  buttonLabel,
  userId,
  isAvatar = false,
  requiredWidth,
  requiredHeight,
  previewSize = { width: 100, height: 100 },
  defaultSrc = null,
}) {
  const inputId = id || generateUniqueId('upload')
  const [preview, setPreview] = useState(defaultSrc || null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (defaultSrc) {
      setPreview(defaultSrc)
    }
  }, [defaultSrc])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setError(null)

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!validImageTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an image.')
      return
    }

    const maxFileSizeMB = 2
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`Max file size is ${maxFileSizeMB}MB`)
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
        setError(`Image must be ${requiredWidth}x${requiredHeight} pixels.`)
        URL.revokeObjectURL(objectUrl)
        return
      }

      try {
        const formData = new FormData()
        formData.append('uuid', userId)
        formData.append(isAvatar ? 'avatar' : 'cover', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const result = await response.json()
          throw new Error(result.error || 'Failed to upload image.')
        }

        await response.json()
      } catch (err) {
        setError(err.message)
        URL.revokeObjectURL(objectUrl)
      }
    }

    img.onerror = () => {
      setError('Failed to load image.')
      URL.revokeObjectURL(objectUrl)
    }
  }

  return (
    <div>
      <div className="mb-2.5 font-bold">{label}</div>
      <div className="flex flex-col items-center gap-5 rounded-small bg-secondary-50 px-4 py-7">
        {isAvatar ? (
          <BVAvatar size="xxl" src={preview} />
        ) : (
          <Image
            src={preview}
            alt="preview"
            width={previewSize.width}
            height={previewSize.height}
            layout="responsive"
            objectFit="contain"
            sizes="(max-width: 640px) 100vw, 50vw"
            className="rounded-medium"
          />
        )}
        <label htmlFor={inputId}>
          <BVButton as="span">{buttonLabel}</BVButton>
        </label>
        <input
          id={inputId}
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {requiredWidth && requiredHeight && (
          <div className="text-small">
            {requiredWidth} x {requiredHeight} px
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  )
}

export default ImageUpload