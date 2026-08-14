import { test, expect } from '@playwright/test'

test.describe('About Section (W-202)', () => {
  test('renders about section with heading and learn about us link', async ({ page }) => {
    await page.goto('/')

    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()

    await expect(aboutSection.locator('h2')).toContainText(/Professional Catering Teams/i)

    const learnLink = page.getByRole('link', { name: /learn about us/i })
    await expect(learnLink).toBeVisible()
    await expect(learnLink).toHaveAttribute('href', '/about-us')
  })
})
