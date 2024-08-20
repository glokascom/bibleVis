import React from 'react'

import { BVButton } from '@/app/components/BVButton'
import { BVInput } from '@/app/components/BVInput'

function UserNameEdit() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <div className="mb-1">Username</div>
        <BVInput />
      </div>
      <BVButton>Save</BVButton>
    </div>
  )
}

export default UserNameEdit
