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
  const [loading, setLoading] = useState(false)

  const handle = async (event) => {
    setLoading(true)
    setErrors(null)
    event.preventDefault()
    const errors = []
    if (!email) {
      errors.push({ field: 'email', message: 'Email is required' })
      setErrors({
        message: '',
        fields: errors,
      })
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: 'email', message: 'Unsupported email format' })
      setErrors({
        message: '',
        fields: errors,
      })
      setLoading(false)
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
    setLoading(false)
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
              <Image
                src="/mail.svg"
                alt="Confirmation Mail Icon"
                width={72}
                height={72}
              />
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
                <label
                  htmlFor="email"
                  className={`mb-2 text-medium font-medium ${errors?.fields.some((error) => error.field === 'email') ? 'text-danger' : ''}`}
                >
                  *Email
                </label>
                <BVInput
                  type="email"
                  variant="bordered"
                  size="sm"
                  isRequired
                  autoComplete="email"
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
                  onPress={handle}
                  isDisabled={email === '' || loading}
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
