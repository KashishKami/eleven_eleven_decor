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
  - waiting for locator('#editor-root') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=f2e1]: "Warning: require_once(C:\\Users\\Yuvraj- Dm\\Desktop\\eleven_eleven_decor\\php-admin\\manage-7f3b9x2k/../classes/BlogStore.php): Failed to open stream: No such file or directory in C:\\Users\\Yuvraj- Dm\\Desktop\\eleven_eleven_decor\\php-admin\\manage-7f3b9x2k\\new-post.php on line 6 Fatal error: Uncaught Error: Failed opening required 'C:\\Users\\Yuvraj- Dm\\Desktop\\eleven_eleven_decor\\php-admin\\manage-7f3b9x2k/../classes/BlogStore.php' (include_path='.;C:\\php\\pear') in C:\\Users\\Yuvraj- Dm\\Desktop\\eleven_eleven_decor\\php-admin\\manage-7f3b9x2k\\new-post.php:6 Stack trace: #0 {main} thrown in C:\\Users\\Yuvraj- Dm\\Desktop\\eleven_eleven_decor\\php-admin\\manage-7f3b9x2k\\new-post.php on line 6"
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
  9  |     await page.goto('http://localhost:8080/manage-7f3b9x2k/index.php')
  10 |     await page.fill('#password', 'Admin1111Decor!')
  11 |     await page.click('button[type="submit"]')
  12 |     await page.waitForURL('**/dashboard.php')
  13 | 
  14 |     // 2. Navigate to new post page
  15 |     await page.goto('http://localhost:8080/manage-7f3b9x2k/new-post.php')
> 16 |     await page.waitForSelector('#editor-root')
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
  31 |     const focusKeywordInput = page.locator('#focus-keyword-input')
  32 |     await focusKeywordInput.fill('wedding decoration')
  33 | 
  34 |     // 6. Test Title auto-slug
  35 |     await page.fill('#title', 'Top Luxury Wedding Decoration Trends 2026 | 1111 Decor')
  36 |     const slugInput = page.locator('#slug')
  37 |     await expect(slugInput).toHaveValue(/top-luxury-wedding-decoration-trends-2026/)
  38 | 
  39 |     // 7. Verify SEO check "Focus keyword used in title" turns passed
  40 |     await page.waitForTimeout(500)
  41 |     const titleCheckRow = page.locator('.seo-check-row:has-text("Focus keyword used in title")')
  42 |     await expect(titleCheckRow).toContainText('✅')
  43 | 
  44 |     // 8. Test Toolbar button and editor typing
  45 |     await page.locator('.ProseMirror').click()
  46 |     await page.keyboard.type('Overview of Luxury Wedding Trends')
  47 | 
  48 |     const h2Button = page.locator('.tb-btn:has-text("H2")')
  49 |     await h2Button.click()
  50 |     await page.keyboard.press('Enter')
  51 | 
  52 |     // 9. Test Slash command menu trigger
  53 |     await page.keyboard.type('/faq')
  54 |     const slashMenu = page.locator('.slash-menu')
  55 |     await expect(slashMenu).toBeVisible()
  56 | 
  57 |     const faqCommand = page.locator('.slash-item:has-text("FAQ Block")')
  58 |     await expect(faqCommand).toBeVisible()
  59 |     await faqCommand.click()
  60 | 
  61 |     // 10. Verify hidden content input is synced with serialized HTML
  62 |     const contentField = page.locator('#content-field')
  63 |     await expect(contentField).toHaveValue(/details/)
  64 |   })
  65 | })
  66 | 
```