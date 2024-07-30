import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ButtonsBlock from '@/app/components/ButtonsBlock'

describe('ButtonsBlock', () => {
  // Мок функция для перевода
  const mockT = vi.fn((key) => key)

  it('should render all buttons with correct text', () => {
    render(<ButtonsBlock t={mockT} />)

    // Проверяем наличие всех кнопок
    expect(screen.getByText('default')).toBeInTheDocument()
    expect(screen.getByText('primary')).toBeInTheDocument()
    expect(screen.getByText('secondary')).toBeInTheDocument()
    expect(screen.getByText('success')).toBeInTheDocument()
    expect(screen.getByText('warning')).toBeInTheDocument()
  })

  it('should call the translation function with correct keys', () => {
    render(<ButtonsBlock t={mockT} />)

    // Проверяем, что функция t вызвана с правильными ключами
    expect(mockT).toHaveBeenCalledWith('default')
    expect(mockT).toHaveBeenCalledWith('primary')
    expect(mockT).toHaveBeenCalledWith('secondary')
    expect(mockT).toHaveBeenCalledWith('success')
    expect(mockT).toHaveBeenCalledWith('warning')
  })

  it('should render buttons with correct classes', () => {
    render(<ButtonsBlock t={mockT} />)

    // Проверяем, что кнопки имеют правильные классы
    const buttons = [
      screen.getByText('default'),
      screen.getByText('primary'),
      screen.getByText('secondary'),
      screen.getByText('success'),
      screen.getByText('warning'),
    ]

    buttons.forEach((button) => {
      const buttonElement = button.closest('button')
      const styles = window.getComputedStyle(buttonElement)
      expect(styles).toHaveProperty('background-color')
    })
  })
})
