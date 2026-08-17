import { test, expect } from '@playwright/test'

test.describe('Blog Section (W-209)', () => {
  test('renders 3 blog cards with read more links', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#blog-section')
    await expect(section).toBeVisible()

    const readMoreLinks = section.getByRole('link', { name: /read article/i })
    await expect(readMoreLinks).toHaveCount(3)
  })
})
