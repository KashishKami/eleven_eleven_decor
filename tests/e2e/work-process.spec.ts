import { test, expect } from '@playwright/test'

test.describe('Work Process Section (W-206)', () => {
  test('is unmounted from pages per layout specification', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#work-process')
    await expect(section).toHaveCount(0)
  })
})

