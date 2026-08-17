import { test, expect } from '@playwright/test'

test.describe('Events Main Hub Page (W-401)', () => {
  test('renders main heading and description', async ({ page }) => {
    await page.goto('/events/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Events We Plan, Manage & Decorate/i)
  })

  test('renders all 6 event category cards with working links', async ({ page }) => {
    await page.goto('/events/')

    const eventSlugs = [
      'wedding-events',
      'corporate-events',
      'birthday-events',
      'engagement-events',
      'private-events',
      'destination-events',
    ]

    for (const slug of eventSlugs) {
      const link = page.locator(`a[href*="/events/${slug}"]`)
      await expect(link.first()).toBeVisible()
    }
  })

  test('renders FAQ accordion section', async ({ page }) => {
    await page.goto('/events/')

    const faqHeading = page.getByRole('heading', { level: 2 }).filter({ hasText: /Frequently Asked Questions/i })
    await expect(faqHeading).toBeVisible()
  })

  test('supports legacy /event route by redirecting or rendering events hub', async ({ page }) => {
    await page.goto('/event/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Events We Plan, Manage & Decorate/i)
  })
})
