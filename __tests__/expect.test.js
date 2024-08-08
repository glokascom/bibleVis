import { describe, expect, it, vi } from 'vitest'

describe('expect', () => {
  it('toBe', () => {
    expect(15).toBe(15)
  })

  it('toEqual', () => {
    const user = {
      name: 'John',
      age: 30,
    }
    expect(user).toEqual({
      name: 'John',
      age: 30,
    })
  })

  it('toContain', () => {
    const array = [1, 2, 3]
    expect(array).toContain(2)
  })

  it('toMatch', () => {
    const string = 'Hello, World!'
    expect(string).toMatch(/Hello/)
  })

  it('toThrow', () => {
    function myFunc() {
      throw new Error('Something went wrong')
    }
    expect(myFunc).toThrow()
  })

  it('toThrow with message', () => {
    function throwError() {
      throw new Error('Something went wrong')
    }
    expect(throwError).toThrow('Something went wrong')
  })

  it('toHaveLength', () => {
    const array = [1, 2, 3]
    expect(array).toHaveLength(3)
  })

  it('toHaveProperty', () => {
    const user = {
      name: 'John',
      age: 30,
    }
    expect(user).toHaveProperty('name')
  })

  it('toHaveProperty with value', () => {
    const user = {
      name: 'John',
      age: 30,
    }
    expect(user).toHaveProperty('name', 'John')
  })

  it('toMatchObject', () => {
    const user = {
      name: 'John',
      age: 30,
    }
    expect(user).toMatchObject({
      name: 'John',
    })
  })

  it('toBeCloseTo', () => {
    const number = 0.1 + 0.2
    const number2 = 9 / 3 / 3
    expect(number).toBeCloseTo(0.3)
    expect(number2).toBeCloseTo(1)
  })

  it('toBeDefined', () => {
    const variable = null
    expect(variable).toBeDefined()
  })

  it('toBeUndefined', () => {
    let variable
    expect(variable).toBeUndefined()
  })

  it('toHaveBeenCalledOnce', () => {
    const mockFn = vi.fn()
    mockFn('Hello')
    expect(mockFn).toHaveBeenCalledOnce()
  })

  it('toHaveBeenCalledWith', () => {
    const mockFn = vi.fn()
    mockFn('Hello')
    expect(mockFn).toHaveBeenCalledWith('Hello')
  })

  it('toHaveBeenCalled', () => {
    const mockFn = vi.fn()
    mockFn('Hello')
    expect(mockFn).toHaveBeenCalled()
  })

  it('toHaveBeenCalledTimes', () => {
    const mockFn = vi.fn()
    mockFn('Hello')
    mockFn('Hello')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })
})
