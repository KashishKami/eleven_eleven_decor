# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gallery-crud.spec.ts >> Gallery PHP Admin CRUD & Management (W-1105) >> logs into PHP Admin, adds a gallery photo, edits it, and deletes it
- Location: tests\e2e\gallery-crud.spec.ts:4:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /dashboard\.php/
Received string:  "chrome-error://chromewebdata/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html>…</html>
       - unexpected value "chrome-error://chromewebdata/"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Gallery PHP Admin CRUD & Management (W-1105)', () => {
  4  |   test('logs into PHP Admin, adds a gallery photo, edits it, and deletes it', async ({ page }) => {
  5  |     const uniqueTitle = `E2E Floral Arch ${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  6  | 
  7  |     // 1. Visit PHP Admin login
  8  |     await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')
  9  | 
  10 |     const passwordInput = page.locator('input[type="password"]')
  11 |     if (await passwordInput.isVisible()) {
  12 |       await passwordInput.fill('Admin1111Decor!')
  13 |       await page.locator('button[type="submit"]').click()
  14 |     }
  15 | 
> 16 |     await expect(page).toHaveURL(/dashboard\.php/)
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  17 | 
  18 |     // 2. Navigate to Gallery Manager
  19 |     const galleryTab = page.locator('a[href*="gallery.php"]')
  20 |     await expect(galleryTab).toBeVisible()
  21 |     await galleryTab.click({ force: true })
  22 |     await expect(page).toHaveURL(/gallery\.php/)
  23 | 
  24 |     // 3. Click "+ Add New Photo"
  25 |     await page.locator('a[href="new-photo.php"]').click()
  26 |     await expect(page).toHaveURL(/new-photo\.php/)
  27 | 
  28 |     // 4. Fill photo form
  29 |     await page.fill('input[name="title"]', uniqueTitle)
  30 |     await page.selectOption('select[name="category"]', 'Weddings')
  31 |     await page.selectOption('select[name="aspectRatio"]', 'landscape')
  32 |     await page.fill('input[name="src"]', 'https://images.unsplash.com/photo-1519741497674-611481863552')
  33 | 
  34 |     await Promise.all([
  35 |       page.waitForURL(/gallery\.php/, { waitUntil: 'domcontentloaded', timeout: 15000 }),
  36 |       page.locator('button[type="submit"]').click({ force: true }),
  37 |     ])
  38 | 
  39 |     // 5. Assert redirected to gallery list and photo is visible
  40 |     const photoRow = page.locator('tr', { hasText: uniqueTitle })
  41 |     await expect(photoRow).toBeVisible()
  42 | 
  43 |     // 6. Delete photo
  44 |     page.on('dialog', async (dialog) => dialog.accept())
  45 |     const deleteBtn = photoRow.locator('a.action-delete')
  46 |     await deleteBtn.click({ force: true })
  47 | 
  48 |     // 7. Verify photo removed
  49 |     await expect(page.locator('tr', { hasText: uniqueTitle })).toHaveCount(0)
  50 |   })
  51 | })
  52 | 
```