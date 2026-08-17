import { test, expect } from '@playwright/test'

test.describe('About Us Page (W-501)', () => {
  test('renders H1, brand story sections, and contact CTA', async ({ page }) => {
    await page.goto('/about-us/')

    // 1. Assert main H1 heading from Section 3 of Content Handoff
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toBeVisible()
    await expect(mainHeading).toContainText('Creating Experiences, Not Just Events')

    // 2. Assert key editorial section titles exist
    await expect(page.getByText('OUR APPROACH', { exact: false }).first()).toBeVisible()
    await expect(page.getByText('PLANNING & DÉCOR, TOGETHER', { exact: false }).first()).toBeVisible()
    await expect(page.getByText('ATTENTION TO DETAIL', { exact: false }).first()).toBeVisible()
    await expect(page.getByText('ON EVENT DAY', { exact: false }).first()).toBeVisible()

    // 3. Assert CTA link to contact page
    const ctaButton = page.getByRole('link', { name: /plan your event|contact us/i })
    await expect(ctaButton.first()).toBeVisible()
    await expect(ctaButton.first()).toHaveAttribute('href', /^\/contact\/?$/)
  })
})
