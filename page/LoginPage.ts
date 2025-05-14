import { Page } from '@playwright/test';

// Page Object Model for Login Page
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async getErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}
