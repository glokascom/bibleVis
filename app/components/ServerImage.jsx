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
      className="h-auto w-full rounded-medium object-contain md:aspect-video md:bg-secondary-50 md:!bg-contain"
    />
  )
}

export default ServerImage
