'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/app/supabase/server'

export async function getDataFromTable(tableName) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('name', { ascending: true })
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

export async function updateLayout() {
  try {
    revalidatePath('/', 'layout')
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function updateUploadImage() {
  try {
    revalidatePath('/upload-image', 'layout')
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}
