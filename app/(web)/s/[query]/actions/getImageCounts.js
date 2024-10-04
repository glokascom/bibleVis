import { supabaseService } from '@/app/supabase/service'

export const getImageCounts = async (query) => {
  try {
    const formattedQuery = query
      .split(/[\s,]+/)
      .filter((word) => word.trim().length > 0)
      .join(' | ')

    const { data: totalImages, error: totalError } = await supabaseService
      .from('images')
      .select('id', { count: 'exact' })
      .textSearch('fts', formattedQuery)

    if (totalError) throw totalError

    const { data: aiImages, error: aiError } = await supabaseService
      .from('images')
      .select('id', { count: 'exact' })
      .eq('is_ai_generated', true)
      .textSearch('fts', formattedQuery)

    if (aiError) throw aiError

    const { data: humanImages, error: humanError } = await supabaseService
      .from('images')
      .select('id', { count: 'exact' })
      .eq('is_ai_generated', false)
      .textSearch('fts', formattedQuery)

    if (humanError) throw humanError

    return {
      counters: {
        total: totalImages.length,
        aiGenerated: aiImages.length,
        humanMade: humanImages.length,
      },
    }
  } catch (error) {
    console.error('Error fetching image stats:', error)
    return { total: 0, aiGenerated: 0, humanMade: 0 }
  }
}
