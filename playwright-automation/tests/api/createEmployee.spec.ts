import { test, expect } from '../../fixtures/test.fixture';
import { EmployeeFactory } from '../../test-data/employee.factory';
import { EmployeeClient } from '../../api/clients/employee.client';

test.describe('POST /employees', () => {

  let client: EmployeeClient;
  let employeeId: string | undefined;

  test.beforeEach(async ({ api }) => {
    client = new EmployeeClient(api);
  });

  test.afterEach(async () => {
    if (employeeId) {
      await client.deleteEmployee(employeeId);
      employeeId = undefined;
    }
  });

  test('POST /employees should create employee with valid data', async () => {

    const employee = EmployeeFactory.createEmployee();

    const response = await client.createEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
      dependants: employee.dependents
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    employeeId = body.id;

    expect(body.firstName).toBe(employee.firstName);
    expect(body.lastName).toBe(employee.lastName);

  });


  test('POST /employees should create employee with zero dependents', async () => {

    const response = await client.createEmployee({
      firstName: 'John',
      lastName: 'Doe',
      dependants: 0
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    employeeId = body.id;

    expect(body.dependants).toBe(0);

  });


  test('POST /employees should return 400 when firstName is missing', async () => {

    const response = await client.createEmployee({
      lastName: 'Doe',
      dependants: 1
    });

    expect(response.status()).toBe(400);

  });


  test('POST /employees should return 405 when dependants has invalid type', async () => {

    const response = await client.createEmployee({
      firstName: 'John',
      lastName: 'Doe',
      dependants: "two"
    });

    expect(response.status()).toBe(405);

  });

});