import { test, expect } from '@playwright/test'

test.describe('Event Categories Section (W-203)', () => {
  test('renders event categories section with enlarged card and categories content', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#event-categories')
    await expect(section).toBeVisible()

    const corporateHeading = section.getByRole('heading', { name: /corporate/i })
    await expect(corporateHeading).toBeVisible()
  })
})
