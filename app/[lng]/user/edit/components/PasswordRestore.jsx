'use client'

import { useState } from 'react'

import Image from 'next/image'

import { BVButton } from '@/app/components/BVButton'
import { BVInput } from '@/app/components/BVInput'

function Password() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <form className="flex max-w-96 flex-col gap-4">
      <div>
        <label htmlFor="password" className="mb-2 text-medium font-medium">
          Current Password
        </label>
        <BVInput
          variant="bordered"
          size="sm"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
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
      </div>
      <div>
        <label htmlFor="password" className="mb-2 text-medium font-medium">
          Password
        </label>
        <BVInput
          variant="bordered"
          size="sm"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type={'password'}
          isRequired
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 text-medium font-medium">
          Password confirmation
        </label>
        <BVInput
          variant="bordered"
          size="sm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={'password'}
          isRequired
        />
      </div>
      <BVButton>Save</BVButton>
    </form>
  )
}

export default Password
