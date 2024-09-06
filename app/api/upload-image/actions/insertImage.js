import { supabaseService } from '@/app/supabase/service'

export const insertImage = async (imageData) => {
  const { data, error } = await supabaseService
    .from('images')
    .insert([
      {
        ...imageData,
      },
    ])
    .select('id')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateImage = async (imageId, updatedData) => {
  const { data, error } = await supabaseService
    .from('images')
    .update(updatedData)
    .match({ id: imageId })
    .select('id')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function addImageSoftware(imageId, softwareId) {
  const { data, error: selectError } = await supabaseService
    .from('image_softwares')
    .select('*')
    .eq('image_id', imageId)
    .eq('software_id', softwareId)

  if (selectError) {
    console.error('Error when fetching record:', selectError)
    return
  }

  if (data.length > 0) {
    return
  }

  const { error } = await supabaseService
    .from('image_softwares')
    .insert([{ image_id: imageId, software_id: softwareId }])

  if (error) {
    console.error('Error when adding a record:', error)
  }
}

export async function addTagIfNotExists(tagName) {
  let { data, error } = await supabaseService
    .from('tags')
    .select('id')
    .eq('name', tagName)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking the tag:', error)
    return null
  }

  if (data) {
    return data.id
  } else {
    const { data: newTag, error: insertError } = await supabaseService
      .from('tags')
      .insert([{ name: tagName }])
      .select('id')
      .single()

    if (insertError) {
      console.error('Error when adding a tag:', insertError)
      return null
    }

    return newTag.id
  }
}

export async function addImageTag(imageId, tagId) {
  let { data, error } = await supabaseService
    .from('image_tags')
    .select('*')
    .eq('image_id', imageId)
    .eq('tag_id', tagId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking image_tags connection:', error)
    return null
  }

  if (data) {
    return data
  } else {
    const { data: newImageTag, error: insertError } = await supabaseService
      .from('image_tags')
      .insert([{ image_id: imageId, tag_id: tagId }])
      .select('*')
      .single()

    if (insertError) {
      console.error('Error adding image_tags link:', insertError)
      return null
    }

    return newImageTag
  }
}

export async function tagImage(imageId, tagName) {
  const tagId = await addTagIfNotExists(tagName)

  if (!tagId) {
    console.error('Couldnt get or create a tag.')
    return null
  }

  const imageTag = await addImageTag(imageId, tagId)

  if (!imageTag) {
    console.error('Failed to add image_tags link.')
    return null
  }

  return imageTag
}
