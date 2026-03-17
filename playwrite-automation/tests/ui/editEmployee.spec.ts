import { test, expect } from '../../fixtures/test.fixture';
import { BenefitsPage } from '../../pages/benefits.page';
import { EmployeeFactory } from '../../test-data/employee.factory';

test.describe('Edit Employee', () => {

  test('user can update employee', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);
    const employee = EmployeeFactory.createEmployee();

    await test.step('Open Benefits page', async () => {
      await benefitsPage.goto();
    });

    await test.step('Open edit employee modal', async () => {
      await benefitsPage.openEditEmployee();
    });

    await test.step('Update employee data', async () => {
      await benefitsPage.updateEmployee(
        employee.firstName,
        employee.lastName,
        employee.dependents.toString()
      );
    });

    await test.step('Verify employee updated in table', async () => {
      await expect(
        benefitsPage.employeeRow(employee.firstName)
      ).toBeVisible();
    });

  });

});