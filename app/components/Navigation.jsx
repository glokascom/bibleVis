'use client'

import { useState } from 'react'

import NextImage from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { Image } from '@nextui-org/image'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'

import { BVAvatar } from './BVAvatar'
import { BVButton } from './BVButton'
import { BVInput } from './BVInput'
import { BVLink } from './BVLink'

function formatSearchQuery(query) {
  if (!query) return ''
  return encodeURIComponent(query.replace(/\s+/g, '-'))
}

function Navigation({ user }) {
  const [search, setSearch] = useState('')
  const pathname = usePathname()
  const { push } = useRouter()
  const handleSearch = () => {
    if (!search.trim()) return
    push(`/s/${formatSearchQuery(search.trim())}`)
  }
  return (
    <Navbar
      isBordered
      maxWidth="full"
      classNames={{
        wrapper: 'mx-auto w-full max-w-[1806px] px-6 md:px-12',
        base: 'md:py-2',
      }}
    >
      <NavbarContent as="div">
        <NavbarBrand className="mr-0 h-[20px] w-[26px] grow-0 basis-7 md:h-[45px] md:w-[180px] md:basis-48 lg:mr-14">
          <Link href="/">
            <Image
              removeWrapper
              as={NextImage}
              height={45}
              width={180}
              src="/biblevis-logo.svg"
              alt="Biblevis Logo"
              priority
              className="hidden md:block"
              radius="none"
            />
            <Image
              removeWrapper
              as={NextImage}
              height={20}
              width={26}
              src="/biblevis-logo-small.svg"
              alt="Biblevis Logo"
              priority
              className="block md:hidden"
              radius="none"
            />
          </Link>
        </NavbarBrand>

        <NavbarContent className="flex-grow">
          <BVInput
            classNames={{
              base: 'max-w-[670px] w-full',
              input: 'text-small md:text-medium',
            }}
            placeholder="Search free Bible and Christian Images"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
            endContent={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 shrink-0 cursor-pointer py-3 pl-3 pr-4"
                onClick={handleSearch}
              >
                <path
                  d="M13.1465 11.5834H12.3236L12.0319 11.3021C13.2819 9.84379 13.9277 7.85421 13.5736 5.73962C13.084 2.84379 10.6673 0.531291 7.75065 0.177125C3.3444 -0.364542 -0.363932 3.34379 0.177735 7.75004C0.531902 10.6667 2.8444 13.0834 5.74024 13.573C7.85482 13.9271 9.8444 13.2813 11.3027 12.0313L11.584 12.323V13.1459L16.0111 17.573C16.4382 18 17.1361 18 17.5632 17.573C17.9902 17.1459 17.9902 16.448 17.5632 16.0209L13.1465 11.5834ZM6.89648 11.5834C4.30273 11.5834 2.20898 9.48962 2.20898 6.89587C2.20898 4.30212 4.30273 2.20837 6.89648 2.20837C9.49023 2.20837 11.584 4.30212 11.584 6.89587C11.584 9.48962 9.49023 11.5834 6.89648 11.5834Z"
                  fill="currentColor"
                />
              </svg>
            }
            type="search"
          />
        </NavbarContent>
        <div className="flex items-center gap-2">
          <NavbarItem className="mx-6 hidden md:block lg:mx-16">
            <BVLink href="/pages/license">License</BVLink>
          </NavbarItem>
          {user?.is_creator ? (
            <NavbarItem className="hidden lg:block">
              <BVButton as={Link} href="/user/upload" className="mr-2">
                Upload
              </BVButton>
            </NavbarItem>
          ) : (
            <></>
          )}
          {user ? (
            <Dropdown
              placement="bottom-end"
              className="bg-secondary-50"
              classNames={{
                content: 'py-1 px-2 shadow-none mt-4',
              }}
            >
              <DropdownTrigger>
                <div className="flex cursor-pointer items-center gap-1">
                  <BVAvatar
                    as="button"
                    className="transition-transform"
                    size="md"
                    src={user.avatarUrl}
                  />
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
                aria-label="Profile Actions"
                variant="light"
                as={`div`}
                color="primary"
                itemClasses={{
                  title: 'font-[600] text-medium',
                  base: 'py-2.5',
                }}
              >
                <DropdownItem key="my_profile" href={`/@${user.username}`} showDivider>
                  My Profile
                </DropdownItem>
                <DropdownItem key="account_settings" href="/user/edit" showDivider>
                  Account Settings
                </DropdownItem>
                {user?.is_creator ? (
                  <DropdownItem key="upload_image" href="/user/upload" showDivider>
                    Upload Image
                  </DropdownItem>
                ) : null}
                <DropdownItem
                  key="license"
                  href="/pages/license"
                  showDivider
                  className="block md:hidden"
                >
                  License
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  href={`/api/auth/logout?redirectedFrom=${pathname}`}
                  className="text-primary"
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem>
                <BVButton
                  as={Link}
                  href={`/login?redirectedFrom=${pathname}`}
                  className="hidden md:block"
                >
                  Log in
                </BVButton>
              </NavbarItem>
              <NavbarItem className="block md:hidden">
                <Dropdown
                  placement="bottom-end"
                  className="bg-secondary-50"
                  classNames={{
                    content: 'py-1 px-2 shadow-none mt-4',
                  }}
                >
                  <DropdownTrigger>
                    <svg
                      width="25"
                      height="15"
                      viewBox="0 0 25 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-9 cursor-pointer py-3 pl-3"
                    >
                      <rect
                        x="0.785156"
                        width="24"
                        height="3"
                        rx="1.5"
                        fill="currentColor"
                      />
                      <rect
                        x="0.785156"
                        y="6"
                        width="24"
                        height="3"
                        rx="1.5"
                        fill="currentColor"
                      />
                      <rect
                        x="0.785156"
                        y="12"
                        width="24"
                        height="3"
                        rx="1.5"
                        fill="currentColor"
                      />
                    </svg>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Menu"
                    variant="light"
                    as={`div`}
                    color="primary"
                    itemClasses={{
                      title: 'font-[600] text-medium',
                      base: 'py-2.5',
                    }}
                  >
                    <DropdownItem key="license" href="/pages/license" showDivider>
                      License
                    </DropdownItem>
                    <DropdownItem key="login" className="text-primary">
                      <Link href={`/login?redirectedFrom=${pathname}`}>Log in</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          )}
        </div>
      </NavbarContent>
    </Navbar>
  )
}

export default Navigation
