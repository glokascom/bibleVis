import { expect, test } from '@playwright/test'

test('form submission works correctly', async ({ page }) => {
  // Открываем страницу с формой
  await page.goto('/en/form')

  // Заполняем поля формы
  await page.fill('input[type="email"]', 'user@mail.com')
  await page.fill('input[type="password"]', '123456')

  // Отправляем форму
  await page.click('button[type="submit"]')

  const message = page.locator('.message')
  await expect(message).toHaveText('Success!')
})

test('form submission works incorrect', async ({ page }) => {
  // Открываем страницу с формой
  await page.goto('/en/form')

  // Заполняем поля формы
  await page.fill('input[type="email"]', 'user@mail.com')
  await page.fill('input[type="password"]', '321321')

  // Отправляем форму
  await page.click('button[type="submit"]')

  const message = page.locator('.message')
  await expect(message).toHaveText('Incorrect email or password')
})
