import { useState } from 'react'

import Cropper from 'react-easy-crop'

import BVButton from '@/app/components/BVButton'

import getCroppedImg from '../helper/сropImage'

function ImageRedactor({ image, setCroppedImage, setIsShowModal, type }) {
  const config = {
    avatar: {
      cropShape: 'round',
      aspect: 1,
      classes: 'h-[120vw] w-[90vw]  sm:h-[66vw] sm:w-[50vw] md:h-[73vh] md:w-[55vh]',
    },
    cover: {
      cropShape: 'rect',
      aspect: 3 / 1,
      classes: 'w-[90vw] h-[53vw]  sm:w-[66vw] sm:h-[39vw] md:w-[80vh] md:h-[47vh]',
    },
  }

  const currentConfig = config[type] || {}

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = (croppedArea, croppedImage) => {
    setCroppedAreaPixels(croppedImage)
  }

  const onCancel = () => {
    setIsShowModal(false)
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels)
      setCroppedImage(croppedImage)
      setIsShowModal(false)
    } catch (e) {
      console.error(e)
    }
  }

  const getClasses = () => {
    const baseClasses = 'relative flex flex-col items-center'
    const changingClasses = currentConfig.classes

    return `${baseClasses} ${changingClasses}`
  }

  return (
    <div className={getClasses()}>
      <div className="flex flex-col items-center">
        <Cropper
          image={image}
          aspect={currentConfig.aspect}
          cropShape={currentConfig.cropShape}
          crop={crop}
          zoom={zoom}
          objectFit="horizontal-cover"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{
            containerClassName: 'rounded-xl bg-foreground',
          }}
        />
      </div>
      <div className="absolute -bottom-20 flex gap-5">
        <BVButton color="secondary" onClick={onCancel}>
          Cancel
        </BVButton>
        <BVButton onClick={showCroppedImage}>Set an image</BVButton>
      </div>
    </div>
  )
}

export default ImageRedactor
