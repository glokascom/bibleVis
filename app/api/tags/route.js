import { NextResponse } from 'next/server'

import { supabaseService } from '@/app/supabase/service'

async function getAllTags() {
  const { data: tags, error } = await supabaseService.from('tags').select('*')
  if (error) {
    throw new Error('Failed to fetch current tags')
  }

  return tags
}

export async function GET() {
  try {
    const tags = await getAllTags()

    return NextResponse.json({ tags })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
