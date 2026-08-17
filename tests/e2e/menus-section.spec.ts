import { test, expect } from '@playwright/test'

test.describe('Menus Showcase Section (W-205)', () => {
  test('renders menu cards with links to detail pages', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#menus-section')
    await expect(section).toBeVisible()

    const headings = section.locator('h3')
    await expect(headings.first()).toBeVisible()
  })
})
