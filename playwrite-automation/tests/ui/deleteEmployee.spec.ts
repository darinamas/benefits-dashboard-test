import { test, expect } from '../../fixtures/ui.fixture';
import { BenefitsPage } from '../../pages/benefits.page';

test.describe('Delete Employee', () => {

  test('user can delete employee', async ({ page }) => {

    const benefitsPage = new BenefitsPage(page);

    await test.step('Open Benefits page', async () => {
      await benefitsPage.goto();
    });

    await test.step('Open delete employee modal', async () => {
      await benefitsPage.openDeleteEmployee();
    });

    await test.step('Confirm employee deletion', async () => {
      await benefitsPage.confirmDeleteEmployee();
    });

    await test.step('Verify delete modal closed', async () => {
      await expect(benefitsPage.deleteModal).toBeHidden();
    });

  });

});