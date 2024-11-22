'use client'

import { useEffect, useRef, useState } from 'react'

import Gallery from '@/app/(web)/[@username]/components/Gallery'
import TopBar from '@/app/components/TopBar'
import { useUrlParams } from '@/app/utils/updateUrlParams'

import { getFavoriteImages } from '../actions/getFavoriteImages'

export default function FavoritesGallery({ counters }) {
  const { searchParams } = useUrlParams('/user/favorites')
  const [key, setKey] = useState(0)
  const isMounted = useRef(true)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [searchParams])

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const loadFavorites = async (page) => {
    try {
      const filter = searchParams.get('filter')
      const orientation = searchParams.get('orientation')
      const sort = searchParams.get('sort')

      const result = await getFavoriteImages(page, 15, filter, orientation, sort)

      if (isMounted.current) {
        return result
      }

      return { images: [], totalCount: 0 }
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
        isAuthenticated={true}
        isShowHeader={false}
        backUrl="/user/favorites"
        loadFavoriteImages={loadFavorites}
      />
    </>
  )
}
