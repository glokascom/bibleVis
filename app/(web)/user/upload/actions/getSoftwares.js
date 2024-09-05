import { supabaseService } from '@/app/supabase/service'

export async function getDataFromTable(tableName) {
  try {
    const { data, error } = await supabaseService.from(tableName).select('*')

    if (error) {
      console.error(`Error fetching data from ${tableName}:`, error)
      return { status: 500, error: `Error fetching data from ${tableName}` }
    }
    return { status: 200, data }
  } catch (error) {
    console.error(`Unexpected error fetching data from ${tableName}:`, error)
    return { status: 500, error: `Unexpected error fetching data from ${tableName}` }
  }
}
