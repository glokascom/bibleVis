'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { createPortal } from 'react-dom'

import { BVInput } from './BVInput'

function formatSearchQuery(query: string) {
  if (!query) return ''
  return encodeURIComponent(query.replace(/\s+/g, '-'))
}

function HeroBlock() {
  const [isMounted, setIsMounted] = useState(false)
  const [search, setSearch] = useState('')
  const { push } = useRouter()
  const handleSearch = () => {
    if (!search.trim()) return
    push(`/s/${formatSearchQuery(search.trim())}`)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    document &&
    document?.getElementById('hero-block') &&
    createPortal(
      <div
        className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-0 after:bg-black/20"
        style={{
          background: "url('/jesus.webp')",
          backgroundPosition: '50% 30%',
          backgroundSize: 'cover',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center px-6">
          <h2 className="mb-8 max-w-[750px] text-center text-3xl font-[600] text-white md:text-4xl">
            Лучшие бесплатные стоковые христианские изображения
          </h2>
          <BVInput
            classNames={{
              base: 'max-w-[670px] w-full',
              input: 'text-small md:text-medium',
            }}
            placeholder="Search free Bible and Christian Images"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
            endContent={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 shrink-0 cursor-pointer py-3 pl-3 pr-4"
                onClick={handleSearch}
              >
                <path
                  d="M13.1465 11.5834H12.3236L12.0319 11.3021C13.2819 9.84379 13.9277 7.85421 13.5736 5.73962C13.084 2.84379 10.6673 0.531291 7.75065 0.177125C3.3444 -0.364542 -0.363932 3.34379 0.177735 7.75004C0.531902 10.6667 2.8444 13.0834 5.74024 13.573C7.85482 13.9271 9.8444 13.2813 11.3027 12.0313L11.584 12.323V13.1459L16.0111 17.573C16.4382 18 17.1361 18 17.5632 17.573C17.9902 17.1459 17.9902 16.448 17.5632 16.0209L13.1465 11.5834ZM6.89648 11.5834C4.30273 11.5834 2.20898 9.48962 2.20898 6.89587C2.20898 4.30212 4.30273 2.20837 6.89648 2.20837C9.49023 2.20837 11.584 4.30212 11.584 6.89587C11.584 9.48962 9.49023 11.5834 6.89648 11.5834Z"
                  fill="currentColor"
                />
              </svg>
            }
            type="search"
          />
        </div>
      </div>,
      document.getElementById('hero-block')!
    )
  )
}

export default HeroBlock
