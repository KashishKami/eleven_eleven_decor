import { test, expect } from '@playwright/test'

const SERVICE_SLUGS = [
  'event-management',
  'event-planning',
  'event-decoration',
  'wedding-decoration',
  'birthday-decoration',
  'corporate-event-management',
  'stage-decoration',
  'venue-decoration',
  'floral-decoration',
  'lighting-production',
  'entertainment-hospitality',
]

test.describe('All 11 Individual Service Detail Pages (/services/[slug]/)', () => {
  for (const slug of SERVICE_SLUGS) {
    test(`should render service detail page for /services/${slug}/ with full content`, async ({ page }) => {
      await page.goto(`/services/${slug}/`)

      // Heading check
      const heading = page.locator('h1')
      await expect(heading).toBeVisible()

      // Section blocks check per Section 5 template
      const provideSection = page.locator('[data-testid="what-we-provide"]')
      await expect(provideSection).toBeVisible()

      const expectSection = page.locator('[data-testid="what-you-can-expect"]')
      await expect(expectSection).toBeVisible()

      // FAQ accordion
      const faqAccordion = page.locator('[data-testid="service-faqs"]')
      await expect(faqAccordion).toBeVisible()

      // CTA button to contact page
      const ctaLink = page.locator('[data-testid="service-cta"]')
      await expect(ctaLink).toBeVisible()
      await expect(ctaLink).toHaveAttribute('href', /\/contact\/?/)
    })
  }
})
