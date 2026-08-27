import { test, expect } from '@playwright/test'

test.describe('Content Visibility Gate (W-1002)', () => {
  test('returns 404 / Not Found for /gallery when visibility is false', async ({ page }) => {
    const response = await page.goto('/gallery')
    expect(response?.status() === 404 || (await page.locator('text=404').count()) > 0).toBeTruthy()
    await expect(page.locator('text=404 — Page Not Found')).toBeVisible()
  })

  test('returns 404 / Not Found for /portfolio and /portfolio/[slug] when visibility is false', async ({ page }) => {
    const responseIndex = await page.goto('/portfolio')
    expect(responseIndex?.status() === 404 || (await page.locator('text=404').count()) > 0).toBeTruthy()
    await expect(page.locator('text=404 — Page Not Found')).toBeVisible()

    const responseSlug = await page.goto('/portfolio/luxury-himalayan-resort-wedding')
    expect(responseSlug?.status() === 404 || (await page.locator('text=404').count()) > 0).toBeTruthy()
    await expect(page.locator('text=404 — Page Not Found')).toBeVisible()
  })

  test('returns 404 / Not Found for /venues, /venue, and /venues/[slug] when visibility is false', async ({ page }) => {
    const responseVenues = await page.goto('/venues')
    expect(responseVenues?.status() === 404 || (await page.locator('text=404').count()) > 0).toBeTruthy()
    await expect(page.locator('text=404 — Page Not Found')).toBeVisible()

    const responseVenue = await page.goto('/venue')
    expect(responseVenue?.status() === 404 || (await page.locator('text=404').count()) > 0).toBeTruthy()
    await expect(page.locator('text=404 — Page Not Found')).toBeVisible()

    const responseSlug = await page.goto('/venues/grand-heritage-palace')
    expect(responseSlug?.status() === 404 || (await page.locator('text=404').count()) > 0).toBeTruthy()
    await expect(page.locator('text=404 — Page Not Found')).toBeVisible()
  })

  test('positive control: /services/ is always accessible and returns 200', async ({ page }) => {
    const response = await page.goto('/services/')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Services')
  })
})

test.describe('Navigation & Footer Hidden Links Gate (W-1004)', () => {
  test('does NOT render any gallery, portfolio, or venues links in navigation or footer when visibility is false', async ({
    page,
  }) => {
    await page.goto('/')

    // Check all anchor hrefs on the page
    const galleryLinks = page.locator('a[href*="/gallery"]')
    const portfolioLinks = page.locator('a[href*="/portfolio"]')
    const venuesLinks = page.locator('a[href*="/venues"], a[href="/venue/"], a[href="/venue"]')

    await expect(galleryLinks).toHaveCount(0)
    await expect(portfolioLinks).toHaveCount(0)
    await expect(venuesLinks).toHaveCount(0)

    // Positive control: Services links MUST exist
    const servicesLinks = page.locator('a[href*="/services"]')
    expect(await servicesLinks.count()).toBeGreaterThan(0)
  })
})
