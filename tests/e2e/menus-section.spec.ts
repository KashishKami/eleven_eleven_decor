import { test, expect } from '@playwright/test'

test.describe('Menus Showcase Section (W-205)', () => {
  test('renders 4 menu cards with links to detail pages', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#popular-menus')
    await expect(section).toBeVisible()

    const cards = section.locator('.card-menu')
    await expect(cards).toHaveCount(4)

    const firstCardTitle = page.getByRole('heading', { name: /Corporate Banquet Experience/i })
    await expect(firstCardTitle).toBeVisible()
  })
})
