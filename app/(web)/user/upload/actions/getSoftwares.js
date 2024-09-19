'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/app/supabase/server'

export async function getSoftwares() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('softwares')
      .select('*')
      .order('name', { ascending: true })
    if (error) {
      console.error(`Error fetching data from softwares:`, error)
      return { status: 500, error: `Error fetching data from softwares` }
    }
    return { status: 200, data }
  } catch (error) {
    console.error(`Unexpected error fetching data from softwares:`, error)
    return { status: 500, error: `Unexpected error fetching data from softwares` }
  }
}

export async function getTags() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })
    if (error) {
      console.error(`Error fetching data from tags:`, error)
      return { status: 500, error: `Error fetching data from tags` }
    }
    return { status: 200, data }
  } catch (error) {
    console.error(`Unexpected error fetching data from tags:`, error)
    return { status: 500, error: `Unexpected error fetching data from tags` }
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
