import { BVLink } from '@/app/components/BVLink'

import AvatarWithName from './AvatarWithName'

function HeaderProfile({ name, link }) {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="w-1/3">
        <AvatarWithName userName={'Syakov Vlad'} />
      </div>
      <div className="flex w-2/3 justify-between border-b-1 border-secondary-200 pb-5">
        <div>{name}</div>
        <BVLink href={link.url}>{link.name}</BVLink>
      </div>
    </div>
  )
}

export default HeaderProfile
