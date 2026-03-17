import { test, expect } from '../../fixtures/test.fixture';
import { BenefitsPage } from '../../pages/benefits.page';
import { EmployeeFactory } from '../../test-data/employee.factory';

test.describe('Delete Employee', () => {

  let employee: any;
  let employeeId: string;

  test.beforeEach(async ({ employeeClient }) => {

    const created = await employeeClient.createEmployee(
      EmployeeFactory.createEmployee()
    );

    const body = await created.json();

    employee = body;
    employeeId = body.id;

  });

  test.afterEach(async ({ employeeClient }) => {

    if (employeeId) {
      await employeeClient.deleteEmployee(employeeId);
    }

  });

  test('user can delete employee', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);

    await benefitsPage.waitForPageLoaded();

    await benefitsPage.openDeleteEmployee(employee.firstName);

    await benefitsPage.confirmDeleteEmployee();

    await expect(
      benefitsPage.employeeRow(employee.firstName)
    ).not.toBeVisible();

    employeeId = '';
  });

});