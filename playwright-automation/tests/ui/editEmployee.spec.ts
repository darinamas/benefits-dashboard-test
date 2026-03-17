import { test, expect } from '../../fixtures/test.fixture';
import { BenefitsPage } from '../../pages/benefits.page';
import { EmployeeFactory } from '../../test-data/employee.factory';

test.describe('Edit Employee', () => {

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

  test('user can update employee', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);
    const updatedEmployee = EmployeeFactory.createEmployee();

    await benefitsPage.waitForPageLoaded();

    await benefitsPage.openEditEmployee(employee.firstName);

    await benefitsPage.updateEmployee(
      updatedEmployee.firstName,
      updatedEmployee.lastName,
      updatedEmployee.dependents.toString()
    );

    await expect(
      benefitsPage.employeeRow(updatedEmployee.firstName)
    ).toBeVisible();

  });

});