export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  flip = { horizontal: false, vertical: false }
) {
  if (!imageSrc) {
    return null
  }

  let image

  try {
    image = await createImage(imageSrc)
  } catch (error) {
    console.error(`Failed to create image: ${error.message}`)
    return null
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  canvas.width = image.width
  canvas.height = image.height

  ctx.translate(image.width / 2, image.height / 2)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  let croppedCtx

  try {
    croppedCtx = croppedCanvas.getContext('2d')
  } catch (error) {
    console.error(`Error: Unable to get cropped canvas context: ${error.message}`)
    return null
  }

  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        const objectURL = URL.createObjectURL(file)
        resolve({
          objectURL,
          revoke: () => URL.revokeObjectURL(objectURL),
        })
      } else {
        resolve(null)
      }
    }, 'image/jpeg')
  })
}
