# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: services-detail.spec.ts >> All 11 Individual Service Detail Pages (/services/[slug]/) >> should render service detail page for /services/entertainment-hospitality/ with full content
- Location: tests\e2e\services-detail.spec.ts:19:9

# Error details

```
Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/services/entertainment-hospitality/
Call log:
  - navigating to "http://127.0.0.1:3011/services/entertainment-hospitality/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | const SERVICE_SLUGS = [
  4  |   'event-management',
  5  |   'event-planning',
  6  |   'event-decoration',
  7  |   'wedding-decoration',
  8  |   'birthday-decoration',
  9  |   'corporate-event-management',
  10 |   'stage-decoration',
  11 |   'venue-decoration',
  12 |   'floral-decoration',
  13 |   'lighting-production',
  14 |   'entertainment-hospitality',
  15 | ]
  16 | 
  17 | test.describe('All 11 Individual Service Detail Pages (/services/[slug]/)', () => {
  18 |   for (const slug of SERVICE_SLUGS) {
  19 |     test(`should render service detail page for /services/${slug}/ with full content`, async ({ page }) => {
> 20 |       await page.goto(`/services/${slug}/`)
     |                  ^ Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/services/entertainment-hospitality/
  21 | 
  22 |       // Heading check
  23 |       const heading = page.locator('h1')
  24 |       await expect(heading).toBeVisible()
  25 | 
  26 |       // Section blocks check per Section 5 template
  27 |       const provideSection = page.locator('[data-testid="what-we-provide"]')
  28 |       await expect(provideSection).toBeVisible()
  29 | 
  30 |       const expectSection = page.locator('[data-testid="what-you-can-expect"]')
  31 |       await expect(expectSection).toBeVisible()
  32 | 
  33 |       // FAQ accordion
  34 |       const faqAccordion = page.locator('[data-testid="service-faqs"]')
  35 |       await expect(faqAccordion).toBeVisible()
  36 | 
  37 |       // CTA button to contact page
  38 |       const ctaLink = page.locator('[data-testid="service-cta"]')
  39 |       await expect(ctaLink).toBeVisible()
  40 |       await expect(ctaLink).toHaveAttribute('href', /\/contact\/?/)
  41 |     })
  42 |   }
  43 | })
  44 | 
```