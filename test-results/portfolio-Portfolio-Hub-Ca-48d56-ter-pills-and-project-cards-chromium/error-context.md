# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Portfolio Hub & Case Study Pages (W-601) >> renders portfolio hub with category filter pills and project cards
- Location: tests\e2e\portfolio.spec.ts:4:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('heading', { level: 1 })
Expected substring: "Our Work"
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
  3  | test.describe('Portfolio Hub & Case Study Pages (W-601)', () => {
  4  |   test('renders portfolio hub with category filter pills and project cards', async ({ page }) => {
  5  |     await page.goto('/portfolio/')
  6  | 
  7  |     // 1. Assert main H1 heading
  8  |     const mainHeading = page.getByRole('heading', { level: 1 })
  9  |     await expect(mainHeading).toBeVisible()
> 10 |     await expect(mainHeading).toContainText('Our Work')
     |                               ^ Error: expect(locator).toContainText(expected) failed
  11 | 
  12 |     // 2. Assert project cards are rendered
  13 |     const projectCards = page.locator('main a[href*="/portfolio/"]')
  14 |     await expect(projectCards.first()).toBeVisible()
  15 | 
  16 |     // 3. Assert detail page navigation works
  17 |     await projectCards.first().click()
  18 |     await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  19 |   })
  20 | })
  21 | 
```