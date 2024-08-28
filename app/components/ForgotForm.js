'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { forgotPassword } from '@/app/actions/actionsSupabase'
import { BVButton } from '@/app/components/BVButton'
import { BVInput } from '@/app/components/BVInput'

import { BVLink } from './BVLink'

export default function ForgotForm() {
  const [email, setEmail] = useState('')
  const [data, setData] = useState(null)
  const [errors, setErrors] = useState(null)

  const handle = async (event) => {
    event.preventDefault()
    const errors = []
    if (!email) {
      errors.push({ field: 'email', message: 'Email is required' })
      setErrors({
        message: '',
        fields: errors,
      })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: 'email', message: 'Unsupported email format' })
      setErrors({
        message: '',
        fields: errors,
      })
      return
    }

    const response = await forgotPassword({ email })
    if (response.status === 'error') {
      setErrors({
        message: response.message,
        fields: response?.errors || [],
      })
    } else {
      setData(response.data)
    }
  }

  return (
    <>
      <div className="z-50 flex h-[90vh] w-[90vw] flex-row overflow-hidden rounded-medium">
        <div className="flex h-full w-full shrink-0 flex-col items-center bg-background px-14 pb-0 pt-5 md:w-[400px] lg:w-[480px]">
          <Link href="/" className="mb-10">
            <Image src="/biblevis-logo.svg" alt="biblevis logo" width={181} height={45} />
          </Link>
          {data ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-auto">
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.21094 21.1823L36.0001 35.5751L64.7893 21.1823C64.6828 19.3479 63.8789 17.6237 62.5423 16.3627C61.2057 15.1018 59.4376 14.3996 57.6001 14.3999H14.4001C12.5626 14.3996 10.7945 15.1018 9.45798 16.3627C8.12141 17.6237 7.31751 19.3479 7.21094 21.1823Z"
                  fill="#10CD87"
                />
                <path
                  d="M64.8002 29.2249L36.0002 43.6249L7.2002 29.2249V50.4001C7.2002 52.3096 7.95876 54.141 9.30903 55.4912C10.6593 56.8415 12.4906 57.6001 14.4002 57.6001H57.6002C59.5098 57.6001 61.3411 56.8415 62.6914 55.4912C64.0416 54.141 64.8002 52.3096 64.8002 50.4001V29.2249Z"
                  fill="#10CD87"
                />
              </svg>

              <p className="max-w-80 text-center text-large font-medium">
                An email with instructions on how to reset your password has been sent to
                your email address.
              </p>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-7">
              <div className="w-full rounded-medium border border-primary p-2.5 text-small font-medium text-primary">
                If your account was created with an email address, enter your email below
                and we will send a message to reset your password
              </div>
              <div>
                <label htmlFor="email" className="mb-2 text-medium font-medium">
                  *Email
                </label>
                <BVInput
                  type="email"
                  variant="bordered"
                  size="sm"
                  isRequired
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={errors?.fields.some((error) => error.field === 'email')}
                  errorMessage={errors?.fields
                    .filter((error) => error.field === 'email')
                    .map((error) => <p key={error.message}>{error.message}</p>)}
                />
              </div>
              <div>
                {errors?.message && (
                  <p className="mb-2 text-small text-danger">{errors.message}</p>
                )}
                <BVButton
                  fullWidth
                  onClick={handle}
                  isDisabled={email === ''}
                  disabled={email === ''}
                  color="primary"
                >
                  Reset my password
                </BVButton>
              </div>
              <BVLink
                as={Link}
                color="primary"
                size="md"
                className="flex justify-center font-[500]"
                href="/"
              >
                Cancel
              </BVLink>
            </div>
          )}
        </div>
        <div
          className="hidden h-full w-full bg-cover bg-center md:block"
          style={{ backgroundImage: 'url(/ship.webp)' }}
        ></div>
      </div>
    </>
  )
}
