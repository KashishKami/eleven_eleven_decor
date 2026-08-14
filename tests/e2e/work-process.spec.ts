import { test, expect } from '@playwright/test'

test.describe('Work Process Section (W-206)', () => {
  test('renders 4 process steps', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#work-process')
    await expect(section).toBeVisible()

    await expect(page.getByRole('heading', { name: /Tell us about your event/i })).toBeVisible()
    await expect(page.getByText('01')).toBeVisible()
    await expect(page.getByText('04')).toBeVisible()
  })
})
