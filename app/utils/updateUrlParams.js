'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function useUrlParams(basePath) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateUrlParams = (params) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.keys(params).forEach((key) => {
      if (params[key] === null || params[key] === undefined) {
        newParams.delete(key)
      } else {
        newParams.set(key, params[key])
      }
    })
    router.push(`${basePath}?${newParams.toString()}`)
  }

  return { updateUrlParams, searchParams }
}
