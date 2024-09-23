'use client'

import { useEffect, useRef, useState } from 'react'

import { useParams } from 'next/navigation'

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'

import BVButton from '@/app/components/BVButton'
import { Chevron } from '@/app/components/Chevron'

export default function SearchPage() {
  const buttonGroupRef = useRef(null)
  const [dropdownWidth, setDropdownWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (buttonGroupRef.current) {
        setDropdownWidth(buttonGroupRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const { title } = useParams()
  const decodedTitle = title ? decodeURIComponent(title) : null

  if (!decodedTitle) {
    return <p className="text-danger-500">Invalid URL format</p>
  }

  const allResult = '1.2K'
  const aIGeneratedResult = '1.2K'
  const madeByHumanResult = '1.2K'

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 pt-14 md:px-12 md:pt-24">
      <div>
        <h1 className="mb-10 text-5xl font-medium">Free {decodedTitle} Photos</h1>

        <div className="-mx-6 mb-5 flex overflow-x-auto scrollbar-hide md:mx-0">
          <div className="flex gap-2.5 whitespace-nowrap px-6 md:px-0">
            <BVButton className="shrink-0 bg-secondary-50 text-inherit" color="secondary">
              All <span className="font-medium text-secondary-400">{allResult}</span>
            </BVButton>
            <BVButton className="shrink-0" color="secondary">
              AI Generated
              <span className="text-secondary-400">{aIGeneratedResult}</span>
            </BVButton>
            <BVButton className="shrink-0 bg-secondary-50 text-inherit" color="secondary">
              Made by human
              <span className="text-secondary-400">{madeByHumanResult}</span>
            </BVButton>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <ButtonGroup fullWidth ref={buttonGroupRef}>
            <Button className="h-14 w-4/5 justify-start border border-r-0 bg-background pl-12 text-medium font-semibold">
              <p>Orientations</p>
            </Button>
            <Dropdown
              placement="bottom-end"
              className="bg-secondary-50"
              classNames={{
                content: 'shadow-none p-0',
                trigger:
                  'data-[pressed=true]:scale-100 aria-expanded:scale-100 aria-expanded:opacity-1',
              }}
            >
              <DropdownTrigger>
                <Button isIconOnly className="h-14 w-1/5 border border-l-0 bg-background">
                  <Chevron />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="download options"
                variant="light"
                color="primary"
                onAction={() => {}}
                style={{ width: `${dropdownWidth}px`, maxWidth: '100%' }}
                classNames={{
                  list: 'divide-y-1 divide-secondary-100',
                  base: 'px-5 py-2.5',
                }}
                itemClasses={{
                  title: 'font-medium text-medium',
                  base: 'px-0 py-2.5 rounded-none',
                }}
              >
                <DropdownItem key={1}>All Orientations</DropdownItem>
                <DropdownItem key={2}>Horizontal</DropdownItem>
                <DropdownItem key={3}>Vertical</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
          <ButtonGroup fullWidth ref={buttonGroupRef}>
            <Button className="h-14 w-4/5 justify-start border border-r-0 bg-background pl-12 text-medium font-semibold">
              <p>Popular</p>
            </Button>
            <Dropdown
              placement="bottom-end"
              className="bg-secondary-50"
              classNames={{
                content: 'shadow-none p-0',
                trigger:
                  'data-[pressed=true]:scale-100 aria-expanded:scale-100 aria-expanded:opacity-1',
              }}
            >
              <DropdownTrigger>
                <Button isIconOnly className="h-14 w-1/5 border border-l-0 bg-background">
                  <Chevron />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="download options"
                variant="light"
                color="primary"
                onAction={() => {}}
                style={{ width: `${dropdownWidth}px`, maxWidth: '100%' }}
                classNames={{
                  list: 'divide-y-1 divide-secondary-100',
                  base: 'px-5 py-2.5',
                }}
                itemClasses={{
                  title: 'font-medium text-medium',
                  base: 'px-0 py-2.5 rounded-none',
                }}
              >
                <DropdownItem key={1}>New</DropdownItem>
                <DropdownItem key={2}>Old</DropdownItem>
                <DropdownItem key={3}>Popular</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>
    </main>
  )
}
