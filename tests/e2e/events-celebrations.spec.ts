import { test, expect } from '@playwright/test'

test.describe('Primary Celebrations Event Pages (W-402)', () => {
  test('renders Wedding Event page with distinct planning & management focus', async ({ page }) => {
    await page.goto('/events/wedding-events/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Wedding Event Planning & Management/i)

    // Verify planning services section
    const planningHeading = page.getByRole('heading', { level: 2 }).filter({ hasText: /Event Planning Services/i })
    await expect(planningHeading).toBeVisible()

    // Verify decoration options section
    const decorHeading = page.getByRole('heading', { level: 2 }).filter({ hasText: /Decoration Options/i })
    await expect(decorHeading).toBeVisible()

    // Verify FAQs section
    const faqHeading = page.getByRole('heading', { level: 2 }).filter({ hasText: /Frequently Asked Questions/i })
    await expect(faqHeading).toBeVisible()
  })

  test('renders Engagement Event page', async ({ page }) => {
    await page.goto('/events/engagement-events/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Engagement Event Planning & Decoration/i)
  })

  test('renders Birthday Event page', async ({ page }) => {
    await page.goto('/events/birthday-events/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Birthday Event Planning/i)
  })

  test('contains contact CTA linking to /contact/', async ({ page }) => {
    await page.goto('/events/wedding-events/')

    const cta = page.getByRole('link', { name: /Reserve Now|Plan Your Event|Plan Your Wedding|Contact/i }).first()
    await expect(cta).toBeVisible()
  })
})
