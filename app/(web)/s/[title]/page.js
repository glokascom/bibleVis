'use client'

import { useState } from 'react'

import { useParams } from 'next/navigation'

import BVButton from '@/app/components/BVButton'
import BVDropdown from '@/app/components/BVDropdown'

import Gallery from '../../[@username]/components/Gallery'

export default function SearchPage() {
  const { title } = useParams()
  const decodedTitle = title ? decodeURIComponent(title) : null

  const [activeButton, setActiveButton] = useState('AI Generated')

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
    <main className="mx-auto w-full max-w-[1806px] px-6 pt-14 md:px-12 md:pt-24">
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

        <div className="hidden w-full px-6 md:block md:w-auto md:min-w-52 md:px-0">
          <BVDropdown items={orientationItems} />
        </div>
      </div>

      <div className="mb-5 md:hidden">
        <BVDropdown items={orientationItems} useCustomWidth={true} />
      </div>
      <BVDropdown defaultSelectedKey={2} items={popularityItems} useCustomWidth={true} />

      <div className="mt-10">
        <Gallery isShowHeader={false} searchQuery={decodedTitle} />
      </div>
    </main>
  )
}
