import { Page, Locator } from '@playwright/test';

export class BenefitsPage {

  readonly page: Page;

  readonly addEmployeeButton: Locator;
  readonly modal: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dependentsInput: Locator;

  readonly addButton: Locator;
  readonly employeesTable: Locator;
  readonly editButtons: Locator;

  readonly deleteButtons: Locator;
  readonly deleteModal: Locator;
  readonly deleteEmployeeButton: Locator;
  readonly updateButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addEmployeeButton = page.locator('#add');
    this.modal = page.locator('#employeeModal');

    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.dependentsInput = page.locator('#dependants');

    this.addButton = page.locator('#addEmployee');

    this.employeesTable = page.locator('#employeesTable');
    this.editButtons = page.locator('.fa-edit');
    this.updateButton = page.locator('#updateEmployee');

    this.deleteButtons = page.locator('.fa-times');
    this.deleteModal = page.locator('#deleteModal');
    this.deleteEmployeeButton = page.locator('#deleteEmployee');

  }

  async goto() {
    await this.page.goto('Benefits');
  }

  async waitForPageLoaded() {
    await this.addEmployeeButton.waitFor({ state: 'visible' });
    await this.page.getByRole('link', { name: 'Log Out' }).waitFor({ state: 'visible' });
  }

  async openAddEmployeeModal() {
    await this.page.getByRole('link', { name: 'Log Out' }).waitFor({ state: 'visible' });
    await this.addEmployeeButton.click();
    await this.modal.waitFor({ state: 'visible' });
  }

  async fillEmployeeForm(firstName: string, lastName: string, dependents: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dependentsInput.fill(dependents);
  }

  async submitEmployee() {
    await this.addButton.waitFor({ state: 'visible' });
    await this.addButton.click();
    await this.modal.waitFor({ state: 'hidden' });
  }

  async openEditEmployee(firstName: string) {
    const row = this.page.locator('#employeesTable tbody tr', {
      has: this.page.locator(`td:nth-child(2):has-text("${firstName}")`)
    });

    await row.locator('.fa-edit').click();
    await this.modal.waitFor({ state: 'visible' });
  }

  async updateEmployee(firstName: string, lastName: string, dependents: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dependentsInput.fill(dependents);
    await this.updateButton.click();
    await this.modal.waitFor({ state: 'hidden' });
  }

  async openDeleteEmployee(firstName: string) {
    const row = this.page.locator('#employeesTable tbody tr', {
      has: this.page.locator(`td:nth-child(2):has-text("${firstName}")`)
    });

    await row.locator('.fa-times').click();
    await this.deleteModal.waitFor({ state: 'visible' });
  }

  async confirmDeleteEmployee() {
    await this.deleteEmployeeButton.click();
    await this.deleteModal.waitFor({ state: 'hidden' });
  }

  employeeRow(firstName: string) {
    return this.employeesTable.locator('tr', { hasText: firstName });
  }

}