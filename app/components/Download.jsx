import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'

function Download() {
  const [selectedOption, setSelectedOption] = useState(new Set(['original']))
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
    <ButtonGroup radius="full" fullWidth ref={buttonGroupRef}>
      <Button className="h-14 w-4/5 justify-start bg-primary pl-12 text-medium font-semibold text-white">
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
            <Image src="/chevron.svg" alt="Download" width={15} height={15} priority />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="download options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          style={{ width: `${dropdownWidth}px`, maxWidth: '100%' }}
          color="primary"
          variant="light"
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
  )
}

export default Download
