import { Suspense } from 'react'

import { redirect } from 'next/navigation'

import { getUser } from '@/app/actions/getUser'

import { getFavoriteCounts } from './actions/getFavoriteCounts'
import FavoritesGallery from './components/FavoritesGallery'

export const dynamic = 'force-dynamic'

export default async function FavoritesPage() {
  let user = null
  let counters = {
    total: 0,
    aiGenerated: 0,
    humanMade: 0,
  }

  try {
    const result = await getUser()
    if (result.error) throw result.error
    user = result.user

    if (!user) {
      redirect('/login')
    }

    const favoritesResult = await getFavoriteCounts()
    counters = favoritesResult.counters
  } catch (err) {
    console.error(err)
  }

  return (
    <>
      <h1 className="mb-10 pt-14 text-5xl font-medium md:pt-24">liked images</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <FavoritesGallery isAuthenticated={!!user} counters={counters} />
      </Suspense>
    </>
  )
}
