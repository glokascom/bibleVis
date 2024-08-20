'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { BVButton } from '@/app/components/BVButton'

function CoverUpload() {
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)
  const requiredWidth = 1282
  const requiredHeight = 400
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
    img.src = URL.createObjectURL(file)

    img.onload = async () => {
      console.log(img.width, img.height)
      if (img.width !== requiredWidth || img.height !== requiredHeight) {
        setError(
          `Изображение должно быть размером ${requiredWidth}x${requiredHeight} пикселей.`
        )
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
      <div className="mb-2.5 font-bold">Cover image</div>
      <div className="flex flex-col items-center gap-5 rounded-small bg-secondary-100 px-6 py-7">
        <Image src={preview || '/cover.svg'} alt="cover" width={328} height={109} />
        <label htmlFor="cover-upload">
          <BVButton as="span">Upload new cover image</BVButton>
        </label>
        <input
          id="cover-upload"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div className="text-small">1282 x 400+</div>
      </div>
    </div>
  )
}

export default CoverUpload
