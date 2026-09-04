import { test, expect } from '@playwright/test'

test.describe('Blog Hub & Category Architecture (W-701)', () => {
  test('renders blog hub page with H1, category filter links, and article cards', async ({ page }) => {
    await page.goto('/blog')

    // Verify H1
    const heading = page.locator('h1')
    await expect(heading).toContainText(/News & Insights/i)

    // Verify 5 category navigation links
    const categoryNav = page.locator('nav[aria-label="Blog categories"]')
    await expect(categoryNav).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /Wedding Planning/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /Event Planning/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /Decoration Ideas/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /Corporate Events/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /Venue & Destination/i })).toBeVisible()

    // Verify blog cards render
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible({ timeout: 10000 })
    const count = await articles.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('navigates to category archive and filters articles', async ({ page }) => {
    await page.goto('/blog/decoration-ideas')

    // Verify category archive heading
    const heading = page.locator('h1')
    await expect(heading).toContainText(/Decoration Ideas/i)

    // Verify articles rendered
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible({ timeout: 10000 })
  })
})
