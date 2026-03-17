import { test, expect } from '../../fixtures/ui.fixture';
import { BenefitsPage } from '../../pages/benefits.page';
import { EmployeeFactory } from '../../test-data/employee.factory';

test.describe('Add Employee', () => {

  test('user can add employee', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);
    const employee = EmployeeFactory.createEmployee();

   await test.step('Open Benefits page', async () => {
      await benefitsPage.goto();
    });

    await test.step('Open Add Employee modal', async () => {
      await benefitsPage.openAddEmployeeModal();
    });

    await test.step('Fill employee form', async () => {
      await benefitsPage.fillEmployeeForm(
        employee.firstName,
        employee.lastName,
        employee.dependents.toString()
      );
    });

    await test.step('Submit employee', async () => {
      await benefitsPage.submitEmployee();
    });

    await test.step('Verify employee appears in table', async () => {
      await expect(
        benefitsPage.employeeRow(employee.firstName)
      ).toBeVisible();
    });

  });

});