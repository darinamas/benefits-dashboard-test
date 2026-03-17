import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { env } from '../config/env';

export const test = base.extend({

  page: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(env.USERNAME, env.PASSWORD);
    
    await page.waitForURL(/Benefits/);
    
    await use(page);

  }

});

export { expect };