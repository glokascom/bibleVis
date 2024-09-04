'use server'

import { supabaseService } from '@/app/supabase/service'

type User = {
  username: string
}

type Image = {
  id: number
  url_slug: string
  title: string
  description: string
  original_file_path: string
  medium_file_path: string
  small_file_path: string
  file_type: string
  total_views: number
  total_downloads: number
  total_likes: number
  orientation: 'portrait' | 'landscape'
  uploaded_at: string
  user_id: string
  users: User
  liked_by_current_user?: boolean
  imagePath: string
  isOwnedByCurrentUser?: boolean
}

export const getImages = async (
  userId: string,
  currentUserId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<Image[]> => {
  const images = await getUserImagesWithLikes(userId, currentUserId, page, pageSize)
  return images
}

export const loadNextPage = async (
  userId: string,
  currentUserId: string,
  page: number
): Promise<Image[]> => {
  const images = await getImages(userId, currentUserId, page)
  return images
}

export async function getUserImagesWithLikes(
  userId: string,
  currentUserId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<Image[]> {
  try {
    const rangeStart = (page - 1) * pageSize
    const rangeEnd = page * pageSize - 1

    const { data: images, error } = await supabaseService
      .from('images')
      .select('*, users(username)')
      .eq('user_id', userId)
      .range(rangeStart, rangeEnd)
      .order('uploaded_at', { ascending: false })

    if (error) throw error
    if (!images || images.length === 0) return []

    const { data: likes, error: likesError } = await supabaseService
      .from('likes')
      .select('image_id')
      .eq('user_id', currentUserId)

    if (likesError) throw likesError

    const likedImages = new Set(likes?.map((like) => like.image_id))

    const imagesWithLikes = images.map((image) => {
      const imagePath = image.original_file_path
        ? `${process.env.STORAGE_URL}/object/public/profile/${image.original_file_path}`
        : null

      const isOwnedByCurrentUser = image.user_id === currentUserId

      return {
        ...image,
        liked_by_current_user: likedImages.has(image.id),
        imagePath,
        isOwnedByCurrentUser,
      }
    })

    return imagesWithLikes
  } catch (error) {
    console.error('Error fetching user images:', (error as Error).message)
    return []
  }
}
