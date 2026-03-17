import { EmployeeFactory } from '../test-data/employee.factory';
import { EmployeeClient } from '../api/clients/employee.client';

export async function createTestEmployee(client: EmployeeClient) {

  const employee = EmployeeFactory.createEmployee();

  const response = await client.createEmployee({
    firstName: employee.firstName,
    lastName: employee.lastName,
    dependants: employee.dependents
  });

  const body = await response.json();

  return {
    employee,
    id: body.id
  };
}