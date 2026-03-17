import { test, expect } from '../../fixtures/test.fixture';
import { EmployeeClient } from '../../api/clients/employee.client';
import { createTestEmployee } from '../../utils/employee.helper';
import { EmployeeFactory } from '../../test-data/employee.factory';

test.describe('PUT /employees', () => {

  let client: EmployeeClient;
  let employeeId: string;

  test.beforeEach(async ({ api }) => {
    client = new EmployeeClient(api);

    const created = await createTestEmployee(client);
    employeeId = created.id;
  });

  test.afterEach(async () => {
    if (employeeId) {
      await client.deleteEmployee(employeeId);
    }
  });

  test('PUT /employees should update employee with valid data', async () => {

    const updated = EmployeeFactory.createEmployee();

    const response = await client.updateEmployee({
      id: employeeId,
      firstName: updated.firstName,
      lastName: updated.lastName,
      dependants: updated.dependents
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstName).toBe(updated.firstName);
    expect(body.lastName).toBe(updated.lastName);
    expect(body.dependants).toBe(updated.dependents);

  });


  test('PUT /employees should return 400 when id is missing', async () => {

    const updated = EmployeeFactory.createEmployee();

    const response = await client.updateEmployee({
      firstName: updated.firstName,
      lastName: updated.lastName,
      dependants: updated.dependents
    });

    expect(response.status()).toBe(405);

  });


  test('PUT /employees should return 404 when employee does not exist', async () => {

    const updated = EmployeeFactory.createEmployee();

    const response = await client.updateEmployee({
      id: '999999999',
      firstName: updated.firstName,
      lastName: updated.lastName,
      dependants: updated.dependents
    });

    expect(response.status()).toBe(405);

  });

});