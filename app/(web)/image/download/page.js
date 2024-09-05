//TODO: delete on release. This is just for testing
'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

const customLoader = ({ src }) => src

const src = '4686d99d-32f7-4fe7-8df1-aa7bce0b5079/images/image_2024-08-30-142238.jpg'

async function requestProcessedImage(src, width) {
  const response = await fetch('/api/process-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: src,
      width: width,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to process image at width ${width}`)
  }

  const blob = await response.blob()
  return URL.createObjectURL(blob)
}

export default function ImagesPage() {
  const [imageWidths] = useState([720, 1920])
  const [imageUrls, setImageUrls] = useState({})

  useEffect(() => {
    async function processImages() {
      try {
        const urls = {}
        for (const width of imageWidths) {
          const processedImageUrl = await requestProcessedImage(src, width)
          urls[width] = processedImageUrl
        }
        setImageUrls(urls)
      } catch (error) {
        console.error('Error processing images:', error.message)
      }
    }

    processImages()
  }, [imageWidths])

  return (
    <div className="flex flex-wrap gap-5 p-5">
      {imageWidths.map((width) => (
        <Image
          key={width}
          loader={customLoader}
          src={imageUrls[width]}
          alt={`Image at width ${width}`}
          width={width}
          height={(width * 1400) / 1640}
          className="rounded-lg shadow-md"
        />
      ))}
    </div>
  )
}
