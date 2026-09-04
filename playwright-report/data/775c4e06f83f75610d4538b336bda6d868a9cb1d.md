# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: venues-crud.spec.ts >> Venues PHP Admin CRUD & Management (W-1104) >> logs into PHP Admin, creates a venue, edits it, and deletes it
- Location: tests\e2e\venues-crud.spec.ts:4:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /venues\.php/
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
  3  | test.describe('Venues PHP Admin CRUD & Management (W-1104)', () => {
  4  |   test('logs into PHP Admin, creates a venue, edits it, and deletes it', async ({ page }) => {
  5  |     const uniqueName = `E2E Palace Estate ${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
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
  16 |     await expect(page).toHaveURL(/dashboard\.php/)
  17 | 
  18 |     // 2. Navigate to Venues Manager
  19 |     const venuesTab = page.locator('a[href*="venues.php"]')
  20 |     await expect(venuesTab).toBeVisible()
  21 |     await venuesTab.click({ force: true })
> 22 |     await expect(page).toHaveURL(/venues\.php/)
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  23 | 
  24 |     // 3. Click "+ Create New Venue"
  25 |     await page.locator('a[href="new-venue.php"]').click()
  26 |     await expect(page).toHaveURL(/new-venue\.php/)
  27 | 
  28 |     // 4. Fill venue form
  29 |     await page.fill('input[name="name"]', uniqueName)
  30 |     await page.fill('input[name="tagline"]', 'Bespoke Valley Sanctuary')
  31 |     await page.selectOption('select[name="spaceType"]', 'Outdoor')
  32 |     await page.fill('input[name="location"]', 'Dehradun Valley, Uttarakhand')
  33 |     await page.fill('input[name="capacity"]', '600')
  34 |     await page.fill('input[name="heroImage"]', 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b')
  35 |     await page.fill('textarea[name="summary"]', 'Private botanical sanctuary with mountain views.')
  36 | 
  37 |     await page.locator('button[type="submit"]').click({ force: true })
  38 | 
  39 |     // 5. Assert redirected to venues list and venue is visible
  40 |     await expect(page).toHaveURL(/venues\.php/)
  41 |     const venueRow = page.locator('tr', { hasText: uniqueName })
  42 |     await expect(venueRow).toBeVisible()
  43 | 
  44 |     // 6. Delete venue
  45 |     page.on('dialog', async (dialog) => dialog.accept())
  46 |     const deleteBtn = venueRow.locator('a.action-delete')
  47 |     await deleteBtn.click({ force: true })
  48 | 
  49 |     // 7. Verify venue removed
  50 |     await expect(page.locator('tr', { hasText: uniqueName })).toHaveCount(0)
  51 |   })
  52 | })
  53 | 
```