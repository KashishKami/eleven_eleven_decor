import { test, expect } from '@playwright/test'

test.describe('Blog Hub & Category Architecture (W-701)', () => {
  test('renders blog hub page with H1, category filter links, and article cards', async ({ page }) => {
    await page.goto('/blog')

    // Verify H1
    const heading = page.locator('h1')
    await expect(heading).toContainText(/News & Insights/i)

    // Verify 9 category navigation links
    const categoryNav = page.locator('nav[aria-label="Blog categories"]')
    await expect(categoryNav).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Weddings$/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Birthdays$/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Corporate Events$/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Parties & Celebrations$/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Event Decoration$/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Event Planning$/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Event Ideas & Inspiration$/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Special Occasions$/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /^Local Event Guides$/i })).toBeVisible()

    // Verify blog cards render
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible({ timeout: 10000 })
    const count = await articles.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('navigates to category archive and filters articles', async ({ page }) => {
    await page.goto('/blog/event-decoration')

    // Verify category archive heading
    const heading = page.locator('h1')
    await expect(heading).toContainText(/Event Decoration/i)

    // Verify articles rendered
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible({ timeout: 10000 })
  })
})
