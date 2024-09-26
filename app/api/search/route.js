import { HfInference } from '@huggingface/inference'

import { createClient } from '@/app/supabase/server'

export async function POST(req) {
  const { query } = await req.json()
  const supabase = createClient()

  if (!query) {
    return new Response(JSON.stringify({ error: 'Необходимо указать запрос.' }), {
      status: 400,
    })
  }

  try {
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)
    const embeddings = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: query,
    })

    let embeddingArray = embeddings

    if (Array.isArray(embeddings) && Array.isArray(embeddings[0])) {
      embeddingArray = embeddings[0]
    }

    console.log('Query Embedding:', embeddingArray)

    if (!Array.isArray(embeddingArray)) {
      throw new Error('Полученные эмбеддинги имеют неправильный формат.')
    }

    const { data, error } = await supabase.rpc('search_images', {
      query_embedding: embeddingArray,
      threshold: 0.1,
    })

    console.log('Supabase Response:', { data, error })

    if (error) {
      console.error('Error from Supabase:', error)
      return new Response(JSON.stringify({ error: 'Ошибка выполнения запроса.' }), {
        status: 500,
      })
    }

    return new Response(JSON.stringify({ images: data }), { status: 200 })
  } catch (error) {
    console.error('Ошибка в обработке запроса:', error.message)
    return new Response(
      JSON.stringify({
        error: `Не удалось выполнить семантический поиск: ${error.message}`,
      }),
      { status: 500 }
    )
  }
}
