# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: page-visibility.spec.ts >> Content Visibility Gate (W-1002 & W-1004) >> does NOT render any gallery, portfolio, or venues links in navigation or footer when visibility is false
- Location: tests\e2e\page-visibility.spec.ts:45:7

# Error details

```
Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/
Call log:
  - navigating to "http://127.0.0.1:3011/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import fs from 'fs'
  3  | import path from 'path'
  4  | 
  5  | const dataPath = path.resolve(__dirname, '../fixtures/data/page-visibility.json')
  6  | 
  7  | test.describe.serial('Content Visibility Gate (W-1002 & W-1004)', () => {
  8  |   test.beforeEach(async () => {
  9  |     fs.writeFileSync(
  10 |       dataPath,
  11 |       JSON.stringify({ blog: false, gallery: false, portfolio: false, venues: false }, null, 4),
  12 |       'utf-8'
  13 |     )
  14 |     await new Promise((resolve) => setTimeout(resolve, 300))
  15 |   })
  16 | 
  17 |   test.afterAll(() => {
  18 |     fs.writeFileSync(
  19 |       dataPath,
  20 |       JSON.stringify({ blog: true, gallery: true, portfolio: true, venues: true }, null, 4),
  21 |       'utf-8'
  22 |     )
  23 |   })
  24 | 
  25 |   const safeGoto = async (page: any, url: string) => {
  26 |     try {
  27 |       return await page.goto(url, { waitUntil: 'domcontentloaded' })
  28 |     } catch (err: any) {
  29 |       if (err?.message?.includes('ERR_ABORTED')) {
  30 |         await page.waitForTimeout(500)
  31 |         return await page.goto(url, { waitUntil: 'domcontentloaded' })
  32 |       }
  33 |       throw err
  34 |     }
  35 |   }
  36 | 
  37 | 
  38 | 
  39 |   test('positive control: /services/ is always accessible and returns 200', async ({ page }) => {
  40 |     const response = await page.goto('/services/')
  41 |     expect(response?.status()).toBe(200)
  42 |     await expect(page.getByRole('heading', { level: 1 })).toContainText('Services')
  43 |   })
  44 | 
  45 |   test('does NOT render any gallery, portfolio, or venues links in navigation or footer when visibility is false', async ({
  46 |     page,
  47 |   }) => {
> 48 |     await page.goto('/')
     |                ^ Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/
  49 | 
  50 |     // Check anchor hrefs in header, navigation, and footer
  51 |     const galleryLinks = page.locator('header a[href*="/gallery"], nav a[href*="/gallery"], footer a[href*="/gallery"]')
  52 |     const portfolioLinks = page.locator('header a[href*="/portfolio"], nav a[href*="/portfolio"], footer a[href*="/portfolio"]')
  53 |     const venuesLinks = page.locator('header a[href*="/venues"], nav a[href*="/venues"], footer a[href*="/venues"]')
  54 | 
  55 |     await expect(galleryLinks).toHaveCount(0)
  56 |     await expect(portfolioLinks).toHaveCount(0)
  57 |     await expect(venuesLinks).toHaveCount(0)
  58 | 
  59 |     // Positive control: Services links MUST exist
  60 |     const servicesLinks = page.locator('header a[href*="/services"], nav a[href*="/services"], footer a[href*="/services"]')
  61 |     expect(await servicesLinks.count()).toBeGreaterThan(0)
  62 |   })
  63 | })
  64 | 
  65 | 
```