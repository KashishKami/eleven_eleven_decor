import { test, expect } from '@playwright/test'

test.describe('Curated Venues Section (W-207)', () => {
  test('renders venue teaser cards with links', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#venues-teaser')
    await expect(section).toBeVisible()

    const exploreLink = section.getByRole('link', { name: /explore venues directory/i })
    await expect(exploreLink).toBeVisible()
  })
})
