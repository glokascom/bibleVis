'use client'

import { useState } from 'react'

import { BVButton } from '@/app/components/BVButton'
import { BVInput } from '@/app/components/BVInput'

function UsernameEdit() {
  const [username, setUsername] = useState('')

  return (
    <form className="flex flex-col sm:gap-4">
      <div>
        <label htmlFor="username" className="mb-2 text-medium font-medium">
          *Username
        </label>
        <BVInput
          variant="bordered"
          size="sm"
          isRequired
          errorMessage={'Username already exists'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <BVButton>Save</BVButton>
    </form>
  )
}

export default UsernameEdit
