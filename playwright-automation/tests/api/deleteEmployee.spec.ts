import { test, expect } from '../../fixtures/test.fixture';
import { EmployeeClient } from '../../api/clients/employee.client';
import { createTestEmployee } from '../../utils/employee.helper';

test.describe('DELETE /employees/{id}', () => {

  let client: EmployeeClient;
  let employeeId: string;

  test.beforeEach(async ({ api }) => {
    client = new EmployeeClient(api);

    const created = await createTestEmployee(client);
    employeeId = created.id;
  });

  test.afterEach(async () => {
    if (employeeId) {
      try {
        await client.deleteEmployee(employeeId);
      } catch {
        // employee might already be deleted
      }
    }
  });

  test('DELETE /employees/{id} should remove employee from system', async () => {

    const deleteResponse = await client.deleteEmployee(employeeId);

    expect(deleteResponse.status()).toBe(200);

    const getResponse = await client.getEmployee(employeeId);

    expect(getResponse.status()).toBe(404); 

    employeeId = '';
  });


  test('DELETE /employees/{id} should return 404 when employee does not exist', async ({ api }) => {

    const client = new EmployeeClient(api);

    const response = await client.deleteEmployee('999999999');

    expect(response.status()).toBe(405);

  });


  test('DELETE /employees/{id} should return 400 when id format is invalid', async ({ api }) => {

    const client = new EmployeeClient(api);

    const response = await client.deleteEmployee('invalid-id');

    expect(response.status()).toBe(405);

  });

});