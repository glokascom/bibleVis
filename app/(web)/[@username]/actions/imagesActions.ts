'use server'

import { PostgrestError } from '@supabase/supabase-js'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

interface UserImagesWithLikesResponse {
  images: Image[]
  totalCount: number
}

interface ImagesSearchResponse {
  images: Image[]
  totalCount: number
  error: PostgrestError | null
}

type User = {
  id: string | null | undefined
  username: string | null | undefined
  avatarUrl: string | null
  avatar_file_path?: string | null
}

type Image = {
  id: string
  url_slug: string
  title: string
  file_sizes: object
  original_file_path: string
  orientation: 'portrait' | 'landscape'
  uploaded_at: string
  users: User
  users_id?: string | null
  liked_by_current_user?: boolean
  imagePath: string | null
  users_avatar_file_path?: string | null
  users_username?: string | null
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

export default async function searchImages(
  query = '',
  filter = 'All',
  orientation = 'all',
  sort = 'newest',
  page = 1,
  pageSize = 10
): Promise<{ images: Image[]; totalCount: number; error: PostgrestError | null }> {
  const { data, error } = await supabaseService.rpc('search_images', {
    query,
    filter,
    orientation_param: orientation,
    sort,
    page,
    page_size: pageSize,
  })

  if (error) {
    console.error('Search error:', error)
    return { images: [], totalCount: 0, error: error as PostgrestError }
  }

  if (!data) {
    console.warn('There is no data matching the request')
    return { images: [], totalCount: 0, error }
  }

  return { images: data, totalCount: data.length, error: null }
}

export async function getImagesSearch(
  page: number = 1,
  pageSize: number = 10,
  currentUserId?: string | null,
  searchQuery?: string | null
): Promise<ImagesSearchResponse> {
  try {
    let query = ''
    let filter = 'All'
    let orientation = 'all'
    let sort = 'newest'

    if (searchQuery) {
      const [queryPart, queryParams] = searchQuery.split('?')

      query = queryPart ? queryPart.replace(/[^a-zA-Z0-9а-яА-ЯёЁ]+/g, ' | ') : ''

      if (queryParams) {
        const searchParams = new URLSearchParams(queryParams)

        filter = searchParams.get('filter') || filter
        orientation = searchParams.get('orientation') || orientation
        sort = searchParams.get('sort') || sort
      }
    }

    const { images, totalCount, error } = await searchImages(
      query,
      filter,
      orientation,
      sort,
      page,
      pageSize
    )

    if (error) {
      console.error('Search error:', error)
      return { images: [], totalCount: 0, error: error as PostgrestError }
    }

    if (!images || images.length === 0) return { images: [], totalCount: 0, error: null }

    let likedImages = new Set<string>()
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
        const avatarUrl = image?.users_avatar_file_path
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
          liked_by_current_user: likedImages.has(image.id),
          imagePath,
        }
      })
    )

    return { images: imagesWithLikes, totalCount, error: null }
  } catch (error) {
    console.error('Error fetching user images:', (error as Error).message)
    return { images: [], totalCount: 0, error: null }
  }
}

export async function getUserImagesWithLikes(
  userId: string | null,
  page: number = 1,
  pageSize: number = 10,
  currentUserId?: string | null,
  searchQuery?: string | null
): Promise<UserImagesWithLikesResponse> {
  try {
    const rangeStart = (page - 1) * pageSize
    const rangeEnd = page * pageSize - 1

    let query = supabaseService
      .from('images')
      .select(
        'id, title, preview, url_slug, orientation, uploaded_at, file_sizes, original_file_path, users(id, username, avatar_file_path)',
        {
          count: 'exact',
        }
      )

    if (userId) {
      query = query.eq('user_id', userId)
    }

    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`)
    }

    const {
      data: images,
      count,
      error,
    } = await query.range(rangeStart, rangeEnd).order('uploaded_at', { ascending: false })

    if (error) throw error
    if (!images || images.length === 0) return { images: [], totalCount: count || 0 }

    let likedImages = new Set<string>()
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
        const typedImage = image as unknown as Image
        const avatarUrl = typedImage.users?.avatar_file_path
          ? `${process.env.STORAGE_URL}/object/public/profile/${typedImage.users.avatar_file_path}`
          : null

        const imagePath = image.original_file_path
          ? `${process.env.STORAGE_URL}/object/public/profile/${image.original_file_path}`
          : null

        const user: User = {
          id: typedImage.users.id,
          username: typedImage.users.username,
          avatar_file_path: typedImage.users.avatar_file_path,
          avatarUrl,
        }

        return {
          ...image,
          url_slug:
            encodeURIComponent(image.title.trim().toLowerCase().replace(/\s+/g, '-')) +
            '-' +
            image.url_slug,
          liked_by_current_user: likedImages.has(image.id),
          imagePath,
          users: user,
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
    const { user } = await getUser()

    if (!user) {
      return {
        error: {
          message: 'User not authenticated',
        } as PostgrestError,
        data: null,
      }
    }
    const { id: userId } = user

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
    const { data: images, error: fetchError } = await supabaseService.rpc(
      'get_random_images',
      { user_id: userId, limit_images: numberOfImages }
    )
    if (fetchError) throw fetchError

    const filteredImages = images.filter(
      (image: { id: number }) => image.id !== excludeImageId
    )
    const shuffledImages = filteredImages.sort(() => 0.5 - Math.random())
    const randomImages = shuffledImages.slice(0, numberOfImages)

    const imagesWithPaths = randomImages.map(
      (image: { original_file_path: unknown; url_slug: string; title: string }) => {
        const imagePath = image.original_file_path
          ? `${process.env.STORAGE_URL}/object/public/profile/${image.original_file_path}`
          : null

        return {
          ...image,
          url_slug:
            encodeURIComponent(image.title.trim().toLowerCase().replace(/\s+/g, '-')) +
            '-' +
            image.url_slug,
          imagePath,
        }
      }
    )

    return imagesWithPaths
  } catch (error) {
    console.error('Error fetching random images:', (error as Error).message)
    return []
  }
}

export interface ExtendedImage extends Image {
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
  pageSize: number = 10
): Promise<ExtendedImageResponse> => {
  const { user: currentUser } = await getUser()
  let images, totalCount

  if (searchQuery) {
    ;({ images, totalCount } = await getImagesSearch(
      page,
      pageSize,
      currentUser?.id,
      searchQuery
    ))
  } else {
    ;({ images, totalCount } = await getUserImagesWithLikes(
      userId,
      page,
      pageSize,
      currentUser?.id
    ))
  }
  const extendedImages = await Promise.all(
    images.map(async (image) => {
      return {
        ...image,
        isCurrentUser: currentUser?.id === image.users.id,
      } as ExtendedImage
    })
  )

  return {
    images: extendedImages,
    totalCount,
  }
}
