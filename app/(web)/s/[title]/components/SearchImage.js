'use client'

import { useEffect, useState } from 'react'

import BVButton from '@/app/components/BVButton'
import BVDropdown from '@/app/components/BVDropdown'

import Gallery from '../../../[@username]/components/Gallery'

export default function SearchPage({ searchQuery = null, counters = null }) {
  const [activeButton, setActiveButton] = useState('All')
  const [imageFilter, setImageFilter] = useState(null)
  const [key, setKey] = useState(0)
  const [orientation, setOrientation] = useState(0)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [activeButton, imageFilter, orientation])

  if (!searchQuery) {
    return <p className="text-danger-500">Invalid URL format</p>
  }

  const buttonData = [
    { name: 'All', result: counters.total.toString() },
    { name: 'AI Generated', result: counters.aiGenerated.toString() },
    { name: 'Made by human', result: counters.humanMade.toString() },
  ]

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

        <div className="hidden w-full px-6 md:block md:w-auto md:min-w-52 md:px-0">
          <BVDropdown items={orientationItems} onAction={handleOrientationChange} />
        </div>
      </div>

      <div className="mb-5 md:hidden">
        <BVDropdown
          items={orientationItems}
          useCustomWidth={true}
          onAction={handleOrientationChange}
        />
      </div>

      <BVDropdown defaultSelectedKey={2} items={popularityItems} useCustomWidth={true} />

      <div className="mt-10">
        <Gallery
          key={key}
          isShowHeader={false}
          searchQuery={searchQuery}
          imageFilter={imageFilter}
          orientationFilter={orientation}
        />
      </div>
    </main>
  )
}
