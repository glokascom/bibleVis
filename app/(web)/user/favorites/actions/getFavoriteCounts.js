'use server'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export const getFavoriteCounts = async () => {
  try {
    const { user } = await getUser()

    const { data: likes } = await supabaseService
      .from('likes')
      .select('image_id')
      .eq('user_id', user.id)

    if (!likes?.length) {
      return {
        counters: {
          total: 0,
          aiGenerated: 0,
          humanMade: 0,
        },
      }
    }

    const likedImageIds = likes.map((like) => like.image_id)

    const { data: totalImages, error: totalError } = await supabaseService
      .from('images')
      .select('id', { count: 'exact' })
      .in('id', likedImageIds)

    if (totalError) throw totalError

    const totalImagesCount = totalImages ? totalImages.length : 0

    const { data: aiImages, error: aiError } = await supabaseService
      .from('images')
      .select('id', { count: 'exact' })
      .in('id', likedImageIds)
      .eq('is_ai_generated', true)

    if (aiError) throw aiError

    const aiImagesCount = aiImages ? aiImages.length : 0

    const humanMadeCount = totalImagesCount - aiImagesCount

    return {
      counters: {
        total: totalImagesCount,
        aiGenerated: aiImagesCount,
        humanMade: humanMadeCount >= 0 ? humanMadeCount : 0,
      },
    }
  } catch (error) {
    console.error('Error fetching image stats:', error)
    return {
      counters: {
        total: 0,
        aiGenerated: 0,
        humanMade: 0,
      },
    }
  }
}
