import { expect, test } from '@playwright/test'

test('should navigate to the about page and back to the home page with localization', async ({
  page,
}) => {
  const lng = 'en'
  const baseURL = `/${lng}`

  // Переход на главную страницу с учетом локализации
  await page.goto(baseURL)

  // Проверка заголовка на главной странице
  await expect(page.locator('h1')).toHaveText('Welcome to Home Page')

  // Клик по ссылке "About"
  await page.click('text=About')

  // Проверка, что новый URL включает локализацию и это "/about"
  await expect(page).toHaveURL(`${baseURL}/about`)

  // Проверка заголовка на странице "About"
  await expect(page.locator('h1')).toHaveText('About')

  // Клик по ссылке "Home"
  await page.click('text=Home')

  // Проверка, что новый URL это "/"
  await expect(page).toHaveURL(baseURL)
})
