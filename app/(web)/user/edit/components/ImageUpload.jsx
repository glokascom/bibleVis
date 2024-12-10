import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'
import { Modal } from '@/app/components/Modal'

import { uploadImage } from '../actions/uploadImage'
import ImageRedactor from './ImageRedactor'

function ImageUpload({
  label,
  buttonLabel,
  isAvatar = false,
  recomendedWidth,
  recomendedHeight,
  previewSize = { width: 100, height: 100 },
  userInfo,
}) {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [parentWidth, setParentWidth] = useState(0)
  const [isShowModal, setIsShowModal] = useState(false)
  const [base64, setBase64] = useState('')
  const [croppedImage, setCroppedImage] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
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

    if (!isValidFile(file)) {
      setIsLoading(false)
      return
    }

    await loadFileAsBase64(file)
    setIsShowModal(true)

    e.target.value = ''
  }

  const isValidFile = (file) => {
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxFileSizeMB = 4

    if (!validImageTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an image.')
      return false
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`Max file size is ${maxFileSizeMB}MB`)
      return false
    }

    return true
  }

  const loadFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        setBase64(reader.result)
        resolve()
      }
      reader.onerror = (error) => {
        setError('Failed to read file.')
        reject(error)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = async () => {
    if (!croppedImage) return

    try {
      const blob = await fetchBlobFromUrl(croppedImage)
      await uploadCroppedImage(blob)
    } catch (error) {
      console.error('Error uploading cropped image:', error)
      setError('Failed to upload cropped image.')
    }
  }

  const fetchBlobFromUrl = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`)
    }
    return await response.blob()
  }

  const uploadCroppedImage = async (blob) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append(isAvatar ? 'avatar' : 'cover', blob)

      const { error } = await uploadImage(formData)
      if (error) {
        throw new Error(error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleImageUpload()
  }, [croppedImage])

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
        {recomendedWidth && recomendedHeight && (
          <div className="text-center text-small">
            Recommended size: {recomendedWidth} x {recomendedHeight} pixels
          </div>
        )}
        {error && <div className="text-center text-danger-500">{error}</div>}
      </div>
      {isShowModal && (
        <Modal isCloseButton={false}>
          <ImageRedactor
            image={base64}
            setCroppedImage={setCroppedImage}
            setIsShowModal={setIsShowModal}
            buttonLabel={buttonLabel}
          />
        </Modal>
      )}
    </div>
  )
}

export default ImageUpload
