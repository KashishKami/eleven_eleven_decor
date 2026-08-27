# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-hub.spec.ts >> Blog Hub & Category Architecture (W-701) >> navigates to category archive and filters articles
- Location: tests\e2e\blog-hub.spec.ts:27:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected pattern: /Decoration Ideas/i
Received string:  "This Event Page Does Not Exist"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
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
  3  | test.describe('Blog Hub & Category Architecture (W-701)', () => {
  4  |   test('renders blog hub page with H1, category filter links, and article cards', async ({ page }) => {
  5  |     await page.goto('/blog')
  6  | 
  7  |     // Verify H1
  8  |     const heading = page.locator('h1')
  9  |     await expect(heading).toContainText(/News & Insights/i)
  10 | 
  11 |     // Verify 5 category navigation links
  12 |     const categoryNav = page.locator('nav[aria-label="Blog categories"]')
  13 |     await expect(categoryNav).toBeVisible()
  14 |     await expect(categoryNav.getByRole('link', { name: /Wedding Planning/i })).toBeVisible()
  15 |     await expect(categoryNav.getByRole('link', { name: /Event Planning/i })).toBeVisible()
  16 |     await expect(categoryNav.getByRole('link', { name: /Decoration Ideas/i })).toBeVisible()
  17 |     await expect(categoryNav.getByRole('link', { name: /Corporate Events/i })).toBeVisible()
  18 |     await expect(categoryNav.getByRole('link', { name: /Venue & Destination/i })).toBeVisible()
  19 | 
  20 |     // Verify blog cards render
  21 |     const articles = page.locator('article')
  22 |     await expect(articles.first()).toBeVisible()
  23 |     const count = await articles.count()
  24 |     expect(count).toBeGreaterThanOrEqual(1)
  25 |   })
  26 | 
  27 |   test('navigates to category archive and filters articles', async ({ page }) => {
  28 |     await page.goto('/blog/decoration-ideas')
  29 | 
  30 |     // Verify category archive heading
  31 |     const heading = page.locator('h1')
> 32 |     await expect(heading).toContainText(/Decoration Ideas/i)
     |                           ^ Error: expect(locator).toContainText(expected) failed
  33 | 
  34 |     // Verify articles rendered
  35 |     const articles = page.locator('article')
  36 |     await expect(articles.first()).toBeVisible()
  37 |   })
  38 | })
  39 | 
```