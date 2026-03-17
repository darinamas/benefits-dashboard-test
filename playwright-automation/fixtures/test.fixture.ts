import { test as base, expect, request, APIRequestContext, Page } from '@playwright/test';
import { env } from '../config/env';
import { EmployeeClient } from '../api/clients/employee.client';
import { createTestEmployee } from '../utils/employee.helper';
import { LoginPage } from '../pages/login.page';

type Fixtures = {
  api: APIRequestContext
  employeeClient: EmployeeClient
  employee: {
    id: string
    data: any
  }
  page: Page
}

export const test = base.extend<Fixtures>({

  // ---------- UI LOGIN ----------
  page: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      env.USERNAME,
      env.PASSWORD
    );

    await page.waitForURL('**/Benefits');

    await use(page);
  },


  // ---------- API CONTEXT ----------
  api: async ({}, use) => {

    const api = await request.newContext({
      baseURL: env.BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Basic ${env.AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    await use(api);

    await api.dispose();
  },


  // ---------- API CLIENT ----------
  employeeClient: async ({ api }, use) => {

    const client = new EmployeeClient(api);

    await use(client);
  },


  // ---------- TEST EMPLOYEE ----------
  employee: async ({ employeeClient }, use) => {

    const created = await createTestEmployee(employeeClient);

    await use({
      id: created.id,
      data: created.employee
    });

    await employeeClient.deleteEmployee(created.id);
  }

});

export { expect };