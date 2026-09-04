# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: events-hub.spec.ts >> Events Main Hub Page (W-401) >> renders all 6 event category links
- Location: tests\e2e\events-hub.spec.ts:12:7

# Error details

```
Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/events/
Call log:
  - navigating to "http://127.0.0.1:3011/events/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Events Main Hub Page (W-401)', () => {
  4  |   test('renders main heading and description', async ({ page }) => {
  5  |     await page.goto('/events/')
  6  | 
  7  |     const heading = page.getByRole('heading', { level: 1 })
  8  |     await expect(heading).toBeVisible()
  9  |     await expect(heading).toContainText(/Events We Plan, Manage & Decorate/i)
  10 |   })
  11 | 
  12 |   test('renders all 6 event category links', async ({ page }) => {
> 13 |     await page.goto('/events/')
     |                ^ Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/events/
  14 | 
  15 |     const eventSlugs = [
  16 |       'wedding-events',
  17 |       'corporate-events',
  18 |       'birthday-events',
  19 |       'engagement-events',
  20 |       'private-events',
  21 |       'destination-events',
  22 |     ]
  23 | 
  24 |     for (const slug of eventSlugs) {
  25 |       const link = page.locator(`a[href*="/events/${slug}"]`)
  26 |       await expect(link.first()).toBeAttached()
  27 |     }
  28 |   })
  29 | 
  30 | 
  31 |   test('supports legacy /event route by redirecting or rendering events hub', async ({ page }) => {
  32 |     await page.goto('/event/')
  33 | 
  34 |     const heading = page.getByRole('heading', { level: 1 })
  35 |     await expect(heading).toBeVisible()
  36 |     await expect(heading).toContainText(/Events We Plan, Manage & Decorate/i)
  37 |   })
  38 | })
  39 | 
```