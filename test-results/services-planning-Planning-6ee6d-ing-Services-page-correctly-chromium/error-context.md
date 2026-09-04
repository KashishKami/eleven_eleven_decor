# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: services-planning.spec.ts >> Planning & Management Service Pages >> should display Event Planning Services page correctly
- Location: tests\e2e\services-planning.spec.ts:15:7

# Error details

```
Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/services/event-planning/
Call log:
  - navigating to "http://127.0.0.1:3011/services/event-planning/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Planning & Management Service Pages', () => {
  4  |   test('should display Event Management Services page correctly', async ({ page }) => {
  5  |     await page.goto('/services/event-management/')
  6  |     const heading = page.locator('h1')
  7  |     await expect(heading).toBeVisible()
  8  |     const text = await heading.textContent()
  9  |     expect(text).toContain('Management')
  10 | 
  11 |     const metaDescription = page.locator('meta[name="description"]')
  12 |     await expect(metaDescription).toHaveAttribute('content', /.+/)
  13 |   })
  14 | 
  15 |   test('should display Event Planning Services page correctly', async ({ page }) => {
> 16 |     await page.goto('/services/event-planning/')
     |                ^ Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/services/event-planning/
  17 |     const heading = page.locator('h1')
  18 |     await expect(heading).toBeVisible()
  19 |     const text = await heading.textContent()
  20 |     expect(text).toContain('Planning')
  21 |   })
  22 | 
  23 |   test('should display Corporate Event Management page correctly', async ({ page }) => {
  24 |     await page.goto('/services/corporate-event-management/')
  25 |     const heading = page.locator('h1')
  26 |     await expect(heading).toBeVisible()
  27 |     const text = await heading.textContent()
  28 |     expect(text).toContain('Corporate')
  29 |   })
  30 | })
  31 | 
```