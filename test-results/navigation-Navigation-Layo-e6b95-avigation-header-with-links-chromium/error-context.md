# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation & Layout Shell >> renders sticky navigation header with links
- Location: tests\e2e\navigation.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/
Call log:
  - navigating to "http://127.0.0.1:3011/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Navigation & Layout Shell', () => {
  4  |   test('renders sticky navigation header with links', async ({ page, isMobile }) => {
> 5  |     await page.goto('/')
     |                ^ Error: page.goto: net::ERR_ADDRESS_IN_USE at http://127.0.0.1:3011/
  6  | 
  7  |     const nav = page.locator('header')
  8  |     await expect(nav).toBeVisible()
  9  | 
  10 |     if (!isMobile) {
  11 |       await expect(page.getByRole('button', { name: /services/i }).first()).toBeVisible()
  12 |       await expect(page.getByRole('button', { name: /events/i }).first()).toBeVisible()
  13 |       await expect(page.getByRole('link', { name: /portfolio/i }).first()).toBeVisible()
  14 |       await expect(page.getByRole('link', { name: /blog/i }).first()).toBeVisible()
  15 |       await expect(page.getByRole('link', { name: /about us/i }).first()).toBeVisible()
  16 |       await expect(page.getByRole('link', { name: /plan your event/i }).first()).toBeVisible()
  17 |     }
  18 |   })
  19 | 
  20 |   test('navigation applies scrolled state when page is scrolled', async ({ page }) => {
  21 |     await page.goto('/')
  22 |     const navContainer = page.locator('header')
  23 |     await expect(navContainer).toHaveAttribute('data-scrolled', 'false')
  24 | 
  25 |     // Allow initial mount and ScrollTrigger refresh timers (100-150ms) to settle
  26 |     await page.waitForTimeout(300)
  27 | 
  28 |     await page.evaluate(() => {
  29 |       const lenis = (window as unknown as { lenis?: { scrollTo: (y: number, opts: unknown) => void } }).lenis
  30 |       if (lenis) {
  31 |         lenis.scrollTo(200, { immediate: true })
  32 |       } else {
  33 |         window.scrollTo(0, 200)
  34 |       }
  35 |       window.dispatchEvent(new Event('scroll'))
  36 |     })
  37 |     await page.waitForTimeout(300)
  38 | 
  39 |     await expect(navContainer).toHaveAttribute('data-scrolled', 'true')
  40 |   })
  41 | 
  42 |   test('mobile hamburger opens drawer on small screens', async ({ page, isMobile }) => {
  43 |     test.skip(!isMobile, 'Mobile-only test')
  44 | 
  45 |     await page.goto('/')
  46 | 
  47 |     const hamburgerBtn = page.locator('button.mobile-hamburger')
  48 |     await expect(hamburgerBtn).toBeVisible()
  49 | 
  50 |     await hamburgerBtn.click()
  51 | 
  52 |     const mobileDrawer = page.locator('#mobile-menu-drawer')
  53 |     await expect(mobileDrawer).toBeVisible()
  54 |     await expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true')
  55 |   })
  56 | })
  57 | 
```