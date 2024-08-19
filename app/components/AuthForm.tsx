'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Button } from '@nextui-org/button'
import { Tab, Tabs } from '@nextui-org/tabs'

import { BVButton } from './BVButton'
import { BVInput } from './BVInput'

function AuthForm() {
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md">
        <div className="z-50 flex h-[90vh] w-[90vw] flex-row overflow-hidden rounded-medium">
          <div className="flex h-full w-full shrink-0 flex-col items-center bg-background p-5 md:w-[480px]">
            <Image
              className="mb-10"
              src="/biblevis-logo.svg"
              alt="biblevis logo"
              width={181}
              height={45}
            />
            <div className="flex w-full flex-col overflow-hidden">
              <Tabs
                variant="underlined"
                classNames={{
                  tabList:
                    'w-full flex-shrink-0 flex-grow-0 basis-auto p-0 px-6 shadow-[inset_0px_-1px_0px_0px_hsl(var(--nextui-secondary-100))]',
                  cursor: 'bg-primary h-px',
                  tab: 'pb-7 font-medium text-lg h-auto',
                  tabContent: 'text-secondary-200',
                  panel: 'shadow-none',
                  base: 'mx-5',
                }}
              >
                <Tab
                  key="sign-up"
                  title="Sign up"
                  className="flex-auto overflow-scroll px-5 pb-5"
                >
                  <Button
                    variant="bordered"
                    color="default"
                    size="lg"
                    className="relative mb-3 mt-7 h-14 border-1 hover:shadow-medium"
                    fullWidth
                    radius="full"
                  >
                    <Image
                      src="/google.svg"
                      alt="google"
                      width={23}
                      height={22}
                      className="absolute left-6 md:left-12"
                    />
                    Continue with Google
                  </Button>
                  <div className="divider my-5 flex items-center text-center before:mr-7 after:ml-7">
                    <span className="text-medium font-medium text-secondary">or</span>
                  </div>
                  <label htmlFor="username" className="mb-2 text-medium font-medium">
                    *Username
                  </label>
                  <BVInput
                    variant="bordered"
                    size="sm"
                    isRequired
                    errorMessage={'Username already exists'}
                    isInvalid={error}
                  />
                  <label htmlFor="email" className="mb-2 text-medium font-medium">
                    *Email
                  </label>
                  <BVInput
                    type="email"
                    variant="bordered"
                    size="sm"
                    isRequired
                    errorMessage={'Unsupported email format'}
                    isInvalid={error}
                  />
                  <label htmlFor="password" className="mb-2 text-medium font-medium">
                    *Password
                  </label>
                  <BVInput
                    variant="bordered"
                    size="sm"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <Image
                            src={'/eye-open.svg'}
                            alt="eye open"
                            width={18}
                            height={18}
                            className="mr-4 h-[38px] w-[38px] p-2"
                          />
                        ) : (
                          <Image
                            src={'/eye-close.svg'}
                            alt="eye close"
                            width={16}
                            height={16}
                            className="mr-4 h-9 w-9 p-2"
                          />
                        )}
                      </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                    isRequired
                  />
                  <p className="my-4 text-small text-secondary-200">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a target="_blank" href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a target="_blank" href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{' '}
                    apply.
                  </p>
                  <BVButton fullWidth onClick={() => setError(true)}>
                    Join
                  </BVButton>
                </Tab>
                <Tab key="log-in" title="Log in">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur.
                </Tab>
              </Tabs>
            </div>
          </div>
          <div
            className="hidden h-full w-full bg-cover bg-center md:block"
            style={{ backgroundImage: 'url(/ship.webp)' }}
          ></div>
        </div>
      </div>
    </>
  )
}

export default AuthForm
