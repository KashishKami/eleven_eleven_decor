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
Received string:  "http://127.0.0.1:8080/manage-7f3b9x2k/new-venue.php"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://127.0.0.1:8080/manage-7f3b9x2k/new-venue.php"

```

```yaml
- banner:
  - text: 11:11 DECOR
  - paragraph: Create New Venue Setting
  - link "← Back to Venues":
    - /url: venues.php
- text: Venue / Estate Name *
- textbox "Venue / Estate Name *":
  - /placeholder: e.g. JW Marriott Mussoorie Walnut Grove
  - text: E2E Palace Estate 1790006023025_x29p
- text: URL Slug * (Permanent Web Address) /venues/
- textbox "URL Slug * (Permanent Web Address)":
  - /placeholder: jw-marriott-mussoorie-walnut-grove
  - text: e2e-palace-estate-1790006023025-x29p
- text: /
- paragraph:
  - text: "Live link:"
  - code: https://elevenelevendecor.com/venues/e2e-palace-estate-1790006023025-x29p/
- text: Tagline
- textbox "Tagline":
  - /placeholder: e.g. 5-Star Himalayan Luxury Resort & Valley Lawn
  - text: Bespoke Valley Sanctuary
- text: Space Type
- combobox "Space Type":
  - option "Hybrid (Indoor & Outdoor)"
  - option "Indoor (Banquet / Ballroom)"
  - option "Outdoor (Garden / Lawn / Cliffside)" [selected]
- text: Location
- textbox "Location":
  - /placeholder: e.g. Mussoorie, Uttarakhand
  - text: Dehradun Valley, Uttarakhand
- text: Guest Capacity
- spinbutton "Guest Capacity": "600"
- text: Venue Hero Photo *
- paragraph: 📁 Drag & drop an image here or click to browse
- button "Choose File"
- img "Preview"
- textbox "https://... or uploaded image path": https://images.unsplash.com/photo-1544078751-58fee2d8a03b
- paragraph: JPG, PNG, or WebP up to 5MB.
- text: Summary / Overview
- textbox "Summary / Overview":
  - /placeholder: Overview of venue architecture, lawn sizes, and decor adaptability.
  - text: Private botanical sanctuary with mountain views.
- text: Gallery Images (One URL per line) + Upload Additional Photos to Gallery
- textbox "Gallery Images (One URL per line)":
  - /placeholder: "https://images.unsplash.com/...\nhttps://images.unsplash.com/..."
- text: Decor Highlights (One per line)
- textbox "Decor Highlights (One per line)":
  - /placeholder: "Overhead fairy light canopy across central lawn\nPillarless ballroom for 360-degree mandap staging"
- text: Planning Considerations (One per line)
- textbox "Planning Considerations (One per line)":
  - /placeholder: "Generator power grid requirement\nCliffside wind anchoring protocols"
- checkbox "Publish immediately to live venues directory" [checked]
- text: Publish immediately to live venues directory
- link "Cancel":
  - /url: venues.php
- button "Save & Publish Venue"
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
  22 |     await expect(page).toHaveURL(/venues\.php/)
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
> 40 |     await expect(page).toHaveURL(/venues\.php/)
     |                        ^ Error: expect(page).toHaveURL(expected) failed
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