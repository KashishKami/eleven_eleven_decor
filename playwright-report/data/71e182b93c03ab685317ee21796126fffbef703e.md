# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: php-admin-visibility.spec.ts >> PHP Admin Panel: Page Visibility Controls (W-1005) >> authenticates and toggles page visibility live from admin dashboard
- Location: tests\e2e\php-admin-visibility.spec.ts:24:7

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
  2  | import fs from 'fs'
  3  | import path from 'path'
  4  | 
  5  | const dataPath = path.resolve(__dirname, '../fixtures/data/page-visibility.json')
  6  | 
  7  | test.describe.serial('PHP Admin Panel: Page Visibility Controls (W-1005)', () => {
  8  |   test.beforeAll(() => {
  9  |     fs.writeFileSync(
  10 |       dataPath,
  11 |       JSON.stringify({ blog: false, gallery: false, portfolio: false, venues: false }, null, 4),
  12 |       'utf-8'
  13 |     )
  14 |   })
  15 | 
  16 |   test.afterAll(() => {
  17 |     fs.writeFileSync(
  18 |       dataPath,
  19 |       JSON.stringify({ blog: true, gallery: true, portfolio: true, venues: true }, null, 4),
  20 |       'utf-8'
  21 |     )
  22 |   })
  23 | 
  24 |   test('authenticates and toggles page visibility live from admin dashboard', async ({ page }) => {
  25 |     // 1. Visit PHP Admin login
  26 |     await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')
  27 | 
  28 |     // 2. Log in if password prompt exists
  29 |     const passwordInput = page.locator('input[type="password"]')
  30 |     if (await passwordInput.isVisible()) {
  31 |       await passwordInput.fill('Admin1111Decor!')
  32 |       await page.locator('button[type="submit"]').click()
  33 |     }
  34 | 
> 35 |     await expect(page).toHaveURL(/dashboard\.php/)
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  36 | 
  37 |     // 3. Assert "Page Visibility" section exists
  38 |     const visibilitySection = page.locator('#page-visibility-card, [data-testid="page-visibility-card"]')
  39 |     await expect(visibilitySection).toBeVisible()
  40 | 
  41 |     // 4. Assert 3 toggles exist: gallery, portfolio, venues
  42 |     const galleryToggle = page.locator('input#toggle-gallery, input[name="visibility_gallery"]')
  43 |     const portfolioToggle = page.locator('input#toggle-portfolio, input[name="visibility_portfolio"]')
  44 |     const venuesToggle = page.locator('input#toggle-venues, input[name="visibility_venues"]')
  45 | 
  46 |     await expect(galleryToggle).toBeVisible()
  47 |     await expect(portfolioToggle).toBeVisible()
  48 |     await expect(venuesToggle).toBeVisible()
  49 | 
  50 |     // 5. Initial state should all be unchecked (false)
  51 |     await expect(galleryToggle).not.toBeChecked()
  52 |     await expect(portfolioToggle).not.toBeChecked()
  53 |     await expect(venuesToggle).not.toBeChecked()
  54 | 
  55 |     // 6. Click gallery toggle to turn ON
  56 |     await galleryToggle.click()
  57 |     await expect(page.locator('.toast-success, #visibility-status-msg')).toContainText(/updated|saved/i)
  58 | 
  59 |     // 7. Click gallery toggle again to restore OFF state
  60 |     await galleryToggle.click()
  61 |     await expect(page.locator('.toast-success, #visibility-status-msg')).toContainText(/updated|saved/i)
  62 |     await expect(galleryToggle).not.toBeChecked()
  63 |   })
  64 | })
  65 | 
```