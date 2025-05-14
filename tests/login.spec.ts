import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';


test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('invalid_user', 'wrong_pass');
    await expect(await login.getErrorMessage()).toBeVisible();
  });
});
