import { test, expect } from '@playwright/test'

test.describe('Venues PHP Admin CRUD & Management (W-1104)', () => {
  test('logs into PHP Admin, creates a venue, edits it, and deletes it', async ({ page }) => {
    const uniqueName = `E2E Palace Estate ${Date.now()}_${Math.random().toString(36).slice(2, 6)}`

    // 1. Visit PHP Admin login
    await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')

    const passwordInput = page.locator('input[type="password"]')
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('Admin1111Decor!')
      await page.locator('button[type="submit"]').click()
    }

    await expect(page).toHaveURL(/dashboard\.php/)

    // 2. Navigate to Venues Manager
    const venuesTab = page.locator('a[href*="venues.php"]')
    await expect(venuesTab).toBeVisible()
    await venuesTab.click({ force: true })
    await expect(page).toHaveURL(/venues\.php/)

    // 3. Click "+ Create New Venue"
    await page.locator('a[href="new-venue.php"]').click()
    await expect(page).toHaveURL(/new-venue\.php/)

    // 4. Fill venue form
    await page.fill('input[name="name"]', uniqueName)
    await page.fill('input[name="tagline"]', 'Bespoke Valley Sanctuary')
    await page.selectOption('select[name="spaceType"]', 'Outdoor')
    await page.fill('input[name="location"]', 'Dehradun Valley, Uttarakhand')
    await page.fill('input[name="capacity"]', '600')
    await page.fill('input[name="heroImage"]', 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b')
    await page.fill('textarea[name="summary"]', 'Private botanical sanctuary with mountain views.')

    await page.locator('button[type="submit"]').click({ force: true })

    // 5. Assert redirected to venues list and venue is visible
    await expect(page).toHaveURL(/venues\.php/)
    const venueRow = page.locator('tr', { hasText: uniqueName })
    await expect(venueRow).toBeVisible()

    // 6. Delete venue
    page.on('dialog', async (dialog) => dialog.accept())
    const deleteBtn = venueRow.locator('a.action-delete')
    await deleteBtn.click({ force: true })

    // 7. Verify venue removed
    await expect(page.locator('tr', { hasText: uniqueName })).toHaveCount(0)
  })
})
