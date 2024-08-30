import { supabaseService } from '@/app/supabase/service'

export const insertImage = async (imageData) => {
  const { data, error } = await supabaseService.from('images').insert([
    {
      ...imageData,
    },
  ])
  if (error) {
    throw new Error(error.message)
  }

  return data
}
