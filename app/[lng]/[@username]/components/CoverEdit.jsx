import React from 'react'

import Image from 'next/image'

import { BVButton } from '@/app/components/BVButton'

function CoverEdit() {
  return (
    <div>
      <div className="mb-1">Cover image</div>
      <div className="flex flex-col items-center gap-5 rounded-small bg-secondary-100 p-7">
        <Image src="/cover.svg" alt="cover" width={328} height={109} />
        <BVButton>Upload new cover image</BVButton>
      </div>
    </div>
  )
}

export default CoverEdit
