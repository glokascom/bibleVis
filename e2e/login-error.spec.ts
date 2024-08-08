import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/en/login');
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('user@mail.com');
  await page.getByLabel('Email:').press('Tab');
  await page.getByLabel('Пароль:').fill('password');
  await page.getByRole('button', { name: 'Войти', exact: true }).click();
  await expect(page.getByRole('heading')).toContainText('Произошла ошибка');
});
