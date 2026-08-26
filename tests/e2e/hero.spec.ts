import { test, expect } from '@playwright/test'

test.describe('Hero Section (W-201)', () => {
  test('renders full-viewport hero section with headline and CTA buttons', async ({ page }) => {
    await page.goto('/')

    const heroSection = page.locator('#hero')
    await expect(heroSection).toBeVisible()

    const heading = heroSection.locator('h1')
    await expect(heading).toBeVisible()
    const headingText = await heading.textContent()
    expect(headingText).toContain('Your Wish Our Creation')

    const planBtn = heroSection.getByRole('link', { name: /plan your event/i })
    await expect(planBtn).toBeVisible()

    const workBtn = heroSection.getByRole('link', { name: /view our work/i })
    await expect(workBtn).toBeVisible()
  })
})
