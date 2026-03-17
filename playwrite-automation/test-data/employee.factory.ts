import { faker } from '@faker-js/faker';

export type Employee = {
  firstName: string;
  lastName: string;
  dependents: number;
};

export class EmployeeFactory {

  static createEmployee(overrides?: Partial<Employee>): Employee {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dependents: faker.number.int({ min: 1, max: 5 }),
      ...overrides
    };
  }

  static employeeWithNoDependents(): Employee {
    return this.createEmployee({ dependents: 0 });
  }

  static employeeWithManyDependents(): Employee {
    return this.createEmployee({ dependents: 10 });
  }

}