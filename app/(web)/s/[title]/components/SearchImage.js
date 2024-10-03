'use client'

import { useEffect, useMemo, useState } from 'react'

import { Button, Image } from '@nextui-org/react'

import BVButton from '@/app/components/BVButton'
import BVDropdown from '@/app/components/BVDropdown'
import { Chevron } from '@/app/components/Chevron'

import Gallery from '../../../[@username]/components/Gallery'

export default function SearchPage({ searchQuery = null, counters = null }) {
  const [activeButton, setActiveButton] = useState('All')
  const [imageFilter, setImageFilter] = useState(null)
  const [key, setKey] = useState(0)
  const [orientation, setOrientation] = useState(0)
  const [sortDirection, setSortDirection] = useState(2)
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
  }, [activeButton, imageFilter, orientation, sortDirection])

  if (!searchQuery) {
    return <p className="text-danger-500">Invalid URL format</p>
  }

  const orientationItems = ['All Orientations', 'Horizontal', 'Vertical']
  const popularityItems = ['New', 'Old', 'Popular']

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)

    if (buttonName === 'AI Generated') {
      setImageFilter(true)
    } else if (buttonName === 'Made by human') {
      setImageFilter(false)
    } else {
      setImageFilter(null)
    }
  }

  const handleOrientationChange = (newOrientation) => {
    setOrientation(newOrientation === 'All Orientations' ? null : newOrientation)
  }

  const handleSortChange = (newSortDirection) => {
    setSortDirection(newSortDirection)
  }

  const getButtonStyle = (buttonName) => {
    return buttonName === activeButton
      ? 'shrink-0'
      : 'shrink-0 bg-secondary-50 text-inherit'
  }

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 pt-14 md:px-12 md:pt-24">
      <h1 className="mb-10 text-5xl font-medium">Free {searchQuery} Photos</h1>

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
            defaultSelectedKey={2}
            items={popularityItems}
            useCustomWidth={true}
            onAction={handleSortChange}
          />
        </div>
      </div>

      <div className="mt-10">
        <Gallery
          key={key}
          isShowHeader={false}
          searchQuery={searchQuery}
          imageFilter={imageFilter}
          orientationFilter={orientation}
          sortDirection={sortDirection}
        />
      </div>
    </main>
  )
}
