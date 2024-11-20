'use client'

import { useEffect, useState } from 'react'

import { notFound } from 'next/navigation'

import Gallery from '@/app/(web)/[@username]/components/Gallery'
import TopBar from '@/app/components/TopBar'
import { useUrlParams } from '@/app/utils/updateUrlParams'

export default function SearchPage({
  searchQuery = null,
  counters = null,
  isAuthenticated = false,
}) {
  const { searchParams } = useUrlParams(`/s/${searchQuery}`)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [searchParams])

  if (!searchQuery) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-[1806px] px-6 pt-14 md:px-12 md:pt-24">
      <h1 className="mb-10 text-5xl font-medium">Free {searchQuery} Images</h1>
      <TopBar counters={counters} basePath={`/s/${searchQuery}`} />

      <Gallery
        key={key}
        isAuthenticated={isAuthenticated}
        isShowHeader={false}
        searchQuery={`${searchQuery}?${searchParams}`}
        backUrl={`/s/${searchQuery}`}
      />
    </div>
  )
}
