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

let cachedImages: Image[] | null = null
let currentPage: number = 1

export const getImages = async (
  userId: string,
  currentUserId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<Image[]> => {
  if (!cachedImages) {
    cachedImages = await getUserImagesWithLikes(userId, currentUserId)
    console.log(cachedImages, 29)
  }

  const startIndex: number = (page - 1) * pageSize
  const endIndex: number = startIndex + pageSize

  return cachedImages.slice(startIndex, endIndex)
}

export const loadNextPage = async (
  userId: string,
  currentUserId: string
): Promise<Image[]> => {
  const images = await getImages(userId, currentUserId, currentPage)
  currentPage += 1
  return images
}

export async function getUserImagesWithLikes(
  userId: string,
  currentUserId: string
): Promise<Image[]> {
  try {
    const { data: images, error } = await supabaseService
      .from('images')
      .select(
        'id, url_slug, title, description, original_file_path, medium_file_path, small_file_path, file_type, total_views, total_downloads, total_likes, orientation, uploaded_at, user_id, users(username)'
      )
      .eq('user_id', userId)

    if (error) throw error

    if (!images) return []

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
