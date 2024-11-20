'use client'

import { useEffect, useState } from 'react'

import Gallery from '@/app/(web)/[@username]/components/Gallery'
import TopBar from '@/app/components/TopBar'
import { useUrlParams } from '@/app/utils/updateUrlParams'

import { getFavoriteImages } from '../actions/getFavoriteImages'

export default function FavoritesGallery({ isAuthenticated, counters }) {
  const { searchParams } = useUrlParams('/user/favorites')
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [searchParams])

  const loadFavorites = async (page) => {
    try {
      const filter = searchParams.get('filter')
      const orientation = searchParams.get('orientation')
      const sort = searchParams.get('sort')

      return await getFavoriteImages(page, 15, filter, orientation, sort)
    } catch (err) {
      console.error('Error in loadFavorites:', err)
      return { images: [], totalCount: 0 }
    }
  }

  return (
    <>
      <TopBar counters={counters} basePath="/user/favorites" />

      <Gallery
        key={key}
        isAuthenticated={isAuthenticated}
        isShowHeader={false}
        backUrl="/user/favorites"
        loadFavoriteImages={loadFavorites}
      />
    </>
  )
}
