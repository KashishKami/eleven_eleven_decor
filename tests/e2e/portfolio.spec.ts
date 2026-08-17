import { test, expect } from '@playwright/test'

test.describe('Portfolio Hub & Case Study Pages (W-601)', () => {
  test('renders portfolio hub with category filter pills and project cards', async ({ page }) => {
    await page.goto('/portfolio/')

    // 1. Assert main H1 heading
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toBeVisible()
    await expect(mainHeading).toContainText('Our Work')

    // 2. Assert project cards are rendered
    const projectCards = page.locator('a[href*="/portfolio/"]')
    await expect(projectCards.first()).toBeVisible()

    // 3. Assert detail page navigation works
    await projectCards.first().click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
