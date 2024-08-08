import { expect, test } from '@playwright/test'

test.skip('user can log out successfully', async ({ page }) => {
  await page.goto('/en/private')

  // нажать на кнопку с текстом Выйти
  await page.getByRole('button', { name: 'Выйти', exact: true }).click()

  // Проверяем, что пользователь видит страницу логина или сообщение о успешном выходе
  await expect(page.getByText('You have been logged out')).toBeVisible()
})
