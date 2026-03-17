import { test, expect } from '../../fixtures/test.fixture';
import { EmployeeFactory } from '../../test-data/employee.factory';

test('employee lifecycle API test', async ({ api }) => {

  const employee = EmployeeFactory.createEmployee();
  const updatedEmployee = EmployeeFactory.createEmployee();

  let employeeId: string;
  let body: any;

  await test.step('Create employee', async () => {

    const response = await api.post('/Prod/api/Employees', {
      data: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        dependants: employee.dependents
      }
    });

    expect(response.status()).toBe(200);

    body = await response.json();
    employeeId = body.id;

    console.log(`Created employee: ${employee.firstName} ${employee.lastName}`);
    console.log(`Employee ID: ${employeeId}`);

  });

  await test.step('Get employee by id', async () => {

    const response = await api.get(`/Prod/api/Employees/${employeeId}`);

    expect(response.status()).toBe(200);

    body = await response.json();

    expect(body.id).toBe(employeeId);
    expect(body.firstName).toBe(employee.firstName);
    expect(body.lastName).toBe(employee.lastName);

  });

  await test.step('Update employee', async () => {

    const response = await api.put('/Prod/api/Employees', {
      data: {
        id: employeeId,
        firstName: updatedEmployee.firstName,
        lastName: updatedEmployee.lastName,
        dependants: updatedEmployee.dependents
      }
    });

    expect(response.status()).toBe(200);

    body = await response.json();

    expect(body.firstName).toBe(updatedEmployee.firstName);
    expect(body.lastName).toBe(updatedEmployee.lastName);
    expect(body.dependants).toBe(updatedEmployee.dependents);

  });

  await test.step('Verify salary calculation', async () => {

    const response = await api.get(`/Prod/api/Employees/${employeeId}`);

    body = await response.json();

    const calculatedNet = body.gross - body.benefitsCost;

    expect(body.net).toBeCloseTo(calculatedNet, 0.01);

  });

  await test.step('Delete employee', async () => {

    const response = await api.delete(`/Prod/api/Employees/${employeeId}`);

    expect(response.status()).toBe(200);

  });

  await test.step('Verify employee deleted', async () => {

    const response = await api.get(`/Prod/api/Employees/${employeeId}`);

    expect(response.status()).toBe(200);

  });

});