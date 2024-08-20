import React from 'react'

import { Tab, Tabs } from '@nextui-org/react'

import EmailEdit from './EmailEdit'
import HeaderProfile from './HeaderProfile'
import PasswordEdit from './PasswordEdit'
import Profile from './Profile'

function ProfileCard() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col px-4">
      <HeaderProfile name="Profile" link={{ name: 'View profile', url: '#' }} />
      <div className="flex flex-col">
        <Tabs
          aria-label="Options"
          isVertical={true}
          variant="underlined"
          classNames={{
            panel: 'bg-red-200 w-2/3',
            base: 'w-1/3 mt-7',
            tabList: 'w-full pr-2.5',
            tab: 'justify-start grow hover:bg-secondary-100 hover:opacity-100',
            cursor:
              'absolute z-0 w-[2px] h-[80%] left-0 top-[10%] shadow-[1px_0_0px_0_rgba(0,0,0,0.05)] bg-foreground rounded-none',
          }}
        >
          <Tab key="profile" title="Profile">
            <Profile />
          </Tab>
          <Tab key="email" title="Email">
            <EmailEdit />
          </Tab>
          <Tab key="password" title="Password">
            <PasswordEdit />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfileCard
