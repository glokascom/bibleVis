'use client'

import { useEffect, useMemo, useState } from 'react'

import { notFound, useRouter, useSearchParams } from 'next/navigation'

import { Button, Image } from '@nextui-org/react'

import Gallery from '@/app/(web)/[@username]/components/Gallery'
import BVButton from '@/app/components/BVButton'
import BVDropdown from '@/app/components/BVDropdown'
import { Chevron } from '@/app/components/Chevron'

export default function SearchPage({
  searchQuery = null,
  counters = null,
  isAuthenticated = false,
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeButton, setActiveButton] = useState(searchParams.get('filter') || 'All')

  const [key, setKey] = useState(0)
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  const buttonData = useMemo(() => {
    const safeCounters = counters || { total: 0, aiGenerated: 0, humanMade: 0 }
    return [
      { name: 'All', result: safeCounters.total.toString() },
      { name: 'AI Generated', result: safeCounters.aiGenerated.toString() },
      { name: 'Made by human', result: safeCounters.humanMade.toString() },
    ]
  }, [counters])

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [searchParams])

  if (!searchQuery) {
    notFound()
  }

  const orientationItems = ['All Orientations', 'Horizontal', 'Vertical']
  const popularityItems = ['New', 'Old', 'Popular']

  const orientationMap = {
    0: 'all',
    1: 'landscape',
    2: 'portrait',
  }

  const sortMap = {
    0: 'newest',
    1: 'oldest',
    2: 'popularity',
  }

  const handleSortChange = (newSortDirection) => {
    const sortText = sortMap[newSortDirection] || 'newest'
    updateUrlParams({ sort: sortText })
  }

  const handleOrientationChange = (newOrientation) => {
    const orientationText = orientationMap[newOrientation] || 'all'
    updateUrlParams({
      orientation: orientationText,
    })
  }

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
    updateUrlParams({ filter: buttonName })
  }

  const updateUrlParams = (params) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.keys(params).forEach((key) => {
      if (params[key] === null || params[key] === undefined) {
        newParams.delete(key)
      } else {
        newParams.set(key, params[key])
      }
    })
    router.push(`/s/${searchQuery}?${newParams.toString()}`)
  }

  const getButtonStyle = (buttonName) => {
    return buttonName === activeButton
      ? 'shrink-0'
      : 'shrink-0 bg-secondary-50 text-inherit'
  }

  return (
    <div className="mx-auto w-full max-w-[1806px] px-6 pt-14 md:px-12 md:pt-24">
      <h1 className="mb-10 text-5xl font-medium">Free {searchQuery} Images</h1>

      <div className="-mx-6 mb-5 flex overflow-x-auto scrollbar-hide md:mx-0 md:items-center md:justify-between">
        <div className="flex h-12 gap-2.5 whitespace-nowrap px-6 md:px-0">
          {buttonData.map((button) => (
            <BVButton
              key={button.name}
              className={getButtonStyle(button.name)}
              color="secondary"
              onClick={() => handleButtonClick(button.name)}
            >
              {button.name}
              <span
                className={`${activeButton === button.name ? 'font-medium' : ''} text-secondary-400`}
              >
                {button.result}
              </span>
            </BVButton>
          ))}
        </div>

        <div className="hidden px-6 md:block md:px-0">
          <Button
            onClick={() => setIsOpenFilters(!isOpenFilters)}
            startContent={<Image src={'/filter.svg'} alt="filter" radius="none" />}
            endContent={
              <Chevron
                className={`transition-transform ${isOpenFilters ? 'rotate-180' : ''}`}
              />
            }
            className="border bg-background py-6 text-medium font-semibold md:flex md:justify-between md:p-7"
          >
            Filters
          </Button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpenFilters ? 'md:max-h-16 md:opacity-100' : 'md:max-h-0 md:opacity-0'
        }`}
      >
        <div className="flex gap-5">
          <BVDropdown
            items={orientationItems}
            useCustomWidth={true}
            onAction={handleOrientationChange}
          />
          <BVDropdown
            items={popularityItems}
            useCustomWidth={true}
            onAction={handleSortChange}
          />
        </div>
      </div>

      <div className="mt-10">
        <Gallery
          key={key}
          isAuthenticated={isAuthenticated}
          isShowHeader={false}
          searchQuery={`${searchQuery}?${searchParams}`}
          backUrl={`/s/${searchQuery}`}
        />
      </div>
    </div>
  )
}
