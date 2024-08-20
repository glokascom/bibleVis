import Image from 'next/image'

import { BVLink } from '@/app/components/BVLink'

import AvatarWithName from './AvatarWithName'

interface HeaderProfileProps {
  name: string
  link: {
    url: string
    name: string
  }
}

function HeaderProfile({ name, link }: HeaderProfileProps) {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="w-1/3">
        <AvatarWithName userName="Syakov Vlad" />
      </div>
      <div className="flex w-2/3 justify-between border-b-1 border-secondary-200 pb-5 font-bold">
        <div className="text-xlarge capitalize">{name}</div>
        {link && (
          <BVLink href={link.url} className="flex items-center gap-2">
            <span>{link.name}</span>
            <Image src="/link.svg" alt="link" width={15} height={15} />
          </BVLink>
        )}
      </div>
    </div>
  )
}

export default HeaderProfile
