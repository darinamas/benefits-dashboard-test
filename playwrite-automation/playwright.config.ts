import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    baseURL: env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});