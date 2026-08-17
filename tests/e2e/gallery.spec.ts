import { test, expect } from '@playwright/test'

test.describe('Interactive Photo Gallery & Lightbox Modal (W-603)', () => {
  test('renders photo gallery grid and opens Lightbox modal on image click', async ({ page }) => {
    await page.goto('/gallery/')

    // 1. Assert main H1 heading
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toBeVisible()
    await expect(mainHeading).toContainText("Moments We've Helped Create")

    // 2. Click a gallery thumbnail to trigger Lightbox modal
    const firstThumbnail = page.locator('.galleryImage, [data-testid="gallery-item"]').first()
    await firstThumbnail.click()

    // 3. Assert Lightbox modal opens
    const modal = page.locator('#lightbox-modal, [data-testid="lightbox-modal"]')
    await expect(modal).toBeVisible()

    // 4. Press Escape to close Lightbox modal
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })
})
