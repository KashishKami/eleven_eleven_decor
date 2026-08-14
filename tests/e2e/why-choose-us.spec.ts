import { test, expect } from '@playwright/test'

test.describe('Why Choose Us Section (W-204)', () => {
  test('renders section with heading and feature items', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#why-choose-us')
    await expect(section).toBeVisible()

    await expect(section.locator('h2')).toContainText(/Unforgettable Catering/i)
    await expect(page.getByRole('heading', { name: /Bespoke Spatial Design/i })).toBeVisible()
  })
})
