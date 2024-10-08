'use client'

import { useEffect, useState } from 'react'

import { Tab, Tabs } from '@nextui-org/tabs'

import AvatarWithName from './AvatarWithName'
import Email from './Email'
import HeaderProfile from './HeaderProfile'
import PasswordRestore from './PasswordRestore'
import Profile from './Profile'

function ProfileCard({ user }) {
  const [tabKey, setTabKey] = useState('profile')
  const [profileLink, setProfileLink] = useState('#')
  useEffect(() => {
    if (user) {
      setProfileLink(user.username ? `/@${user.username}` : '#')
    }
  }, [user])

  if (!user) {
    return null
  }

  return (
    <>
      <div className="hidden flex-col sm:flex">
        <HeaderProfile
          userInfo={user}
          title={tabKey}
          link={tabKey === 'profile' ? { name: 'View profile', url: profileLink } : null}
        />
        <div className="flex flex-col">
          <Tabs
            onSelectionChange={(key) => setTabKey(key)}
            aria-label="Options"
            isVertical={true}
            variant="underlined"
            classNames={{
              panel: 'w-2/3 p-0',
              base: 'w-1/3 mt-7',
              tabList: 'w-full pr-2.5 border-l-1 border-secondary-200 pl-0 font-bold',
              tab: 'justify-start grow hover:bg-secondary-50 hover:opacity-100 text-medium data-[hover-unselected=true]:opacity-enabled',
              cursor:
                'absolute z-0 w-[1px] h-[80%] left-0 top-[10%] shadow-[1px_0_0px_0_rgba(0,0,0,0.05)] bg-foreground rounded-none',
              tabContent: 'hover:bg-secondary-50',
            }}
          >
            <Tab key="profile" title="Profile">
              <Profile userInfo={user} />
            </Tab>
            <Tab key="email" title="Email">
              <Email userInfo={user} />
            </Tab>
            {user.provider !== 'google' && (
              <Tab key="password" title="Password">
                <PasswordRestore userInfo={user} />
              </Tab>
            )}
          </Tabs>
        </div>
      </div>
      <div className="flex flex-col gap-7 sm:hidden">
        <AvatarWithName userInfo={user} />
        <Tabs
          aria-label="Options"
          variant="underlined"
          fullWidth
          classNames={{
            tab: 'h-auto py-0 text-medium',
            tabList: 'border-b-1 border-secondary-200 py-0',
            cursor: 'px-0 bg-primary-500 h-[1px]',
            tabContent: 'pb-5',
            panel: 'py-0',
          }}
        >
          <Tab key="profile" title="Profile" className="justify-start px-0">
            <Profile userInfo={user} />
          </Tab>
          <Tab key="email" title="Email">
            <Email userInfo={user} />
          </Tab>
          {user.provider !== 'google' && (
            <Tab key="password" title="Password" className="justify-end px-0">
              <PasswordRestore userInfo={user} />
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  )
}

export default ProfileCard
