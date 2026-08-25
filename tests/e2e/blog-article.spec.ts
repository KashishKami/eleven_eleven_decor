import { test, expect } from '@playwright/test'

test.describe('Blog Single Article Detail Page (W-702)', () => {
  test('renders article detail with H1, author, reading progress bar, schema, and related CTA', async ({ page }) => {
    await page.goto('/blog/wedding-planning/complete-wedding-decor-checklist')

    // Verify H1
    const heading = page.locator('h1')
    await expect(heading).toContainText(/The Complete Wedding Decor Checklist/i)

    // Verify author and date metadata
    const metaContainer = page.locator('text=By 1111 Decor Design Studio')
    await expect(metaContainer).toBeVisible()

    // Verify main article body content
    const mainContent = page.locator('main')
    await expect(mainContent).toContainText(/The Foundation of Luxury Wedding Decor/i)

    // Verify related service CTA link
    const serviceCta = page.getByRole('link', { name: /Explore Service/i })
    await expect(serviceCta).toBeVisible()
    await expect(serviceCta).toHaveAttribute('href', '/services/wedding-decoration/')

    // Verify client-side Article JSON-LD schema is injected into document
    const schemaScript = page.locator('script#article-jsonld')
    await expect(schemaScript).toBeAttached()
    const schemaText = await schemaScript.textContent()
    expect(schemaText).toContain('"@type":"Article"')
    expect(schemaText).toContain('The Complete Wedding Decor Checklist')
  })
})
