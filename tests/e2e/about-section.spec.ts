import { test, expect } from '@playwright/test'

test.describe('About Section (W-202)', () => {
  test('renders about section with heading and learn about us link', async ({ page }) => {
    await page.goto('/')

    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()

    const headingText = await aboutSection.locator('h2').textContent()
    expect(headingText?.toUpperCase()).toContain('CATERING')

    const learnLink = page.getByRole('link', { name: /learn about us/i })
    await expect(learnLink).toBeVisible()
  })
})
