import { expect, test } from '@playwright/test'

test.skip('fetches and displays user data', async ({ page }) => {
  await page.route('/api/user', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ id: 1, name: 'John Doe' }),
    })
  })

  await page.goto('https://example.com/user')

  // Ожидание загрузки данных
  await expect(page.getByText('Loading...')).toBeVisible()

  // Ожидание отображения данных пользователя
  await expect(page.getByText('John Doe')).toBeVisible()
})

test.skip('handles server error', async ({ page }) => {
  await page.route('/api/user', async (route) => {
    await route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Failed to fetch' }),
    })
  })

  await page.goto('https://example.com/user')

  // Ожидание загрузки данных
  await expect(page.getByText('Loading...')).toBeVisible()

  // Ожидание отображения ошибки
  await expect(page.getByText(/error/i)).toBeVisible()
})
