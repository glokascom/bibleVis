'use server'

import { revalidatePath } from 'next/cache'

import { PostgrestError } from '@supabase/supabase-js'

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

interface LikeResponse {
  error: PostgrestError | null
  data: object | null
}

export async function toggleLike(userId: string, imageId: number): Promise<LikeResponse> {
  const { data: existingLike, error: fetchError } = await supabaseService
    .from('likes')
    .select('*')
    .eq('user_id', userId)
    .eq('image_id', imageId)
    .maybeSingle()

  if (fetchError) {
    return { error: fetchError, data: null }
  }

  if (existingLike) {
    // Если лайк уже существует, удалим его
    const { error: deleteError } = await supabaseService
      .from('likes')
      .delete()
      .eq('id', existingLike.id)

    if (deleteError) {
      return { error: deleteError, data: null }
    }

    return { error: null, data: { message: 'Like removed' } }
  } else {
    // Если лайк не существует, создадим его
    const { error: insertError } = await supabaseService
      .from('likes')
      .insert([{ user_id: userId, image_id: imageId }])

    if (insertError) {
      return { error: insertError, data: null }
    }

    revalidatePath('/', 'layout')

    return { error: null, data: { message: 'Like added' } }
  }
}

export interface DeleteResponse {
  error: PostgrestError | null
  data: object | null
}

export async function deleteImage(
  currentUserId: string,
  imageId: number
): Promise<DeleteResponse> {
  try {
    const { data: image, error: fetchError } = await supabaseService
      .from('images')
      .select('user_id')
      .eq('id', imageId)
      .single()

    if (fetchError) {
      return { error: fetchError, data: null }
    }

    if (image.user_id !== currentUserId) {
      return {
        error: {
          message: 'You do not have permission to delete this image.',
        } as PostgrestError,
        data: null,
      }
    }

    const { error: deleteLikesError } = await supabaseService
      .from('likes')
      .delete()
      .eq('image_id', imageId)

    if (deleteLikesError) {
      return { error: deleteLikesError, data: null }
    }

    const { error: deleteImageError } = await supabaseService
      .from('images')
      .delete()
      .eq('id', imageId)

    if (deleteImageError) {
      return { error: deleteImageError, data: null }
    }

    revalidatePath('/', 'layout')

    return { error: null, data: { message: 'Image deleted successfully' } }
  } catch (error) {
    console.error('Error deleting image:', (error as Error).message)
    return { error: error as PostgrestError, data: null }
  }
}
