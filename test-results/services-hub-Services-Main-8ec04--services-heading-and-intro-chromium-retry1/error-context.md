# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: services-hub.spec.ts >> Services Main Hub Page (/services/) >> should display the main services heading and intro
- Location: tests\e2e\services-hub.spec.ts:8:7

# Error details

```
Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/services/
Call log:
  - navigating to "http://127.0.0.1:3011/services/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Services Main Hub Page (/services/)', () => {
  4  |   test.beforeEach(async ({ page }) => {
> 5  |     await page.goto('/services/')
     |                ^ Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/services/
  6  |   })
  7  | 
  8  |   test('should display the main services heading and intro', async ({ page }) => {
  9  |     const heading = page.locator('h1')
  10 |     await expect(heading).toBeVisible()
  11 |     const text = await heading.textContent()
  12 |     expect(text).toContain('Event')
  13 |     expect(text).toContain('Services')
  14 |   })
  15 | 
  16 |   test('should render 11 service cards with proper links and CTA', async ({ page }) => {
  17 |     const serviceCards = page.locator('[data-testid="service-card"]')
  18 |     await expect(serviceCards).toHaveCount(11)
  19 | 
  20 |     // Check first card links to dynamic service route
  21 |     const firstCardLink = serviceCards.first().locator('a')
  22 |     await expect(firstCardLink).toHaveAttribute('href', /\/services\/[a-z-]+/)
  23 |   })
  24 | 
  25 | })
  26 | 
```