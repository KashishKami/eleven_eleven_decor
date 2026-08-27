import { test, expect } from '@playwright/test'

test.describe('Services Main Hub Page (/services/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services/')
  })

  test('should display the main services heading and intro', async ({ page }) => {
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text).toContain('Event')
    expect(text).toContain('Services')
  })

  test('should render 10 service cards with proper links and CTA', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"]')
    await expect(serviceCards).toHaveCount(10)

    // Check first card links to dynamic service route
    const firstCardLink = serviceCards.first().locator('a')
    await expect(firstCardLink).toHaveAttribute('href', /\/services\/[a-z-]+/)
  })

})
