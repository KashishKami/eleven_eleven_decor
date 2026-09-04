# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-visibility.spec.ts >> Blog Visibility Gate (W-1101) >> does NOT render any blog links in navigation or footer when blog visibility is false
- Location: tests\e2e\blog-visibility.spec.ts:24:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('a[href*="/blog"]')
Expected: 0
Received: 2
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('a[href*="/blog"]')
    14 × locator resolved to 2 elements
       - unexpected value "2"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import fs from 'fs'
  3  | import path from 'path'
  4  | 
  5  | const dataPath = path.resolve(__dirname, '../fixtures/data/page-visibility.json')
  6  | 
  7  | test.describe.serial('Blog Visibility Gate (W-1101)', () => {
  8  |   test.beforeEach(() => {
  9  |     fs.writeFileSync(
  10 |       dataPath,
  11 |       JSON.stringify({ blog: false, gallery: true, portfolio: true, venues: true }, null, 4),
  12 |       'utf-8'
  13 |     )
  14 |   })
  15 | 
  16 |   test.afterAll(() => {
  17 |     fs.writeFileSync(
  18 |       dataPath,
  19 |       JSON.stringify({ blog: true, gallery: true, portfolio: true, venues: true }, null, 4),
  20 |       'utf-8'
  21 |     )
  22 |   })
  23 | 
  24 |   test('does NOT render any blog links in navigation or footer when blog visibility is false', async ({ page }) => {
  25 |     await page.goto('/')
  26 | 
  27 |     const blogLinks = page.locator('a[href*="/blog"]')
> 28 |     await expect(blogLinks).toHaveCount(0)
     |                             ^ Error: expect(locator).toHaveCount(expected) failed
  29 |   })
  30 | 
  31 |   test('renders 4th toggle switch for Blog in PHP admin dashboard', async ({ page }) => {
  32 |     await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')
  33 | 
  34 |     const passwordInput = page.locator('input[type="password"]')
  35 |     if (await passwordInput.isVisible()) {
  36 |       await passwordInput.fill('Admin1111Decor!')
  37 |       await page.locator('button[type="submit"]').click()
  38 |     }
  39 | 
  40 |     await expect(page).toHaveURL(/dashboard\.php/)
  41 | 
  42 |     const blogToggle = page.locator('input#toggle-blog, input[name="visibility_blog"]')
  43 |     await expect(blogToggle).toBeVisible()
  44 |     await expect(blogToggle).not.toBeChecked()
  45 |   })
  46 | })
  47 | 
```