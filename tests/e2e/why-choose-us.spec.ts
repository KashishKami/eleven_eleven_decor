import { test, expect } from '@playwright/test'

test.describe('Why Choose Us Section (W-204)', () => {
  test('renders section with heading and feature items', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#why-choose-us')
    await expect(section).toBeVisible()

    const headingText = await section.locator('h2').textContent()
    expect(headingText).toContain('Clients')
    await expect(page.getByRole('heading', { name: /CUISINE EXCELLENCE/i })).toBeVisible()
  })
})
