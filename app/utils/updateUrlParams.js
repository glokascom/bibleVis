'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function useUrlParams(basePath) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateUrlParams = (params) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })
    router.push(`${basePath}?${newParams.toString()}`)
  }

  return { updateUrlParams, searchParams }
}
