'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@nextui-org/button'
import { Tab, Tabs } from '@nextui-org/tabs'

import { ApiResponse, errorField } from '@/app/types/api'

import { login, signup } from '../actions/actionsSupabase'
import { BVButton } from './BVButton'
import { BVInput } from './BVInput'
import { BVLink } from './BVLink'
import SuccessSignUpForm from './SuccessSignUp'

function AuthForm() {
  const searchParams = useSearchParams()
  const [isSignupVisible, setIsSignupVisible] = useState(false)
  const [isLoginVisible, setIsLoginVisible] = useState(false)

  const [loginErrors, setLoginErrors] = useState<{
    message: string
    fields: errorField[]
  }>({
    message: '',
    fields: [],
  })
  const [signupErrors, setSignupErrors] = useState<{
    message: string
    fields: errorField[]
  }>({
    message: '',
    fields: [],
  })
  const [emailLogin, setEmailLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const [emailSignup, setEmailSignup] = useState('')
  const [passwordSignup, setPasswordSignup] = useState('')
  const [usernameSignup, setUsernameSignup] = useState('')
  const [loading, setLoading] = useState(false)

  const { push, refresh } = useRouter()
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)

  const toggleSignupVisibility = () => {
    setIsSignupVisible((prev) => !prev)
  }
  const toggleLoginVisibility = () => setIsLoginVisible((prev) => !prev)

  const handleSignup = async () => {
    setSignupErrors({ message: '', fields: [] })
    const errors: { field?: string; message: string }[] = []
    if (!emailSignup) {
      errors.push({ field: 'email', message: 'Email is required' })
    }

    if (!passwordSignup) {
      errors.push({ field: 'password', message: 'Password is required' })
    }

    if (!usernameSignup) {
      errors.push({ field: 'username', message: 'Username is required' })
    }

    if (errors.length > 0) {
      setSignupErrors({
        message: 'Validation errors occurred',
        fields: errors,
      })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailSignup)) {
      errors.push({ field: 'email', message: 'Unsupported email format' })
    }

    if (!/^[a-zA-Z0-9_]+$/.test(usernameSignup)) {
      errors.push({
        field: 'username',
        message:
          'Only letters A-Z, a-z, numbers or underscore please (no spaces or special characters).',
      })
    }

    if (usernameSignup.length < 5 || usernameSignup.length > 20) {
      errors.push({
        field: 'username',
        message: 'Username must be between 5 and 20 characters long.',
      })
    }

    if (passwordSignup.length < 6) {
      errors.push({
        field: 'password',
        message: 'The password must be at least 6 characters',
      })
    }

    let validGroups = 0
    if (/\d/.test(passwordSignup)) validGroups++
    if (/[a-z]/.test(passwordSignup)) validGroups++
    if (/[A-Z]/.test(passwordSignup)) validGroups++
    if (/[^\w]/.test(passwordSignup)) validGroups++

    if (validGroups < 2) {
      errors.push({
        field: 'password',
        message:
          'The password must contain at least 2 groups: digits, lowercase letters, uppercase letters, special characters',
      })
    }

    if (errors.length > 0) {
      setSignupErrors({
        message: 'Validation errors occurred',
        fields: errors,
      })
      return
    }
    setLoading(true)
    try {
      const response: ApiResponse<unknown> = await signup(
        emailSignup,
        passwordSignup,
        usernameSignup
      )

      if (response.status === 'error') {
        setSignupErrors({
          message: response.message,
          fields: response?.errors || [],
        })
      } else {
        setIsSignupSuccess(true)
      }
    } catch (error) {
      console.error(error)
      setSignupErrors({ message: 'Something went wrong. Please try again.', fields: [] })
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    setLoginErrors({ message: '', fields: [] })
    const errors: { field?: string; message: string }[] = []

    if (!emailLogin) {
      errors.push({ field: 'email', message: 'Email is required' })
    }

    if (!passwordLogin) {
      errors.push({ field: 'password', message: 'Password is required' })
    }

    if (errors.length > 0) {
      setLoginErrors({ message: 'Validation errors occurred', fields: errors })
      return
    }

    setLoading(true)

    try {
      const response: ApiResponse<unknown> = await login(emailLogin, passwordLogin)

      if (response.status === 'error') {
        setLoginErrors({
          message: response.message,
          fields: response?.errors || [],
        })
      } else {
        push(searchParams.get('redirectedFrom') ?? '/')
        refresh()
      }
    } catch (error) {
      console.error(error)
      setLoginErrors({ message: 'Something went wrong. Please try again.', fields: [] })
    } finally {
      setLoading(false)
    }
  }

  if (isSignupSuccess) {
    return <SuccessSignUpForm />
  }

  return (
    <>
      <div className="z-50 flex h-[90vh] w-[90vw] flex-row overflow-hidden rounded-medium">
        <div className="flex h-full w-full shrink-0 flex-col items-center bg-background px-5 pb-0 pt-5 md:w-[400px] lg:w-[480px]">
          <Link href="/" className="mb-10">
            <Image src="/biblevis-logo.svg" alt="biblevis logo" width={181} height={45} />
          </Link>
          <div className="flex w-full flex-col overflow-hidden">
            <Tabs
              variant="underlined"
              classNames={{
                tabList:
                  'w-full flex-shrink-0 flex-grow-0 basis-auto p-0 px-6 shadow-[inset_0px_-1px_0px_0px_hsl(var(--nextui-secondary-100))]',
                cursor: 'bg-primary h-px',
                tab: 'pb-7 font-medium text-lg h-auto data-[focus-visible=true]:outline-0',
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
                  onClick={() =>
                    push(
                      '/api/auth/google?redirectedFrom=' +
                        searchParams.get('redirectedFrom')
                    )
                  }
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
                <label
                  className={`mb-2 text-medium font-medium ${signupErrors?.fields.some((error) => error.field === 'username') ? 'text-danger' : ''}`}
                >
                  *Username
                </label>
                <BVInput
                  variant="bordered"
                  size="sm"
                  isRequired
                  value={usernameSignup}
                  onChange={(e) => setUsernameSignup(e.target.value)}
                  isInvalid={signupErrors?.fields.some(
                    (error) => error.field === 'username'
                  )}
                  errorMessage={signupErrors?.fields
                    .filter((error) => error.field === 'username')
                    .map((error) => <p key={error.message}>{error.message}</p>)}
                />
                <label
                  className={`mb-2 text-medium font-medium ${signupErrors?.fields.some((error) => error.field === 'email') ? 'text-danger' : ''}`}
                >
                  *Email
                </label>
                <BVInput
                  type="email"
                  variant="bordered"
                  size="sm"
                  isRequired
                  value={emailSignup}
                  onChange={(e) => setEmailSignup(e.target.value)}
                  isInvalid={signupErrors?.fields.some(
                    (error) => error.field === 'email'
                  )}
                  errorMessage={signupErrors?.fields
                    .filter((error) => error.field === 'email')
                    .map((error) => <p key={error.message}>{error.message}</p>)}
                />
                <label
                  className={`mb-2 text-medium font-medium ${signupErrors?.fields.some((error) => error.field === 'password') ? 'text-danger' : ''}`}
                >
                  *Password
                </label>
                <BVInput
                  variant="bordered"
                  size="sm"
                  value={passwordSignup}
                  className="mb-8"
                  onChange={(e) => setPasswordSignup(e.target.value)}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleSignupVisibility}
                    >
                      {isSignupVisible ? (
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
                  type={isSignupVisible ? 'text' : 'password'}
                  isRequired
                  isInvalid={signupErrors?.fields.some(
                    (error) => error.field === 'password'
                  )}
                  errorMessage={signupErrors?.fields
                    .filter((error) => error.field === 'password')
                    .map((error) => <p key={error.message}>{error.message}</p>)}
                />

                {signupErrors?.message && (
                  <p className="my-4 text-small text-danger">{signupErrors.message}</p>
                )}
                <BVButton fullWidth onClick={handleSignup} isLoading={loading}>
                  {'Join'}
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
                <label
                  className={`mb-2 text-medium font-medium ${loginErrors?.fields.some((error) => error.field === 'email') ? 'text-danger' : ''}`}
                >
                  *Email
                </label>
                <BVInput
                  type="email"
                  variant="bordered"
                  size="sm"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  isRequired
                  isInvalid={loginErrors?.fields.some((error) => error.field === 'email')}
                  errorMessage={loginErrors?.fields
                    .filter((error) => error.field === 'email')
                    .map((error) => <p key={error.message}>{error.message}</p>)}
                />
                <label
                  className={`mb-2 text-medium font-medium ${loginErrors?.fields.some((error) => error.field === 'password') ? 'text-danger' : ''}`}
                >
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
                      onClick={toggleLoginVisibility}
                    >
                      {isLoginVisible ? (
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
                  type={isLoginVisible ? 'text' : 'password'}
                  isRequired
                  isInvalid={loginErrors?.fields.some(
                    (error) => error.field === 'password'
                  )}
                  errorMessage={loginErrors?.fields
                    .filter((error) => error.field === 'password')
                    .map((error) => <p key={error.message}>{error.message}</p>)}
                />
                <p className="my-8 text-small text-secondary-200">
                  This site is protected by the Google{' '}
                  <a
                    target="_blank"
                    href="/pages/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    target="_blank"
                    href="/pages/tos"
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
                {loginErrors?.message && (
                  <p className="my-4 text-small text-danger">{loginErrors.message}</p>
                )}
                <BVButton fullWidth onClick={handleLogin} isLoading={loading}>
                  {'Log in'}
                </BVButton>
                <BVLink
                  as={Link}
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
    </>
  )
}

export default AuthForm
