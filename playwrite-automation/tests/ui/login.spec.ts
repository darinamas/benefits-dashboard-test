import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { env } from '../../config/env';

test.describe('Login', () => {

  test('user can login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(env.USERNAME, env.PASSWORD);
    });

    await test.step('Verify user is redirected to dashboard', async () => {
      await expect(page).toHaveURL(/Benefits/);
    });

  });


  test('user cannot login with wrong password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt login with incorrect password', async () => {
      await loginPage.login(env.USERNAME, 'wrongPassword');
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage)
        .toContainText('The specified username or password is incorrect.');
    });

  });


  test('user cannot login with empty password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
    });

    await test.step('Enter username only', async () => {
      await loginPage.username.fill(env.USERNAME);
    });

    await test.step('Submit login form', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('Verify password required validation message', async () => {
      await expect(loginPage.errorMessage)
        .toContainText('The Password field is required.');
    });

  });

});