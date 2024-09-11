import { useEffect, useRef, useState } from 'react'

import { Image } from '@nextui-org/image'

import { BVAvatar } from './BVAvatar'
import { BVButton } from './BVButton'

function CreatorDetails({ creator }) {
  const [follow, setFollow] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)
  const containerRef = useRef(null)
  const resizeObserverRef = useRef(null)
  console.log('container', creator)
  useEffect(() => {
    const container = containerRef.current

    const checkWidth = () => {
      if (container) {
        setIsNarrow(container.offsetWidth < 350)
      }
    }

    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(checkWidth)
    }

    checkWidth()

    if (container) {
      resizeObserverRef.current.observe(container)
    }

    return () => {
      if (container && resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(container)
      }
    }
  }, [])

  const toggleFollow = () => setFollow((prev) => !prev)

  return (
    <div
      ref={containerRef}
      className={`flex items-center ${isNarrow ? 'flex-col space-y-7' : 'flex-row justify-between pl-4'} text-large font-semibold`}
    >
      <div className="flex items-center gap-5">
        <BVAvatar
          as="button"
          className="transition-transform"
          name={creator.username}
          size="md"
          src={creator.avatarUrl}
        />
        <div className="max-w-32">
          <p className="truncate" title="Name creator_the_name_here_is_too_long">
            {creator.username}
          </p>
          <p className="mt-2.5 text-small text-secondary-400">22,465 followers</p>
        </div>
      </div>

      <BVButton
        variant="light"
        color="background"
        className="rounded-medium px-4 text-large"
        onClick={toggleFollow}
        startContent={
          <Image
            src={follow ? '/unfollow.svg' : '/follow.svg'}
            alt={follow ? 'unfollow' : 'follow'}
            width={20}
            height={20}
            radius="none"
          />
        }
      >
        {follow ? 'Unfollow' : 'Follow'}
      </BVButton>
    </div>
  )
}

export default CreatorDetails
