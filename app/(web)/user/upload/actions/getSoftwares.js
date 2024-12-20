'use server'

import { createClient } from '@/app/supabase/server'

export async function getSoftwares() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('softwares')
      .select('*')
      .order('name', { ascending: true })
    if (error) {
      throw error
    }
    return { status: 'success', data }
  } catch (error) {
    return {
      status: 'error',
      message: error.message || `Unexpected error fetching data from softwares`,
    }
  }
}
