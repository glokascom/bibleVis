import { useState } from 'react'

import { BVInput } from '@/app/components/BVInput'

function Password() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
          type={'password'}
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
    </form>
  )
}

export default Password
