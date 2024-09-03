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

export async function addImageSoftware(image_id, software_id) {
  const { data, error } = await supabaseService
    .from('image_softwares')
    .insert([{ image_id: image_id, software_id: software_id }])

  if (error) {
    console.error('Error when adding a record:', error)
  } else {
    console.log('The entry was successfully added:', data)
  }
}
