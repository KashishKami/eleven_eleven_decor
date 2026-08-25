import { test, expect } from '@playwright/test'

test.describe('Blog Section (W-209)', () => {
  test('renders blog articles with read more links', async ({ page }) => {
    await page.goto('/blog/')

    const main = page.locator('main')
    await expect(main).toBeVisible()

    const readMoreLinks = page.getByRole('link', { name: /read article/i })
    await expect(readMoreLinks.first()).toBeVisible()
  })
})
