import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type GalleryContextType = {
  images: string[]
  setImages: (newImages: string[]) => void
  currentIndex: number
  setCurrentIndex: (index: number) => void
  basePageUrl: string
  setBasePageUrl: (url: string) => void
  searchParams: URLSearchParams | null
  setSearchParams: (params: URLSearchParams) => void
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

  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null)

  const value = useMemo(
    () => ({
      images,
      setImages,
      currentIndex,
      setCurrentIndex,
      basePageUrl,
      setBasePageUrl,
      searchParams,
      setSearchParams,
    }),
    [images, currentIndex, basePageUrl, searchParams]
  )

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
}
