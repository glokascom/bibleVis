import React from 'react'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

function AvatarEdit() {
  return (
    <div>
      <div className="mb-1">Avatar</div>
      <div className="flex flex-col items-center gap-5 rounded-small bg-secondary-100 p-7">
        <BVAvatar size="xl" />
        <BVButton>Upload new avatar</BVButton>
      </div>
    </div>
  )
}

export default AvatarEdit
