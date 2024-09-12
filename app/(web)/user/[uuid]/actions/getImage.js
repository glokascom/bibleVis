import { supabaseService } from '@/app/supabase/service'

export async function getImageInfoById(imageId) {
  try {
    const { data: image, error: fetchError } = await supabaseService
      .from('images')
      .select('*, users(id,username,avatar_file_path,total_followers)')
      .eq('id', imageId)
      .single()

    if (fetchError) {
      return { error: fetchError, data: null }
    }

    const imagePath = image.original_file_path
      ? `${process.env.STORAGE_URL}/object/public/profile/${image.original_file_path}`
      : null

    const avatarUrl = image.users?.avatar_file_path
      ? `${process.env.STORAGE_URL}/object/public/profile/${image.users.avatar_file_path}`
      : null

    const updatedUsers = {
      ...image.users,
      avatarUrl,
    }

    const { data: tagsData, error: tagsError } = await supabaseService
      .from('image_tags')
      .select('tag_id, tags(id, name)')
      .eq('image_id', imageId)

    if (tagsError) {
      return { error: tagsError, data: null }
    }

    const tags = tagsData
      ? tagsData.map((tag) => ({
          id: tag.tags.id,
          name: tag.tags.name,
        }))
      : []

    const { data: softwareData, error: softwareError } = await supabaseService
      .from('image_softwares')
      .select('software_id, softwares(id, name)')
      .eq('image_id', imageId)

    if (softwareError) {
      return { error: softwareError, data: null }
    }

    const software = softwareData
      ? softwareData.map((soft) => ({
          id: soft.softwares.id,
          name: soft.softwares.name,
        }))
      : []

    return {
      error: null,
      data: {
        ...image,
        tags: tags,
        software: software,
        imagePath: imagePath,
        users: updatedUsers,
      },
    }
  } catch (error) {
    console.error('Error fetching image info:', error.message)
    return { error, data: null }
  }
}
