import { useState } from 'react'

import Cropper from 'react-easy-crop'

import BVButton from '@/app/components/BVButton'

import getCroppedImg from './CropImage'

function ImageRedactor({ imageURL }) {
  const [cropRectabgle, setCropRectabgle] = useState({ x: 0, y: 0 })
  const [zoomRectabgle, setZoomRectabgle] = useState(1)
  const [croppedAreaPixelsRectangle, setCroppedAreaPixelsRectangle] = useState(null)
  const [croppedImageRectangle, setCroppedImageRectangle] = useState(null)
  console.log('🚀 ~ ImageRedactor ~ croppedImageRectangle:', croppedImageRectangle)

  const onCropCompleteRectangle = (croppedArea, croppedImageRectangle) => {
    setCroppedAreaPixelsRectangle(croppedImageRectangle)
  }

  const showCroppedImageRectangle = async () => {
    try {
      const croppedImage = await getCroppedImg(img1, croppedAreaPixelsRectangle)
      console.log('donee', { croppedImage })
      setCroppedImageRectangle(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex h-96 w-96 flex-col items-center">
      <div className="flex flex-col items-center">
        <Cropper
          image={imageURL}
          crop={cropRectabgle}
          zoom={zoomRectabgle}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCropRectabgle}
          onCropComplete={onCropCompleteRectangle}
          onZoomChange={setZoomRectabgle}
        />
      </div>
      <BVButton className="" onClick={showCroppedImageRectangle}>
        Show Result
      </BVButton>
    </div>
  )
}

export default ImageRedactor
