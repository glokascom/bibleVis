import { supabaseService } from '@/app/supabase/service'

export async function getSoftwares() {
  try {
    const { data, error } = await supabaseService.from('softwares').select('*')

    if (error) {
      console.error('Error fetching data:', error)
      return { status: 500, body: 'Error fetching data' }
    }
    return { status: 200, body: data }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { status: 500, body: 'Unexpected error' }
  }
}
