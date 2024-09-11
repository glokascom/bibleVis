'use client'

import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'

function Download() {
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const buttonGroupRef = useRef(null)

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

  return (
    <div>
      <ButtonGroup radius="full" fullWidth ref={buttonGroupRef}>
        <Button
          className="h-14 w-4/5 justify-start bg-primary pl-12 text-medium font-semibold text-white"
          onClick={() => alert('original')}
        >
          <Image src="/download.svg" alt="Download" width={24} height={24} priority />
          <p>Download</p>
        </Button>
        <Dropdown
          placement="bottom-end"
          className="bg-secondary-50"
          classNames={{
            content: 'shadow-none p-0',
          }}
        >
          <DropdownTrigger>
            <Button isIconOnly className="h-14 w-1/5 border-l bg-primary">
              <Image src="/chevron.svg" alt="chevron" width={15} height={15} priority />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="download options"
            variant="light"
            color="primary"
            onAction={(key) => alert(key)}
            style={{ width: `${dropdownWidth}px`, maxWidth: '100%' }}
            classNames={{ list: 'divide-y-1 divide-secondary-100', base: 'px-5 py-2.5' }}
            itemClasses={{
              title: 'font-medium text-medium',
              base: 'px-0 py-2.5 rounded-none',
            }}
          >
            <DropdownItem key="small">Small 720 x 480</DropdownItem>
            <DropdownItem key="medium">Medium 1920 x 1080</DropdownItem>
            <DropdownItem key="original">Original 7952 x 5304</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>

      <div className="mt-5 flex items-start gap-2.5">
        <Image src="/circle.svg" alt="circle" width={18} height={18} priority />
        <p className="text-small text-secondary-400">
          Free for use under the <span className="font-bold">BibleVis</span>{' '}
          <Link href="/pages/license" className="font-bold underline hover:opacity-70">
            Content License
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Download
