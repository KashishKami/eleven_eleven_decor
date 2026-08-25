import { test, expect } from '@playwright/test'

test.describe('Footer CTA Banner & Footer (W-210)', () => {
  test('renders footer CTA and full footer navigation columns', async ({ page }) => {
    await page.goto('/')

    const cta = page.locator('#footer-cta')
    await expect(cta).toBeVisible()
    const headingText = await cta.locator('h2').textContent()
    expect(headingText).toMatch(/unforgettable|create|decor/i)

    const planBtn = cta.getByRole('link', { name: /plan your event/i })
    await expect(planBtn).toBeVisible()

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer).toContainText(/11:11 Decor|1111 Decor/i)
  })
})
