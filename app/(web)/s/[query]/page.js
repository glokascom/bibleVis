'use client'

import { useState } from 'react'

import { useParams } from 'next/navigation'

import { Button, Image } from '@nextui-org/react'

import BVButton from '@/app/components/BVButton'
import BVDropdown from '@/app/components/BVDropdown'
import { Chevron } from '@/app/components/Chevron'

import Gallery from '../../[@username]/components/Gallery'

export default function SearchPage() {
  const { query } = useParams()
  const decodedTitle = query ? decodeURIComponent(query) : null

  const [activeButton, setActiveButton] = useState('AI Generated')
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  if (!decodedTitle) {
    return <p className="text-danger-500">Invalid URL format</p>
  }

  const buttonData = [
    { name: 'All', result: '1.2K' },
    { name: 'AI Generated', result: '1.2K' },
    { name: 'Made by human', result: '1.2K' },
  ]

  const orientationItems = ['All Orientations', 'Horizontal', 'Vertical']
  const popularityItems = ['New', 'Old', 'Popular']

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
  }

  const getButtonStyle = (buttonName) => {
    return buttonName === activeButton
      ? 'shrink-0'
      : 'shrink-0 bg-secondary-50 text-inherit'
  }

  return (
    <main className="mx-auto w-full max-w-[1806px] flex-auto px-6 pt-14 md:px-12 md:pt-24">
      <h1 className="mb-10 text-5xl font-medium">Free {decodedTitle} Photos</h1>

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
          <BVDropdown items={orientationItems} useCustomWidth={true} />
          <BVDropdown
            defaultSelectedKey={2}
            items={popularityItems}
            useCustomWidth={true}
          />
        </div>
      </div>

      <div className="mt-10">
        <Gallery
          isShowHeader={false}
          searchQuery={decodedTitle}
          backUrl={`/s/${query}`}
        />
      </div>
    </main>
  )
}
