import { test, expect } from '@playwright/test'

test.describe('Planning & Management Service Pages', () => {
  test('should display Event Management Services page correctly', async ({ page }) => {
    await page.goto('/services/event-management/')
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text).toContain('Management')

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('should display Event Planning Services page correctly', async ({ page }) => {
    await page.goto('/services/event-planning/')
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text).toContain('Planning')
  })

  test('should display Corporate Event Management page correctly', async ({ page }) => {
    await page.goto('/services/corporate-event-management/')
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text).toContain('Corporate')
  })
})
