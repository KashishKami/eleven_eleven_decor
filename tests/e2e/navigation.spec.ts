import { test, expect } from '@playwright/test'

test.describe('Navigation & Layout Shell', () => {
  test('renders top bar and sticky navigation header', async ({ page }) => {
    await page.goto('/')

    // Check top bar elements
    const topBar = page.locator('#top-bar')
    await expect(topBar).toBeVisible()
    await expect(topBar).toContainText(/1111 Decor/i)

    // Check navigation element
    const nav = page.locator('header nav')
    await expect(nav).toBeVisible()

    // Check key nav links
    await expect(page.getByRole('link', { name: /home/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /about/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /menu/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /events/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible()
  })

  test('navigation applies scrolled state when page is scrolled', async ({ page }) => {
    await page.goto('/')
    const navContainer = page.locator('header')
    await expect(navContainer).toHaveAttribute('data-scrolled', 'false')

    // Scroll down 200px
    await page.evaluate(() => window.scrollTo(0, 200))
    await page.waitForTimeout(300)

    await expect(navContainer).toHaveAttribute('data-scrolled', 'true')
  })

  test('mobile hamburger opens drawer on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const hamburgerBtn = page.getByRole('button', { name: /open menu/i })
    await expect(hamburgerBtn).toBeVisible()

    await hamburgerBtn.click()

    const mobileDrawer = page.locator('#mobile-menu-drawer')
    await expect(mobileDrawer).toBeVisible()
    await expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true')
  })
})
