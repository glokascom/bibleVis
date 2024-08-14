import { expect, test } from '@playwright/test'

const locales = ['en']
const pages = [
  '',
  '/@username',
  '/login',
  '/forgot-password',
  '/new-password',
  '/register',
  '/image/{title}-{uuid}',
  '/user/upload',
  '/user/{uuid}',
  '/user/edit',
  '/pages/license',
  '/pages/toc',
  '/pages/tou',
  '/pages/submition1',
  '/s',
]

locales.forEach((locale) => {
  pages.forEach((page) => {
    test(`should load ${locale}${page} page`, async ({ page: browserPage }) => {
      const testPage = page
        .replace('{title}', 'test-title')
        .replace('{uuid}', '123e4567-e89b-12d3-a456-426614174000')

      await browserPage.goto(`http://localhost:3000/${locale}${testPage}`)

      await expect(browserPage).toHaveURL(`http://localhost:3000/${locale}${testPage}`)
      await expect(browserPage.locator('body')).toBeVisible()
    })
  })
})
