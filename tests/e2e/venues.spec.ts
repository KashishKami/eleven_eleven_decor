import { test, expect } from '@playwright/test'

test.describe('Venues Hub & Venue Detail Pages (W-602)', () => {
  test('renders venues hub with indoor and outdoor setting cards', async ({ page }) => {
    await page.goto('/venues/')

    // 1. Assert main H1 heading
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toBeVisible()
    await expect(mainHeading).toContainText('Find the Right Setting for Your Event')

    // 2. Assert venue cards render
    const venueCards = page.locator('main a[href*="/venues/"]')
    await expect(venueCards.first()).toBeVisible()

    // 3. Assert venue detail page navigation
    await venueCards.first().click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
