'use server'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export async function getFavoriteImages(
  page = 1,
  pageSize = 10,
  filter = 'All',
  orientation = 'all',
  sort = 'newest'
) {
  try {
    const { user } = await getUser()

    const { data, error } = await supabaseService.rpc('get_favorite_images', {
      user_id: user.id,
      filter,
      orientation_param: orientation,
      sort,
      page,
      page_size: pageSize,
    })

    if (error) throw error
    if (!data?.length) return { images: [], totalCount: 0 }

    const formattedImages = data.map((image) => {
      const avatarUrl = image.users_avatar_file_path
        ? `${process.env.STORAGE_URL}/object/public/profile/${image.users_avatar_file_path}`
        : null

      const imagePath = image.original_file_path
        ? `${process.env.STORAGE_URL}/object/public/profile/${image.original_file_path}`
        : null

      return {
        ...image,
        url_slug:
          encodeURIComponent(image.title.trim().toLowerCase().replace(/\s+/g, '-')) +
          '-' +
          image.url_slug,
        users: {
          id: image.users_id,
          username: image.users_username,
          avatarUrl,
        },
        liked_by_current_user: true,
        imagePath,
      }
    })

    return { images: formattedImages, totalCount: data.length }
  } catch (error) {
    console.error('Error in getFavoriteImages:', error)
    return { images: [], totalCount: 0 }
  }
}
