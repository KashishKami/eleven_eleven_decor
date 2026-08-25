import { test, expect } from '@playwright/test'

test.describe('About Section (W-202)', () => {
  test('renders about section with heading and discover link', async ({ page }) => {
    await page.goto('/')

    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()

    const headingText = await aboutSection.locator('h2').textContent()
    expect(headingText).toContain('Creating Experiences')

    const discoverLink = page.getByRole('link', { name: /discover 11:11 decor/i })
    await expect(discoverLink).toBeVisible()
  })
})
