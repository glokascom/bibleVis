import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

import Social from './Social'

function Explore() {
  return (
    <Dropdown
      placement="bottom-end"
      className="bg-secondary-50"
      classNames={{
        content: 'py-1 px-2 shadow-none mt-4',
      }}
    >
      <DropdownTrigger>
        <div className="flex cursor-pointer items-center gap-1">
          <span className="mr-2 py-3 text-base font-semibold">Explore</span>
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.25L5.5 5.75L10 1.25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Explore"
        variant="light"
        as="div"
        color="primary"
        itemClasses={{
          title: 'font-[600] text-medium',
          base: 'py-2.5',
        }}
      >
        <DropdownItem key="about_b_V" href="/pages/about" showDivider>
          About BibleVis
        </DropdownItem>
        <DropdownItem key="privacy_policy" href="/pages/privacy" showDivider>
          Privacy Policy
        </DropdownItem>
        <DropdownItem key="terms_of_use" href="/pages/tos" showDivider>
          Terms of Use
        </DropdownItem>
        <DropdownItem key="social" textValue="social">
          <Social />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Explore
