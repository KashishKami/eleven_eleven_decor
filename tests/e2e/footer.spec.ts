import { test, expect } from '@playwright/test'

test.describe('Footer CTA Banner & Footer (W-210)', () => {
  test('renders footer CTA and full footer navigation columns', async ({ page }) => {
    await page.goto('/')

    const cta = page.locator('#footer-cta')
    await expect(cta).toBeVisible()
    await expect(cta.locator('h2')).toContainText(/Unforgettable Catering/i)

    const reserveBtn = cta.getByRole('link', { name: /reserve now/i })
    await expect(reserveBtn).toBeVisible()

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer).toContainText(/1111 Decor/i)
  })
})
