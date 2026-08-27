import { test, expect } from '@playwright/test'

test.describe('Blog Visibility Gate (W-1101)', () => {
  test('returns 404 / Not Found for /blog and /blog/[...slug] when blog visibility is false', async ({ page }) => {
    const responseIndex = await page.goto('/blog')
    expect(responseIndex?.status() === 404 || (await page.locator('text=404').count()) > 0).toBeTruthy()
    await expect(page.locator('text=404 — Page Not Found')).toBeVisible()

    const responseSlug = await page.goto('/blog/wedding-planning/complete-wedding-decor-checklist')
    expect(responseSlug?.status() === 404 || (await page.locator('text=404').count()) > 0).toBeTruthy()
    await expect(page.locator('text=404 — Page Not Found')).toBeVisible()
  })

  test('does NOT render any blog links in navigation or footer when blog visibility is false', async ({ page }) => {
    await page.goto('/')

    const blogLinks = page.locator('a[href*="/blog"]')
    await expect(blogLinks).toHaveCount(0)
  })

  test('renders 4th toggle switch for Blog in PHP admin dashboard', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')

    const passwordInput = page.locator('input[type="password"]')
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('Admin1111Decor!')
      await page.locator('button[type="submit"]').click()
    }

    await expect(page).toHaveURL(/dashboard\.php/)

    const blogToggle = page.locator('input#toggle-blog, input[name="visibility_blog"]')
    await expect(blogToggle).toBeVisible()
    await expect(blogToggle).not.toBeChecked()
  })
})
