import { getRandomImagesExcluding } from '@/app/(web)/[@username]/actions/imagesActions'
import { getAvatars } from '@/app/actions/getAvatars'
import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export const getSubscriptions = async () => {
  const { user } = await getUser()
  if (!user) {
    return { status: 'error', error: new Error('User not authenticated') }
  }
  const { data, error } = await supabaseService
    .from('subscriptions')
    .select(
      'creator:users!fk_subscriptions_following(id, username, avatar_file_path, cover_file_path, total_followers)'
    )
    .eq('follower_id', user.id)
    .order('subscribed_at', { ascending: false })
  const subscriptions = data?.map(async (record) => {
    const { avatarUrl, coverUrl } = getAvatars(record.creator)
    const relatedImages = await getRandomImagesExcluding(record.creator.id, null, 9)
    return {
      creator: {
        id: record.creator.id,
        username: record.creator.username,
        total_followers: record.creator.total_followers,
        avatar_file_path: record.creator.avatar_file_path,
        cover_file_path: record.creator.cover_file_path,
        avatarUrl,
        coverUrl,
        isFollowed: true,
        images: [...relatedImages],
      },
    }
  })
  if (error) {
    return { status: 'error', error }
  }
  return { status: 'success', subscriptions }
}
