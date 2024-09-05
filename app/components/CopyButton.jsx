import { useState } from 'react'

import Image from 'next/image'

function CopyButton({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = () => {
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log('Text copied to clipboard:', textToCopy)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 2000)
        })
        .catch((err) => console.error('Failed to copy text:', err))
    }
  }

  return (
    <Image
      src={isCopied ? '/check-mark.svg' : '/copy.svg'}
      alt={isCopied ? 'check mark' : 'copy'}
      width={18}
      height={18}
      priority
      className={`cursor-pointer ${!isCopied && 'hover:opacity-70'}`}
      onClick={handleCopyClick}
    />
  )
}

export default CopyButton
