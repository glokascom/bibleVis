'use client'

import { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@nextui-org/button'
import { Tab, Tabs } from '@nextui-org/tabs'

import { login, signup } from '../actions/actionsSupabase'
import { BVButton } from './BVButton'
import { BVInput } from './BVInput'
import { BVLink } from './BVLink'

function AuthForm() {
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState(false)
  const [emailLogin, setEmailLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const [emailSignup, setEmailSignup] = useState('')
  const [passwordSignup, setPasswordSignup] = useState('')
  const [usernameSignup, setUsernameSignup] = useState('')

  const { push } = useRouter()

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSignup = () => {
    signup(emailSignup, passwordSignup, usernameSignup)
      .then(() => push('/'))
      .catch(() => setError(true))
  }

  const handleLogin = () => {
    login(emailLogin, passwordLogin)
      .then(() => push('/'))
      .catch(() => setError(true))
  }
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md">
        <div className="z-50 flex h-[90vh] w-[90vw] flex-row overflow-hidden rounded-medium">
          <div className="flex h-full w-full shrink-0 flex-col items-center bg-background px-5 pb-0 pt-5 md:w-[480px]">
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
                  panel:
                    'shadow-none scroll-gutter flex-auto overflow-auto pb-10 pl-5 pr-3.5',
                  base: 'mx-5',
                }}
              >
                <Tab key="sign-up" title="Sign up">
                  <Button
                    variant="bordered"
                    color="default"
                    size="lg"
                    className="relative mb-2 mt-5 h-14 border-1 hover:shadow-medium"
                    fullWidth
                    radius="full"
                    onClick={() => push('/api/auth/google')}
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
                    value={usernameSignup}
                    onChange={(e) => setUsernameSignup(e.target.value)}
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
                    value={emailSignup}
                    onChange={(e) => setEmailSignup(e.target.value)}
                    isInvalid={error}
                  />
                  <label htmlFor="password" className="mb-2 text-medium font-medium">
                    *Password
                  </label>
                  <BVInput
                    variant="bordered"
                    size="sm"
                    value={passwordSignup}
                    onChange={(e) => setPasswordSignup(e.target.value)}
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
                  <p className="my-8 text-small text-secondary-200">
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
                  <BVButton fullWidth onClick={handleSignup}>
                    Join
                  </BVButton>
                </Tab>
                <Tab key="log-in" title="Log in">
                  <Button
                    variant="bordered"
                    color="default"
                    size="lg"
                    className="relative mb-2 mt-5 h-14 border-1 hover:shadow-medium"
                    fullWidth
                    radius="full"
                    onClick={() => push('/api/auth/google')}
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
                  <label htmlFor="email" className="mb-2 text-medium font-medium">
                    *Email
                  </label>
                  <BVInput
                    type="email"
                    variant="bordered"
                    size="sm"
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
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
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
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
                  <p className="my-8 text-small text-secondary-200">
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
                  <BVButton fullWidth onClick={handleLogin}>
                    Join
                  </BVButton>
                  <BVLink
                    color="primary"
                    size="md"
                    className="mt-8 flex justify-center font-[500]"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </BVLink>
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
