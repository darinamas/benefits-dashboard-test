import { APIRequestContext } from '@playwright/test';

export class EmployeeClient {

  constructor(private api: APIRequestContext) {}

  async createEmployee(data: any) {
    return await this.api.post('/Prod/api/Employees', { data });
  }

  async getEmployee(id: string) {
    return await this.api.get(`/Prod/api/Employees/${id}`);
  }

  async updateEmployee(data: any) {
    return await this.api.put('/Prod/api/Employees', { data });
  }

  async deleteEmployee(id: string) {
    return await this.api.delete(`/Prod/api/Employees/${id}`);
  }
}