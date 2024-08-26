import { expect, test } from '@playwright/test'

const pages = [
  '',
  '@username',
  'login',
  'forgot-password',
  'new-password',
  'register',
  'image/{title}-{uuid}',
  //  'user/upload',
  //  'user/{uuid}',
  //  'user/edit',
  'pages/license',
  'pages/toc',
  'pages/tou',
  'pages/submition',
  's',
]

async function disableCache(page) {
  await page.route('**/*', (route) => {
    route.continue({
      headers: {
        ...route.request().headers(),
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })
  })
}

async function testPageLoad(browserPage, pagePath) {
  const testPage = pagePath
    .replace('{title}', 'test-title')
    .replace('{uuid}', '123e4567-e89b-12d3-a456-426614174000')

  await disableCache(browserPage)

  const response = await browserPage.goto(`http://localhost:3000/${testPage}`)

  expect(response.status()).toBe(200)
  await expect(browserPage).toHaveURL(`http://localhost:3000/${testPage}`)
}

test.describe(`Page routing`, () => {
  pages.forEach((pagePath) => {
    test(`should load ${pagePath} page`, async ({ page: browserPage }) => {
      await testPageLoad(browserPage, pagePath)
    })
  })
})
