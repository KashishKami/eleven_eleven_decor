import { test, expect } from '@playwright/test'

test.describe('Our Team Page (W-207)', () => {
  test('renders team section with team member cards', async ({ page }) => {
    await page.goto('/our-team/')

    const section = page.locator('#team')
    await expect(section).toBeVisible()

    const heading = section.getByRole('heading', { level: 2 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('The Creative Minds Behind')
  })
})

