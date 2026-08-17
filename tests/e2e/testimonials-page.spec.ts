import { test, expect } from '@playwright/test'

test.describe('Testimonials Page (W-503)', () => {
  test('renders client quotes, star ratings, and strictly omits review schema per SEO notes', async ({ page }) => {
    await page.goto('/testimonials/')

    // 1. Assert main H1 heading
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toBeVisible()
    await expect(mainHeading).toContainText('Client Words & Celebrations')

    // 2. Assert testimonial cards are visible
    const quoteCards = page.locator('article, .testimonialCard')
    await expect(quoteCards.first()).toBeVisible()

    // 3. SEO Requirement: Ensure NO Review JSON-LD schema is injected into <head> (per Section 11 handoff warning)
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allInnerTexts()
    jsonLdScripts.forEach((script) => {
      expect(script).not.toContain('"@type": "Review"')
      expect(script).not.toContain('"@type":"Review"')
      expect(script).not.toContain('"AggregateRating"')
    })
  })
})
