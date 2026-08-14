import { test, expect } from '@playwright/test'

test.describe('Event Categories Section (W-203)', () => {
  test('renders 4 category tabs and switches active tab panel', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#event-categories')
    await expect(section).toBeVisible()

    const tabs = page.getByRole('tab')
    await expect(tabs).toHaveCount(4)

    const weddingsTab = page.getByRole('tab', { name: /weddings/i })
    await weddingsTab.click()
    await expect(weddingsTab).toHaveAttribute('aria-selected', 'true')
  })
})
