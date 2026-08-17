import { test, expect } from '@playwright/test'

test.describe('Packages Page (W-502)', () => {
  test('renders H1, 3 tier cards with Custom Quote price labels, and CTAs', async ({ page }) => {
    await page.goto('/packages/')

    // 1. Assert main H1 heading from Section 10 of Content Handoff
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toBeVisible()
    await expect(mainHeading).toContainText('Planning Built Around Your Event')

    // 2. Assert 3 package tier cards are displayed
    await expect(page.getByText('Essential', { exact: true })).toBeVisible()
    await expect(page.getByText('Signature', { exact: true })).toBeVisible()
    await expect(page.getByText('Bespoke', { exact: true })).toBeVisible()

    // 3. Assert Custom Quote price labels are rendered
    const priceLabels = page.getByText('Custom Quote', { exact: true })
    await expect(priceLabels).toHaveCount(3)

    // 4. Assert CTA links to contact page
    const ctaLinks = page.getByRole('link', { name: /request a custom quote|get started|contact/i })
    await expect(ctaLinks.first()).toBeVisible()
    await expect(ctaLinks.first()).toHaveAttribute('href', /^\/contact\/?$/)
  })
})
