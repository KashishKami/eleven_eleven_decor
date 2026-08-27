import { test, expect } from '@playwright/test'

test.describe('PHP Admin Panel: Page Visibility Controls (W-1005)', () => {
  test('authenticates and toggles page visibility live from admin dashboard', async ({ page }) => {
    // 1. Visit PHP Admin login
    await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')

    // 2. Log in if password prompt exists
    const passwordInput = page.locator('input[type="password"]')
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('Admin1111Decor!')
      await page.locator('button[type="submit"]').click()
    }

    await expect(page).toHaveURL(/dashboard\.php/)

    // 3. Assert "Page Visibility" section exists
    const visibilitySection = page.locator('#page-visibility-card, [data-testid="page-visibility-card"]')
    await expect(visibilitySection).toBeVisible()

    // 4. Assert 3 toggles exist: gallery, portfolio, venues
    const galleryToggle = page.locator('input#toggle-gallery, input[name="visibility_gallery"]')
    const portfolioToggle = page.locator('input#toggle-portfolio, input[name="visibility_portfolio"]')
    const venuesToggle = page.locator('input#toggle-venues, input[name="visibility_venues"]')

    await expect(galleryToggle).toBeVisible()
    await expect(portfolioToggle).toBeVisible()
    await expect(venuesToggle).toBeVisible()

    // 5. Initial state should all be unchecked (false)
    await expect(galleryToggle).not.toBeChecked()
    await expect(portfolioToggle).not.toBeChecked()
    await expect(venuesToggle).not.toBeChecked()

    // 6. Click gallery toggle to turn ON
    await galleryToggle.click()
    await expect(page.locator('.toast-success, #visibility-status-msg')).toContainText(/updated|saved/i)

    // 7. Click gallery toggle again to restore OFF state
    await galleryToggle.click()
    await expect(page.locator('.toast-success, #visibility-status-msg')).toContainText(/updated|saved/i)
    await expect(galleryToggle).not.toBeChecked()
  })
})
