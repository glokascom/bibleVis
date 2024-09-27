//TODO: delete on release. This is just for testing
'use client'

import { useState } from 'react'

import Image from 'next/image'

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const searchImages = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
    const data = await res.json()
    setResults(data)
  }

  return (
    <div>
      <form onSubmit={searchImages}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск изображений..."
        />
        <button type="submit">Поиск</button>
      </form>
      <div>
        {results.map((result) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <Image src={result.url} alt={result.title} width={300} height={200} />
          </div>
        ))}
      </div>
    </div>
  )
}
