import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { geterroruserloginCredentials, getInvalidloginCredentials, getlockedoutuserloginCredentials, getloginCredentials, getperformanceglitchuserloginCredentials, getproblemuserloginCredentials, getvisualuserloginCredentials } from '../utility/testData';
import { ERROR_MESSAGES } from '../utility/constants/messages';

test.describe('Login Tests with different user', () => {
  test('TC_LOGIN_001 || Verify successful login with valid credentials', async ({ page }) => {
    const loginData = getloginCredentials()
    const login = new LoginPage(page);
    await login.goto();
    await login.login(loginData.username, loginData.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_LOGIN_002 || Verify login with locked out user', async ({ page }) => {
    const loginData = getlockedoutuserloginCredentials()
    const login = new LoginPage(page);
    await login.goto();
    await login.login(loginData.username, loginData.password);
    const errorMessage = await login.getErrorMessage();
    await expect(await login.getErrorMessage()).toBeVisible();
    await expect(errorMessage).toHaveText(ERROR_MESSAGES.LOGIN_WITH_LOCKED_OUT_USER_CREDENTIALS);
  });

  test('TC_LOGIN_003 || Verify login with problem user', async ({ page }) => {
    const loginData = getproblemuserloginCredentials()
    const login = new LoginPage(page);
    await login.goto();
    await login.login(loginData.username, loginData.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_LOGIN_003 || Verify login with performance_glitch_user', async ({ page }) => {
    const loginData = getperformanceglitchuserloginCredentials()
    const login = new LoginPage(page);
    await login.goto();
    await login.login(loginData.username, loginData.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_LOGIN_003 || Verify login with error_user', async ({ page }) => {
    const loginData = geterroruserloginCredentials()
    const login = new LoginPage(page);
    await login.goto();
    await login.login(loginData.username, loginData.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_LOGIN_003 || Verify login with visual_user', async ({ page }) => {
    const loginData = getvisualuserloginCredentials()
    const login = new LoginPage(page);
    await login.goto();
    await login.login(loginData.username, loginData.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC_LOGIN_004 || Verify error for blank username/password ', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    login.clickOnLoginButton()
    const errorMessage = await login.getErrorMessage();
    await expect(await login.getErrorMessage()).toBeVisible();
    await expect(errorMessage).toHaveText(ERROR_MESSAGES.LOGIN_WITHOUT_CREDENTIALS);    
  });

  test('TC_LOGIN_005 || should show error for invalid credentials', async ({ page }) => {
    const loginData = getInvalidloginCredentials()
    const login = new LoginPage(page);
    await login.goto();
    await login.login(loginData.Invalidusername, loginData.Invalidpassword);
    const errorMessage = await login.getErrorMessage();
    await expect(await login.getErrorMessage()).toBeVisible();
    await expect(errorMessage).toHaveText(ERROR_MESSAGES.INVALID_LOGIN);
  });
});
