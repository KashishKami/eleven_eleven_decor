import { defineConfig, devices } from '@playwright/test'
import fs from 'fs'

const phpBin = fs.existsSync('C:\\php\\php.exe') ? 'C:\\php\\php.exe' : 'php'

export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: require.resolve('./tests/e2e/global-setup'),
  globalTeardown: require.resolve('./tests/e2e/global-teardown'),
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3011',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1536, height: 864 } },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: [
    {
      command: 'npx -y serve -p 3011 out',
      url: 'http://127.0.0.1:3011',
      reuseExistingServer: false,
      timeout: 120 * 1000,
    },
    {
      command: `"${phpBin}" -S 127.0.0.1:8080 -t php-admin`,
      url: 'http://127.0.0.1:8080/manage-7f3b9x2k/index.php',
      reuseExistingServer: false,
      timeout: 120 * 1000,
      env: {
        APP_ENV: 'test',
        TEST_DATA_DIR: require('path').resolve(__dirname, 'tests/fixtures/data'),
      },
    },
  ],
})
