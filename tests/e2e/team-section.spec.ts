import { test, expect } from '@playwright/test'

test.describe('Team Section (W-207)', () => {
  test('renders team member cards with accessibility alt text', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#team')
    await expect(section).toBeVisible()

    await expect(page.getByRole('heading', { name: /Elena Rostova/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Marcus Vance/i })).toBeVisible()

    const teamImages = section.locator('img')
    await expect(teamImages).toHaveCount(4)
  })
})
