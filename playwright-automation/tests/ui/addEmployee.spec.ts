import { test, expect } from '../../fixtures/test.fixture';
import { BenefitsPage } from '../../pages/benefits.page';
import { EmployeeFactory } from '../../test-data/employee.factory';

test.describe('Add Employee', () => {

  test('user can add employee', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);
    const employee = EmployeeFactory.createEmployee();

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
      const row = benefitsPage.employeeRow(employee.firstName);

      await expect(row).toBeVisible();
      await expect(row).toContainText(employee.lastName);
    });

  });


  test('benefit calculation is correct for employee with 0 dependents', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);

    const employee = EmployeeFactory.createEmployee({ dependents: 0 });

    await benefitsPage.openAddEmployeeModal();

    await benefitsPage.fillEmployeeForm(
      employee.firstName,
      employee.lastName,
      employee.dependents.toString()
    );

    await benefitsPage.submitEmployee();

    const row = benefitsPage.employeeRow(employee.firstName);

    await expect(row).toBeVisible();
    await expect(row).toContainText('0');
    await expect(row).toContainText('2000.00');
    await expect(row).toContainText('38.46');
    await expect(row).toContainText('1961.54');

  });


  test('benefit calculation is correct for employee with 1 dependent', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);

    const employee = EmployeeFactory.createEmployee({ dependents: 1 });

    await benefitsPage.openAddEmployeeModal();

    await benefitsPage.fillEmployeeForm(
      employee.firstName,
      employee.lastName,
      employee.dependents.toString()
    );

    await benefitsPage.submitEmployee();

    const row = benefitsPage.employeeRow(employee.firstName);

    await expect(row).toBeVisible();
    await expect(row).toContainText('1');
    await expect(row).toContainText('57.69');
    await expect(row).toContainText('1942.31');

  });


  test('benefit calculation is correct for employee with 4 dependents', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);

    const employee = EmployeeFactory.createEmployee({ dependents: 4 });

    await benefitsPage.openAddEmployeeModal();

    await benefitsPage.fillEmployeeForm(
      employee.firstName,
      employee.lastName,
      employee.dependents.toString()
    );

    await benefitsPage.submitEmployee();

    const row = benefitsPage.employeeRow(employee.firstName);

    await expect(row).toBeVisible();
    await expect(row).toContainText('4');
    await expect(row).toContainText('115.38');
    await expect(row).toContainText('1884.62');

  });


  test('benefit calculation is correct for employee with maximum dependents (32)', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);

    const employee = EmployeeFactory.createEmployee({ dependents: 32 });

    await benefitsPage.openAddEmployeeModal();

    await benefitsPage.fillEmployeeForm(
      employee.firstName,
      employee.lastName,
      employee.dependents.toString()
    );

    await benefitsPage.submitEmployee();

    const row = benefitsPage.employeeRow(employee.firstName);

    await expect(row).toBeVisible();
    await expect(row).toContainText('32');
    await expect(row).toContainText('653.85');
    await expect(row).toContainText('1346.15');

  });

});