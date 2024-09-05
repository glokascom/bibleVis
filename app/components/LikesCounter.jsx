import { useState } from 'react'

import { Image } from '@nextui-org/image'

import { BVButton } from './BVButton'

function LikesCounter() {
  const [isLiked, setIsLiked] = useState(false)
  const [count, setCount] = useState(845)

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked)
    setCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1))
  }

  const commonButtonClasses = 'w-1/2 leading-4'

  return (
    <div className="flex items-center gap-2.5">
      <BVButton
        size="xl"
        variant="bordered"
        color="background"
        className={commonButtonClasses}
        onClick={toggleLike}
        startContent={
          <Image
            src={isLiked ? '/heart-filled.svg' : '/heart-empty.svg'}
            alt="heart"
            width={20}
            height={20}
            radius="none"
          />
        }
      >
        {count}
      </BVButton>

      <BVButton
        size="xl"
        variant="bordered"
        color="background"
        aria-label="Like"
        className={commonButtonClasses}
        onClick={() => alert('share button')}
        isIconOnly
      >
        <Image src="/share.svg" alt="share" radius="none" width={20} height={20} />
      </BVButton>
    </div>
  )
}

export default LikesCounter
