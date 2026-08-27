# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-article.spec.ts >> Blog Single Article Detail Page (W-702) >> renders article detail with H1, author, reading progress bar, schema, and related CTA
- Location: tests\e2e\blog-article.spec.ts:4:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected pattern: /The Complete Wedding Decor Checklist/i
Received string:  "This Event Page Does Not Exist"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
    13 × locator resolved to <h1 class="heading-xl">This Event Page Does Not Exist</h1>
       - unexpected value "This Event Page Does Not Exist"

```

```yaml
- heading "This Event Page Does Not Exist" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Blog Single Article Detail Page (W-702)', () => {
  4  |   test('renders article detail with H1, author, reading progress bar, schema, and related CTA', async ({ page }) => {
  5  |     await page.goto('/blog/wedding-planning/complete-wedding-decor-checklist')
  6  | 
  7  |     // Verify H1
  8  |     const heading = page.locator('h1')
> 9  |     await expect(heading).toContainText(/The Complete Wedding Decor Checklist/i)
     |                           ^ Error: expect(locator).toContainText(expected) failed
  10 | 
  11 |     // Verify author and date metadata
  12 |     const metaContainer = page.locator('text=By 1111 Decor Design Studio')
  13 |     await expect(metaContainer).toBeVisible()
  14 | 
  15 |     // Verify main article body content
  16 |     const mainContent = page.locator('main')
  17 |     await expect(mainContent).toContainText(/The Foundation of Luxury Wedding Decor/i)
  18 | 
  19 |     // Verify related service CTA link
  20 |     const serviceCta = page.getByRole('link', { name: /Explore Service/i })
  21 |     await expect(serviceCta).toBeVisible()
  22 |     await expect(serviceCta).toHaveAttribute('href', '/services/wedding-decoration/')
  23 | 
  24 |     // Verify client-side Article JSON-LD schema is injected into document
  25 |     const schemaScript = page.locator('script#article-jsonld')
  26 |     await expect(schemaScript).toBeAttached()
  27 |     const schemaText = await schemaScript.textContent()
  28 |     expect(schemaText).toContain('"@type":"Article"')
  29 |     expect(schemaText).toContain('The Complete Wedding Decor Checklist')
  30 |   })
  31 | })
  32 | 
```