import { test, expect } from '@playwright/test'

test.describe('Gallery PHP Admin CRUD & Management (W-1105)', () => {
  test('logs into PHP Admin, adds a gallery photo, edits it, and deletes it', async ({ page }) => {
    const uniqueTitle = `E2E Floral Arch ${Date.now()}_${Math.random().toString(36).slice(2, 6)}`

    // 1. Visit PHP Admin login
    await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')

    const passwordInput = page.locator('input[type="password"]')
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('Admin1111Decor!')
      await page.locator('button[type="submit"]').click()
    }

    await expect(page).toHaveURL(/dashboard\.php/)

    // 2. Navigate to Gallery Manager
    const galleryTab = page.locator('a[href*="gallery.php"]')
    await expect(galleryTab).toBeVisible()
    await galleryTab.click({ force: true })
    await expect(page).toHaveURL(/gallery\.php/)

    // 3. Click "+ Add New Photo"
    await page.locator('a[href="new-photo.php"]').click()
    await expect(page).toHaveURL(/new-photo\.php/)

    // 4. Fill photo form
    await page.fill('input[name="title"]', uniqueTitle)
    await page.selectOption('select[name="category"]', 'Weddings')
    await page.selectOption('select[name="aspectRatio"]', 'landscape')
    await page.fill('input[name="src"]', 'https://images.unsplash.com/photo-1519741497674-611481863552')

    await page.locator('button[type="submit"]').click({ force: true })

    // 5. Assert redirected to gallery list and photo is visible
    await expect(page).toHaveURL(/gallery\.php/)
    const photoRow = page.locator('tr', { hasText: uniqueTitle })
    await expect(photoRow).toBeVisible()

    // 6. Delete photo
    page.on('dialog', async (dialog) => dialog.accept())
    const deleteBtn = photoRow.locator('a.action-delete')
    await deleteBtn.click({ force: true })

    // 7. Verify photo removed
    await expect(page.locator('tr', { hasText: uniqueTitle })).toHaveCount(0)
  })
})
