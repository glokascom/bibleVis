import { useEffect, useRef, useState } from 'react'

import { Image } from '@nextui-org/image'

import { BVAvatar } from './BVAvatar'
import { BVButton } from './BVButton'

function CreatorDetails() {
  const [follow, setFollow] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    const checkWidth = () => {
      if (container) {
        setIsNarrow(container.offsetWidth < 360)
      }
    }

    checkWidth()

    const resizeObserver = new ResizeObserver(checkWidth)
    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`flex items-center ${isNarrow ? 'flex-col space-y-7' : 'flex-row justify-around'} text-large font-semibold`}
    >
      <div className="flex items-center gap-5">
        <BVAvatar
          as="button"
          className="transition-transform"
          name="user.username"
          size="md"
          // src={user.avatarUrl}
        />

        <div className="max-w-32">
          <p>Name creator</p>
          <p className="mt-2.5 text-small text-secondary-400">22,465 followers</p>
        </div>
      </div>

      <BVButton
        variant="light"
        color="background"
        className="rounded-medium text-large"
        onClick={() => setFollow((prev) => !prev)}
        startContent={
          follow ? (
            <Image
              src="/unfollow.svg"
              alt="unfollow"
              width={20}
              height={20}
              radius="none"
            />
          ) : (
            <Image src="/follow.svg" alt="follow" width={20} height={20} radius="none" />
          )
        }
      >
        {follow ? 'Unfollow' : 'Follow'}
      </BVButton>
    </div>
  )
}

export default CreatorDetails
