import { describe, expect, it } from 'vitest'

import { sum } from '@/app/helpers/sum'

describe('sum', () => {
  it('calculates the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
