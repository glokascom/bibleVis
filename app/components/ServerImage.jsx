import Image from 'next/image'

function ServerImage({ image }) {
  return (
    <Image
      src={image.imagePath}
      alt={image.title}
      blurDataURL={`data:image/jpeg;base64,${image.preview}`}
      placeholder="blur"
      width={image.file_sizes.original.width}
      height={image.file_sizes.original.height}
      className="aspect-video h-auto w-full rounded-medium bg-secondary-50 !bg-contain object-contain"
    />
  )
}

export default ServerImage
