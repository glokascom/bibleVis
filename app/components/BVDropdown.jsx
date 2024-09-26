import { useEffect, useMemo, useRef, useState } from 'react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react'

import { Chevron } from './Chevron'

const BVDropdown = ({
  defaultSelectedKey = 0,
  items,
  onAction = () => {},
  useCustomWidth = false,
}) => {
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([defaultSelectedKey.toString()])
  )
  const buttonRef = useRef(null)

  useEffect(() => {
    const updateWidthAndScreenSize = () => {
      if (buttonRef.current) {
        setDropdownWidth(buttonRef.current.offsetWidth)
      }
      setIsSmallScreen(window.innerWidth < 768)
    }

    updateWidthAndScreenSize()
    window.addEventListener('resize', updateWidthAndScreenSize)
    return () => window.removeEventListener('resize', updateWidthAndScreenSize)
  }, [])

  const shouldUseCustomWidth = useCustomWidth || isSmallScreen

  const selectedValue = useMemo(() => {
    const selectedIndex = Array.from(selectedKeys)[0]
    return items[parseInt(selectedIndex)]
  }, [selectedKeys, items])

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys)
    const selectedIndex = Array.from(keys)[0]
    onAction(parseInt(selectedIndex))
  }

  return (
    <Dropdown
      className="bg-secondary-50"
      classNames={{
        content: 'shadow-none p-0',
        trigger:
          'data-[pressed=true]:scale-100 aria-expanded:scale-100 aria-expanded:opacity-1',
      }}
    >
      <DropdownTrigger>
        <Button
          ref={buttonRef}
          className="w-full border bg-background py-6 text-medium font-semibold md:flex md:justify-between md:p-7"
        >
          <p>{selectedValue}</p> <Chevron />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown options"
        variant="light"
        color="primary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        style={
          shouldUseCustomWidth ? { width: `${dropdownWidth}px`, maxWidth: '100%' } : {}
        }
        classNames={{
          list: 'divide-y-1 divide-secondary-100',
          base: 'px-5 py-2.5',
        }}
        itemClasses={{
          title: 'font-medium text-medium',
          base: 'px-0 py-2.5 rounded-none',
          selectedIcon: 'hidden',
        }}
      >
        {items.map((item, index) => (
          <DropdownItem
            endContent={
              selectedKeys.has(index.toString()) ? (
                <Image alt="check mark" src="/check-mark.svg" />
              ) : null
            }
            key={index}
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default BVDropdown
