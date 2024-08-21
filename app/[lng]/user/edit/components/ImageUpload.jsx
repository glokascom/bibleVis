'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

function ImageUpload({
  id,
  label,
  buttonLabel,
  requiredWidth,
  requiredHeight,
  defaultSrc,
  previewSize = { width: 100, height: 100 },
  isAvatar = false,
}) {
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(defaultSrc || null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setError(null)

    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.')
      return
    }

    const maxFileSizeMB = 2
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError('Max file size is ' + maxFileSizeMB + 'MB')
      return
    }

    const img = new window.Image()
    const objectUrl = URL.createObjectURL(file)
    img.src = objectUrl

    img.onload = () => {
      if (
        requiredWidth &&
        requiredHeight &&
        (img.width !== requiredWidth || img.height !== requiredHeight)
      ) {
        setError(`Image must be ${requiredWidth}x${requiredHeight} pixels.`)
        URL.revokeObjectURL(objectUrl)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        if (!reader.result) {
          setError('Something went wrong')
          return
        }
        setPreview(reader.result)
      }
      URL.revokeObjectURL(objectUrl)

      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

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
          />
        )}
        <label htmlFor={id}>
          <BVButton as="span">{buttonLabel}</BVButton>
        </label>
        <input
          id={id}
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
      </div>
    </div>
  )
}

export default ImageUpload
