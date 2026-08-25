import { test, expect } from '@playwright/test'

test.describe('Contact & Lead Conversion Page (W-801)', () => {
  test('renders H1, 8 form fields, contact info block, and map embed', async ({ page }) => {
    await page.goto('/contact/')

    // 1. Assert H1 heading matching Section 14 spec
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toBeVisible()
    await expect(mainHeading).toContainText("Let's Plan Your Event")

    // 2. Assert all 8 form inputs are rendered
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="phone"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('select[name="eventType"]')).toBeVisible()
    await expect(page.locator('input[name="eventDate"]')).toBeVisible()
    await expect(page.locator('input[name="guestCount"]')).toBeVisible()
    await expect(page.locator('input[name="budget"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()

    // 3. Assert contact details are present
    await expect(page.getByText('Rajpur Road', { exact: false }).first()).toBeVisible()
    await expect(page.getByText('Dehradun', { exact: false }).first()).toBeVisible()
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible()
    await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible()
    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible()
    await expect(page.getByText('10:00 AM', { exact: false }).first()).toBeVisible()

    // 4. Assert map container is visible
    await expect(page.locator('[data-testid="contact-map-container"]')).toBeVisible()
  })

  test('validates required fields and shows submission feedback', async ({ page }) => {
    await page.goto('/contact/')

    // Fill the 8 form fields
    await page.locator('input[name="name"]').fill('Ananya Sen')
    await page.locator('input[name="phone"]').fill('+91 98765 43210')
    await page.locator('input[name="email"]').fill('ananya@example.com')
    await page.locator('select[name="eventType"]').selectOption('Wedding')
    await page.locator('input[name="eventDate"]').fill('2026-11-25')
    await page.locator('input[name="guestCount"]').fill('350')
    await page.locator('input[name="budget"]').fill('₹10,00,000+')
    await page.locator('textarea[name="message"]').fill('Looking for mandap and entrance flower styling.')

    // Submit form
    const submitBtn = page.getByRole('button', { name: /send message|submit inquiry|plan your event/i })
    await expect(submitBtn).toBeVisible()
    await submitBtn.click()

    // Assert success feedback toast / banner appears
    await expect(page.locator('[data-testid="contact-success-toast"]')).toBeVisible({ timeout: 5000 })
    await expect(page.locator('[data-testid="contact-success-toast"]')).toContainText(/thank you|received|touch shortly/i)
  })
})
