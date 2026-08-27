# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: venues.spec.ts >> Venues Hub & Venue Detail Pages (W-602) >> renders venues hub with indoor and outdoor setting cards
- Location: tests\e2e\venues.spec.ts:4:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('heading', { level: 1 })
Expected substring: "Find the Right Setting for Your Event"
Received string:    "This Event Page Does Not Exist"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByRole('heading', { level: 1 })
    14 × locator resolved to <h1 class="heading-xl">This Event Page Does Not Exist</h1>
       - unexpected value "This Event Page Does Not Exist"

```

```yaml
- heading "This Event Page Does Not Exist" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Venues Hub & Venue Detail Pages (W-602)', () => {
  4  |   test('renders venues hub with indoor and outdoor setting cards', async ({ page }) => {
  5  |     await page.goto('/venues/')
  6  | 
  7  |     // 1. Assert main H1 heading
  8  |     const mainHeading = page.getByRole('heading', { level: 1 })
  9  |     await expect(mainHeading).toBeVisible()
> 10 |     await expect(mainHeading).toContainText('Find the Right Setting for Your Event')
     |                               ^ Error: expect(locator).toContainText(expected) failed
  11 | 
  12 |     // 2. Assert venue cards render
  13 |     const venueCards = page.locator('a[href*="/venues/"]')
  14 |     await expect(venueCards.first()).toBeVisible()
  15 | 
  16 |     // 3. Assert venue detail page navigation
  17 |     await venueCards.first().click()
  18 |     await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  19 |   })
  20 | })
  21 | 
```