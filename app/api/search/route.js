import { NextResponse } from 'next/server'

import { supabaseService } from '@/app/supabase/service'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') || ''

  const formattedQuery = query
    .split(/[\s,]+/)
    .filter((word) => word.trim().length > 0)
    .join(' | ')

  console.log(formattedQuery, 8)

  const { data, error } = await supabaseService
    .from('images')
    .select()
    .textSearch('fts', formattedQuery)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}
