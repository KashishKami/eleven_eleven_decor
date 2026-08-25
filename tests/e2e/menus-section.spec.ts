import { test, expect } from '@playwright/test'

test.describe('Services Overview Section (W-205)', () => {
  test('renders services cards with links to detail pages', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#services-overview')
    await expect(section).toBeVisible()

    const headings = section.locator('h3')
    await expect(headings.first()).toBeVisible()
    await expect(page.getByRole('link', { name: /view all 10 services/i })).toBeVisible()
  })
})
