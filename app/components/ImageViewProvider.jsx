import { createContext, useContext, useState } from 'react'

const ImageViewContext = createContext()

export const useImageView = () => useContext(ImageViewContext)

export const ImageViewProvider = ({ children }) => {
  const [imageViews, setImageViews] = useState({})

  const incrementView = (imageId) => {
    setImageViews((prevViews) => ({
      ...prevViews,
      [imageId]: (prevViews[imageId] || 0) + 1,
    }))
  }

  const setViews = (imageId, viewsCount) => {
    setImageViews((prevViews) => ({
      ...prevViews,
      [imageId]: viewsCount,
    }))
  }

  return (
    <ImageViewContext.Provider
      value={{
        imageViews,
        incrementView,
        setViews,
      }}
    >
      {children}
    </ImageViewContext.Provider>
  )
}
