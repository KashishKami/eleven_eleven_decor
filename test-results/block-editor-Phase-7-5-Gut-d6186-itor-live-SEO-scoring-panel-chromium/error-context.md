# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: block-editor.spec.ts >> Phase 7.5: Gutenberg Block Editor & Rank Math SEO Analyzer >> logs into secret PHP admin panel, mounts block editor & live SEO scoring panel
- Location: tests\e2e\block-editor.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ProseMirror') to be visible

```

# Page snapshot

```yaml
- generic [ref=f2e2]:
  - banner [ref=f2e3]:
    - generic [ref=f2e4]:
      - generic [ref=f2e5]: 11:11 DECOR
      - generic [ref=f2e6]: Studio
    - generic [ref=f2e7]:
      - link "← Dashboard" [ref=f2e8] [cursor=pointer]:
        - /url: dashboard.php
      - button "Publish Post →" [ref=f2e9] [cursor=pointer]
  - generic [ref=f2e10]:
    - complementary [ref=f2e11]:
      - generic [ref=f2e12]: ⚙️ Document Settings
      - generic [ref=f2e13]:
        - generic [ref=f2e14] [cursor=pointer]:
          - checkbox "Publish live immediately" [checked] [ref=f2e15]
          - generic [ref=f2e16]: Publish live immediately
        - button "Save Post →" [ref=f2e17] [cursor=pointer]
      - generic [ref=f2e18]:
        - generic [ref=f2e19]: URL Slug *
        - textbox "e.g. luxury-wedding-trends-2026" [ref=f2e20]
        - generic [ref=f2e21]: "Permalink: /blog/[category]/[slug]/"
      - generic [ref=f2e22]:
        - generic [ref=f2e23]: Category *
        - combobox [ref=f2e24]:
          - option "Wedding Planning" [selected]
          - option "Floral Design"
          - option "Luxury Tablescapes"
          - option "Corporate Galas"
          - option "Lighting & Ambiance"
          - option "Venue & Destination Events"
          - option "Decoration Ideas"
          - option "Event Planning"
      - generic [ref=f2e25]:
        - generic [ref=f2e26]: Author Name
        - textbox [ref=f2e27]: 1111 Decor Studio
      - generic [ref=f2e28]:
        - generic [ref=f2e29]: Estimated Read Time
        - textbox [ref=f2e30]: 5 min read
      - generic [ref=f2e31]:
        - generic [ref=f2e32]: 📷 Featured Main Image
        - generic [ref=f2e33]: Upload File (JPG, PNG, WebP)
        - button "Choose File" [ref=f2e34]
        - generic [ref=f2e35]: Or Image URL
        - textbox "https://images.unsplash.com/..." [ref=f2e36]
        - generic [ref=f2e37]: Feature Image Alt Text *
        - textbox "e.g. Luxury Wedding Floral Decor by 1111 Decor" [ref=f2e38]
      - generic [ref=f2e39]:
        - generic [ref=f2e40]: 🔗 Recommended Service CTA (Optional)
        - generic [ref=f2e41]: Service URL Slug
        - textbox "e.g. wedding-decoration" [ref=f2e42]
        - generic [ref=f2e43]: Links to /services/[slug]/
        - generic [ref=f2e44]: Service Card Title
        - textbox "e.g. Wedding Decoration Services" [ref=f2e45]
        - generic [ref=f2e46]: Heading displayed in the bottom CTA card
    - main [ref=f2e47]:
      - textbox "Add Title..." [ref=f2e48]
      - textbox "Add a brief excerpt / meta description for search engines and cards..." [ref=f2e49]
    - complementary [ref=f2e50]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Phase 7.5: Gutenberg Block Editor & Rank Math SEO Analyzer', () => {
  4  |   test('logs into secret PHP admin panel, mounts block editor & live SEO scoring panel', async ({ page }) => {
  5  |     page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.text()))
  6  |     page.on('pageerror', (err) => console.log('BROWSER ERROR:', err.message))
  7  | 
  8  |     // 1. Login
  9  |     await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')
  10 |     await page.fill('#password', 'AdminPassword1111!')
  11 |     await page.click('button[type="submit"]')
  12 |     await page.waitForURL('**/dashboard.php')
  13 | 
  14 |     // 2. Navigate to new post page
  15 |     await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/new-post.php')
> 16 |     await page.waitForSelector('.ProseMirror', { timeout: 15000 })
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  17 | 
  18 |     // 3. Verify editor root and Tiptap ProseMirror region
  19 |     const editorRoot = page.locator('#editor-root')
  20 |     await expect(editorRoot).toBeVisible()
  21 |     const proseMirror = page.locator('.ProseMirror')
  22 |     await expect(proseMirror).toBeVisible()
  23 | 
  24 |     // 4. Verify Rank Math SEO panel & SVG gauge
  25 |     const seoPanel = page.locator('#seo-panel-root')
  26 |     await expect(seoPanel).toBeVisible()
  27 |     const gauge = page.locator('.seo-gauge')
  28 |     await expect(gauge).toBeVisible()
  29 | 
  30 |     // 5. Test Live Focus Keyword interaction
  31 |     const focusKeywordInput = page.locator('#seo-keyword-input-field')
  32 |     await focusKeywordInput.fill('wedding decoration')
  33 |     await focusKeywordInput.press('Enter')
  34 | 
  35 |     // 6. Test Title auto-slug
  36 |     await page.fill('#title', 'Top Luxury Wedding Decoration Trends 2026 | 1111 Decor')
  37 |     const slugInput = page.locator('#slug')
  38 |     await expect(slugInput).toHaveValue(/top-luxury-wedding-decoration-trends-2026/)
  39 | 
  40 |     // 7. Verify SEO check "Focus keyword used in title" turns passed
  41 |     await page.waitForTimeout(500)
  42 |     const titleCheckRow = page.locator('.seo-check-row:has-text("Focus keyword used in title")')
  43 |     await expect(titleCheckRow).toContainText('✅')
  44 | 
  45 |     // 8. Test Toolbar button and editor typing
  46 |     await page.locator('.ProseMirror').click()
  47 |     await page.keyboard.type('Overview of Luxury Wedding Trends')
  48 | 
  49 |     const h2Button = page.locator('.tb-btn:has-text("H2")')
  50 |     await h2Button.click()
  51 |     await page.locator('.ProseMirror').focus()
  52 |     await page.keyboard.press('Enter')
  53 | 
  54 |     // 9. Test Slash command menu trigger
  55 |     await page.keyboard.type('/faq')
  56 |     const slashMenu = page.locator('.slash-menu')
  57 |     await expect(slashMenu).toBeVisible()
  58 | 
  59 |     const faqCommand = page.locator('.slash-item:has-text("FAQ Block")')
  60 |     await expect(faqCommand).toBeVisible()
  61 |     await faqCommand.click()
  62 | 
  63 |     // 10. Verify hidden content input is synced with serialized HTML
  64 |     const contentField = page.locator('#content-field')
  65 |     await expect(contentField).toHaveValue(/details/)
  66 |   })
  67 | })
  68 | 
```