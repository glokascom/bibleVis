import { supabaseService } from '@/app/supabase/service'

export async function getSoftwares() {
  try {
    const { data, error } = await supabaseService.from('softwares').select('*')

    if (error) {
      console.error('Error fetching data:', error)
      return { status: 500, error: 'Error fetching data' }
    }
    return { status: 200, data }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { status: 500, error: 'Unexpected error' }
  }
}

export async function getTags() {
  try {
    const { data, error } = await supabaseService.from('tags').select('*')

    if (error) {
      console.error('Error fetching data:', error)
      return { status: 500, error: 'Error fetching data' }
    }
    return { status: 200, data }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { status: 500, error: 'Unexpected error' }
  }
}
