import { test, expect } from '@playwright/test'

test.describe('Niche & Special Event Pages (W-403)', () => {
  test('renders Corporate Event Planning page', async ({ page }) => {
    await page.goto('/events/corporate-events/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Corporate Event Planning/i)

    const faqHeading = page.getByRole('heading', { level: 2 }).filter({ hasText: /Frequently Asked Questions/i })
    await expect(faqHeading).toBeVisible()
  })

  test('renders Private Party Event page', async ({ page }) => {
    await page.goto('/events/private-events/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Private Event Planning/i)
  })

  test('renders Destination Event Planning page with travel logistics', async ({ page }) => {
    await page.goto('/events/destination-events/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Destination Event Planning/i)
  })
})
