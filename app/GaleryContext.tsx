import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type GalleryContextType = {
  images: string[]
  setImages: (newImages: string[]) => void
  currentIndex: number
  setCurrentIndex: (index: number) => void
  basePageUrl: string
  setBasePageUrl: (url: string) => void
}
const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

export const useGallery = () => {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
}

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const [basePageUrl, setBasePageUrl] = useState('/')

  const value = useMemo(
    () => ({
      images,
      setImages,
      currentIndex,
      setCurrentIndex,
      basePageUrl,
      setBasePageUrl,
    }),
    [images, setImages, currentIndex, setCurrentIndex, basePageUrl, setBasePageUrl]
  )

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
}
