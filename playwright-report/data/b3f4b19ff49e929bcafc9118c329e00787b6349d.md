# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gallery.spec.ts >> Interactive Photo Gallery & Lightbox Modal (W-603) >> renders photo gallery grid and opens Lightbox modal on image click
- Location: tests\e2e\gallery.spec.ts:4:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('heading', { level: 1 })
Expected substring: "Moments We've Helped Create"
Received string:    "This Event Page Does Not Exist"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByRole('heading', { level: 1 })
    13 × locator resolved to <h1 class="heading-xl">This Event Page Does Not Exist</h1>
       - unexpected value "This Event Page Does Not Exist"

```

```yaml
- heading "This Event Page Does Not Exist" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Interactive Photo Gallery & Lightbox Modal (W-603)', () => {
  4  |   test('renders photo gallery grid and opens Lightbox modal on image click', async ({ page }) => {
  5  |     await page.goto('/gallery/')
  6  | 
  7  |     // 1. Assert main H1 heading
  8  |     const mainHeading = page.getByRole('heading', { level: 1 })
  9  |     await expect(mainHeading).toBeVisible()
> 10 |     await expect(mainHeading).toContainText("Moments We've Helped Create")
     |                               ^ Error: expect(locator).toContainText(expected) failed
  11 | 
  12 |     // 2. Click a gallery thumbnail to trigger Lightbox modal
  13 |     const firstThumbnail = page.locator('.galleryImage, [data-testid="gallery-item"]').first()
  14 |     await firstThumbnail.click()
  15 | 
  16 |     // 3. Assert Lightbox modal opens
  17 |     const modal = page.locator('#lightbox-modal, [data-testid="lightbox-modal"]')
  18 |     await expect(modal).toBeVisible()
  19 | 
  20 |     // 4. Press Escape to close Lightbox modal
  21 |     await page.keyboard.press('Escape')
  22 |     await expect(modal).not.toBeVisible()
  23 |   })
  24 | })
  25 | 
```