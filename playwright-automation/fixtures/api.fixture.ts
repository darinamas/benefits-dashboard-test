import { test as base, expect, request, APIRequestContext } from '@playwright/test';
import { env } from '../config/env';

type ApiFixtures = {
  api: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  api: async ({}, use) => {

    const api = await request.newContext({
      baseURL: env.BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Basic ${env.AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    await use(api);

    await api.dispose();
  }
});

export { expect };