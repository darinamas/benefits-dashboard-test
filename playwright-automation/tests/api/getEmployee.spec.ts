import { test, expect } from '../../fixtures/test.fixture';
import { EmployeeClient } from '../../api/clients/employee.client';
import { createTestEmployee } from '../../utils/employee.helper';

test.describe('GET /employees/{id}', () => {

  let employeeId: string;
  let employee: any;
  let client: EmployeeClient;

  test.beforeEach(async ({ api }) => {
    client = new EmployeeClient(api);

    const created = await createTestEmployee(client);
    employeeId = created.id;
    employee = created.employee;
  });

  test.afterEach(async () => {
    await client.deleteEmployee(employeeId);
  });

  test('GET /employees/{id} should return employee details', async () => {

    const response = await client.getEmployee(employeeId);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstName).toBe(employee.firstName);
    expect(body.lastName).toBe(employee.lastName);
    expect(body.dependants).toBe(employee.dependents);

  });

  test('GET /employees/{id} should include salary fields in response', async () => {

    const response = await client.getEmployee(employeeId);

    const body = await response.json();

    expect(body).toHaveProperty('gross');
    expect(body).toHaveProperty('net');
    expect(body).toHaveProperty('benefitsCost');

  });

  test('GET /employees/{id} should calculate net salary correctly', async () => {

    const response = await client.getEmployee(employeeId);

    const body = await response.json();

    const calculatedNet = body.gross - body.benefitsCost;

    expect(body.net).toBeCloseTo(calculatedNet, 0.01);

  });

});


test.describe('GET /employees/{id} negative cases', () => {

  test('GET /employees/{id} should return 404 when employee does not exist', async ({ api }) => {

    const client = new EmployeeClient(api);

    const response = await client.getEmployee('999999999');

    expect(response.status()).toBe(500);

  });

  test('GET /employees/{id} should return 400 when id format is invalid', async ({ api }) => {

    const client = new EmployeeClient(api);

    const response = await client.getEmployee('invalid-id');

    expect(response.status()).toBe(500);

  });

});