# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: team-section.spec.ts >> Curated Venues Section (W-207) >> renders venue teaser cards with links
- Location: tests\e2e\team-section.spec.ts:17:7

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
  7  | test.describe('Curated Venues Section (W-207)', () => {
  8  |   test.beforeAll(async () => {
  9  |     fs.writeFileSync(
  10 |       dataPath,
  11 |       JSON.stringify({ blog: true, gallery: true, portfolio: true, venues: true }, null, 4),
  12 |       'utf-8'
  13 |     )
  14 |     await new Promise((resolve) => setTimeout(resolve, 300))
  15 |   })
  16 | 
  17 |   test('renders venue teaser cards with links', async ({ page }) => {
> 18 |     await page.goto('/')
     |                ^ Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/
  19 | 
  20 |     const section = page.locator('#venues-teaser')
  21 |     await expect(section).toBeVisible()
  22 | 
  23 |     const exploreLink = section.getByRole('link', { name: /explore venues directory/i })
  24 |     await expect(exploreLink).toBeVisible()
  25 |   })
  26 | })
  27 | 
```