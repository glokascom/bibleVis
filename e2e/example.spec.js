import { expect, test } from '@playwright/test'

test('should navigate to the home page and display the title correctly', async ({
  page,
}) => {
  await page.goto('/en')
  await expect(page).toHaveTitle('Home Page')
  const header = page.locator('h1')
  await expect(header).toHaveText('Welcome to Home Page')
  await expect(page.locator('a[href="/about"]')).toHaveText('About')
})
