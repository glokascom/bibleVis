import { notFound, redirect } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'
import CreatorDetails from '@/app/components/CreatorDetails'
import RelatedImages from '@/app/components/RelatedImages'

import UserInfo from '../../[@username]/components/UserInfo'
import { getSubscriptions } from './actions/getSubscriptions'

async function SubscriptionsPage() {
  const res = await getSubscriptions()
  const { user } = await getUser()
  if (!user) {
    redirect('/login?redirectedFrom=/user/subscriptions')
  }
  if (res.status === 'error') {
    console.error(res.error)
    notFound()
  }
  return (
    <div className="pt-14 md:pt-24">
      <h1 className="mb-10 text-3xl font-medium md:text-5xl">Subscriptions</h1>
      {res.subscriptions?.length === 0 && (
        <p className="mt-4 text-lg">You have no subscriptions</p>
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {res.subscriptions?.map(async (subscription) => {
          const { creator } = await subscription
          return (
            <div
              key={creator.id}
              className="flex w-full flex-col gap-5 rounded-medium border border-secondary-200 p-2.5 md:p-4 lg:flex-row"
            >
              <div className="flex-1">
                <div className="hidden lg:block">
                  <UserInfo
                    isCurrentUser={false}
                    user={user}
                    profileUser={creator}
                    initialIsFollowed={true}
                  />
                </div>
                <div className="block lg:hidden">
                  <CreatorDetails
                    creator={creator}
                    followUserId={'123'}
                    isAuthenticated={true}
                    isCurrentUser={false}
                    isFollowed={true}
                  />
                </div>
              </div>
              <div className="flex flex-none flex-col justify-center lg:flex-1">
                <RelatedImages images={creator.images} baseUrl={`/user/subscriptions`} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SubscriptionsPage
