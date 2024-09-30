'use server'

import { PostgrestError } from '@supabase/supabase-js'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

import { checkIfSubscribed } from './userActions'

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

interface ImageResponse {
  images: Image[]
  totalCount: number
}

export async function getLikeCountForImage(imageId: number): Promise<number> {
  try {
    const { count, error } = await supabaseService
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('image_id', imageId)

    if (error) throw error
    return count || 0
  } catch (error) {
    console.error(
      `Error fetching like count for image ${imageId}:`,
      (error as Error).message
    )
    return 0
  }
}

export async function getImageStats(imageId: number) {
  try {
    const { data, error } = await supabaseService
      .from('images')
      .select('total_views, total_downloads')
      .eq('id', imageId)
      .single()

    if (error) {
      throw new Error(`Error fetching image stats: ${error.message}`)
    }

    return {
      totalViews: data?.total_views || 0,
      totalDownloads: data?.total_downloads || 0,
    }
  } catch (error) {
    console.error('Error fetching image stats:', error)
    return null
  }
}

export async function incrementImageViews(imageId: number) {
  try {
    const { error } = await supabaseService.rpc('increment_views', { image_id: imageId })

    if (error) {
      throw new Error(`Error incrementing image views: ${error.message}`)
    }

    return true
  } catch (error) {
    console.error('Error incrementing image views:', error)
    return false
  }
}

export async function getUserImagesWithLikes(
  userId: string | null,
  page: number = 1,
  pageSize: number = 10,
  currentUserId?: string | null,
  searchQuery?: string | null,
  imageFilter?: boolean | null,
  orientationFilter?: number | 0
): Promise<ImageResponse> {
  try {
    const rangeStart = (page - 1) * pageSize
    const rangeEnd = page * pageSize - 1
    let query = supabaseService
      .from('images')
      .select('*, users(id,username,avatar_file_path, total_followers)', {
        count: 'exact',
      })

    if (userId) {
      query = query.eq('user_id', userId)
    }
    if (searchQuery) {
      const formattedQuery = searchQuery
        .split(/[-,]+/)
        .filter((word) => word.trim().length > 0)
        .join(' | ')
      query = query.textSearch('fts', formattedQuery)
    }

    if (imageFilter === true) {
      query = query.eq('is_ai_generated', true)
    } else if (imageFilter === false) {
      query = query.eq('is_ai_generated', false)
    }

    let formattedOrientationFilter
    if (orientationFilter === 0) {
      formattedOrientationFilter = null
    } else if (orientationFilter === 1) {
      formattedOrientationFilter = 'landscape'
    } else if (orientationFilter === 2) {
      formattedOrientationFilter = 'portrait'
    }

    if (formattedOrientationFilter) {
      query = query.eq('orientation', formattedOrientationFilter)
    }

    const {
      data: images,
      count,
      error,
    } = await query.range(rangeStart, rangeEnd).order('uploaded_at', { ascending: false })

    if (error) throw error
    if (!images || images.length === 0) return { images: [], totalCount: count || 0 }

    let likedImages = new Set()
    if (currentUserId) {
      const { data: likes, error: likesError } = await supabaseService
        .from('likes')
        .select('image_id')
        .eq('user_id', currentUserId)

      if (likesError) throw likesError
      likedImages = new Set(likes?.map((like) => like.image_id))
    }

    const imagesWithLikes = await Promise.all(
      images.map(async (image) => {
        const avatarUrl = image.users?.avatar_file_path
          ? `${process.env.STORAGE_URL}/object/public/profile/${image.users.avatar_file_path}`
          : null

        const imagePath = image.original_file_path
          ? `${process.env.STORAGE_URL}/object/public/profile/${image.original_file_path}`
          : null

        const isOwnedByCurrentUser = currentUserId
          ? image.user_id === currentUserId
          : false

        const total_likes = await getLikeCountForImage(image.id)

        return {
          ...image,
          users: {
            ...image.users,
            avatarUrl,
          },
          liked_by_current_user: likedImages.has(image.id),
          imagePath,
          isOwnedByCurrentUser,
          total_likes,
        }
      })
    )

    return { images: imagesWithLikes, totalCount: count || 0 }
  } catch (error) {
    console.error('Error fetching user images:', (error as Error).message)
    return { images: [], totalCount: 0 }
  }
}

interface LikeResponse {
  error: PostgrestError | null
  data: object | null
}

export async function checkIfLiked(imageId: number) {
  const userResponse = await getUser()
  if (!userResponse || !userResponse.user) {
    return { existingLike: null, fetchError: new Error('User not authenticated') }
  }

  const userId = userResponse.user.id

  const { data: existingLike, error: fetchError } = await supabaseService
    .from('likes')
    .select('*')
    .eq('user_id', userId)
    .eq('image_id', imageId)
    .maybeSingle()

  return { existingLike, fetchError }
}

export async function toggleLike(imageId: number): Promise<LikeResponse> {
  try {
    const { id: userId } = (await getUser()).user

    const { existingLike, fetchError } = await checkIfLiked(imageId)

    if (fetchError) return { error: fetchError as PostgrestError, data: null }

    if (existingLike) {
      const { error: deleteError } = await supabaseService
        .from('likes')
        .delete()
        .eq('id', existingLike.id)

      if (deleteError) return { error: deleteError, data: null }

      return { error: null, data: { message: 'Like removed' } }
    } else {
      const { error: insertError } = await supabaseService
        .from('likes')
        .insert([{ user_id: userId, image_id: imageId }])

      if (insertError) return { error: insertError, data: null }

      return { error: null, data: { message: 'Like added' } }
    }
  } catch (error) {
    console.error('Error toggling like:', (error as Error).message)
    return { error: null, data: null }
  }
}

export interface DeleteResponse {
  error: PostgrestError | null
  data: object | null
}

export async function deleteImage(imageId: number): Promise<DeleteResponse> {
  try {
    const { id: userId } = (await getUser()).user

    const { data: image, error: fetchError } = await supabaseService
      .from('images')
      .select('user_id')
      .eq('id', imageId)
      .single()

    if (fetchError) {
      return { error: fetchError, data: null }
    }

    if (image.user_id !== userId) {
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

    return { error: null, data: { message: 'Image deleted successfully' } }
  } catch (error) {
    console.error('Error deleting image:', (error as Error).message)
    return {
      error: {
        message: (error as Error).message,
      } as PostgrestError,
      data: null,
    }
  }
}

export async function getRandomImagesExcluding(
  userId: string,
  excludeImageId: number,
  numberOfImages: number = 3
): Promise<Image[]> {
  try {
    const { data: images, error: fetchError } = await supabaseService
      .from('images')
      .select('*')
      .eq('user_id', userId)

    if (fetchError) throw fetchError

    const filteredImages = images.filter((image) => image.id !== excludeImageId)
    const shuffledImages = filteredImages.sort(() => 0.5 - Math.random())
    const randomImages = shuffledImages.slice(0, numberOfImages)

    const imagesWithPaths = randomImages.map((image) => {
      const imagePath = image.original_file_path
        ? `${process.env.STORAGE_URL}/object/public/profile/${image.original_file_path}`
        : null

      return {
        ...image,
        imagePath,
      }
    })

    return imagesWithPaths
  } catch (error) {
    console.error('Error fetching random images:', (error as Error).message)
    return []
  }
}

export interface ExtendedImage extends Image {
  imageInfo: Image
  relatedImages: Image[]
  isLike: boolean
  isFollowed: boolean
  isCurrentUser: boolean
}

interface ExtendedImageResponse {
  images: ExtendedImage[]
  totalCount: number
}

export const loadNextPage = async (
  userId: string | null,
  page: number,
  searchQuery: string | null,
  imageFilter: boolean | null,
  orientationFilter: number | 0,
  pageSize: number = 10
): Promise<ExtendedImageResponse> => {
  const { user: currentUser } = await getUser()
  const { images, totalCount } = await getUserImagesWithLikes(
    userId,
    page,
    pageSize,
    currentUser?.id,
    searchQuery,
    imageFilter,
    orientationFilter
  )

  const extendedImages = await Promise.all(
    images.map(async (image) => {
      const [relatedImages, { existingLike }] = await Promise.all([
        getRandomImagesExcluding(image.user_id, image.id),
        currentUser?.id
          ? checkIfLiked(image.id)
          : { existingLike: null, fetchError: null },
      ])
      const isFollowed = await checkIfSubscribed(image.user_id)
      return {
        imageInfo: image,
        relatedImages,
        isLike: !!existingLike,
        isFollowed,
        isCurrentUser: currentUser?.id === image.user_id,
      } as ExtendedImage
    })
  )

  return {
    images: extendedImages,
    totalCount,
  }
}
