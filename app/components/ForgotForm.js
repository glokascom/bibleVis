'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { forgotPassword } from '@/app/actions/actionsSupabase'
import { BVButton } from '@/app/components/BVButton'
import { BVInput } from '@/app/components/BVInput'

export default function ForgotForm() {
  const [email, setEmail] = useState('')
  const [data, setData] = useState(null)
  const [errors, setErrors] = useState(null)

  const handle = async (event) => {
    event.preventDefault()

    const [data, errors] = await forgotPassword({ email })
    if (errors) {
      setErrors(errors)
    } else {
      setData(data)
    }
  }

  return (
    <>
      <div className="z-50 flex h-[90vh] w-[90vw] flex-row overflow-hidden rounded-medium">
        <div className="flex h-full w-full shrink-0 flex-col items-center bg-background px-5 pb-0 pt-5 md:w-[400px] lg:w-[480px]">
          <Link href="/" className="mb-10">
            <Image src="/biblevis-logo.svg" alt="biblevis logo" width={181} height={45} />
          </Link>
          <div className="flex w-full flex-col overflow-hidden">
            {data ? (
              <p>Email sent</p>
            ) : (
              <>
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
                {errors?.message && (
                  <p className="my-4 text-small text-danger">{errors.message}</p>
                )}
                <BVButton fullWidth onClick={handle}>
                  Reset Password
                </BVButton>
              </>
            )}
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
