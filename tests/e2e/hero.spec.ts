import { test, expect } from '@playwright/test'

test.describe('Hero Section (W-201)', () => {
  test('renders full-viewport hero section with headline and CTA buttons', async ({ page }) => {
    await page.goto('/')

    const heroSection = page.locator('#hero')
    await expect(heroSection).toBeVisible()

    const heading = heroSection.locator('h1')
    await expect(heading).toBeVisible()
    const headingText = await heading.textContent()
    expect(headingText).toContain('Events')

    const contactBtn = page.getByRole('link', { name: /contact us now/i })
    await expect(contactBtn).toBeVisible()

    const learnBtn = page.getByRole('link', { name: /learn more/i })
    await expect(learnBtn).toBeVisible()
  })
})
