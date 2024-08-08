import { describe, expect, it } from 'vitest'

describe('first block of tests', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })

  it.skip('should fail', () => {
    expect(true).toBe(false)
  })
})

describe('second block of tests', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })

  it.skip('should fail', () => {
    expect(true).toBe(false)
  })
})
