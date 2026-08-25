import { test, expect } from '@playwright/test'

test.describe('Phase 7.5: Gutenberg Block Editor & Rank Math SEO Analyzer', () => {
  test('logs into secret PHP admin panel, mounts block editor & live SEO scoring panel', async ({ page }) => {
    page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.text()))
    page.on('pageerror', (err) => console.log('BROWSER ERROR:', err.message))

    // 1. Login
    await page.goto('http://localhost:8080/manage-7f3b9x2k/index.php')
    await page.fill('#password', 'Admin1111Decor!')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/dashboard.php')

    // 2. Navigate to new post page
    await page.goto('http://localhost:8080/manage-7f3b9x2k/new-post.php')
    await page.waitForSelector('#editor-root')

    // 3. Verify editor root and Tiptap ProseMirror region
    const editorRoot = page.locator('#editor-root')
    await expect(editorRoot).toBeVisible()
    const proseMirror = page.locator('.ProseMirror')
    await expect(proseMirror).toBeVisible()

    // 4. Verify Rank Math SEO panel & SVG gauge
    const seoPanel = page.locator('#seo-panel-root')
    await expect(seoPanel).toBeVisible()
    const gauge = page.locator('.seo-gauge')
    await expect(gauge).toBeVisible()

    // 5. Test Live Focus Keyword interaction
    const focusKeywordInput = page.locator('#focus-keyword-input')
    await focusKeywordInput.fill('wedding decoration')

    // 6. Test Title auto-slug
    await page.fill('#title', 'Top Luxury Wedding Decoration Trends 2026 | 1111 Decor')
    const slugInput = page.locator('#slug')
    await expect(slugInput).toHaveValue(/top-luxury-wedding-decoration-trends-2026/)

    // 7. Verify SEO check "Focus keyword used in title" turns passed
    await page.waitForTimeout(500)
    const titleCheckRow = page.locator('.seo-check-row:has-text("Focus keyword used in title")')
    await expect(titleCheckRow).toContainText('✅')

    // 8. Test Toolbar button and editor typing
    await page.locator('.ProseMirror').click()
    await page.keyboard.type('Overview of Luxury Wedding Trends')

    const h2Button = page.locator('.tb-btn:has-text("H2")')
    await h2Button.click()
    await page.keyboard.press('Enter')

    // 9. Test Slash command menu trigger
    await page.keyboard.type('/faq')
    const slashMenu = page.locator('.slash-menu')
    await expect(slashMenu).toBeVisible()

    const faqCommand = page.locator('.slash-item:has-text("FAQ Block")')
    await expect(faqCommand).toBeVisible()
    await faqCommand.click()

    // 10. Verify hidden content input is synced with serialized HTML
    const contentField = page.locator('#content-field')
    await expect(contentField).toHaveValue(/details/)
  })
})
