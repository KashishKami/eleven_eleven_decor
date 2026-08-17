import { test, expect } from '@playwright/test'

test.describe('Navigation & Layout Shell', () => {
  test('renders sticky navigation header with links', async ({ page, isMobile }) => {
    await page.goto('/')

    const nav = page.locator('header')
    await expect(nav).toBeVisible()

    if (!isMobile) {
      await expect(page.getByRole('link', { name: /home/i }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /about/i }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /menu/i }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /events/i }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible()
    }
  })

  test('navigation applies scrolled state when page is scrolled', async ({ page }) => {
    await page.goto('/')
    const navContainer = page.locator('header')
    await expect(navContainer).toHaveAttribute('data-scrolled', 'false')

    await page.evaluate(() => window.scrollTo(0, 200))
    await page.waitForTimeout(300)

    await expect(navContainer).toHaveAttribute('data-scrolled', 'true')
  })

  test('mobile hamburger opens drawer on small screens', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test')

    await page.goto('/')

    const hamburgerBtn = page.locator('button.mobile-hamburger')
    await expect(hamburgerBtn).toBeVisible()

    await hamburgerBtn.click()

    const mobileDrawer = page.locator('#mobile-menu-drawer')
    await expect(mobileDrawer).toBeVisible()
    await expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true')
  })
})
