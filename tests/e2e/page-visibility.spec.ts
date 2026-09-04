import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

const dataPath = path.resolve(__dirname, '../fixtures/data/page-visibility.json')

test.describe.serial('Content Visibility Gate (W-1002 & W-1004)', () => {
  test.beforeEach(async () => {
    fs.writeFileSync(
      dataPath,
      JSON.stringify({ blog: false, gallery: false, portfolio: false, venues: false }, null, 4),
      'utf-8'
    )
    await new Promise((resolve) => setTimeout(resolve, 300))
  })

  test.afterAll(() => {
    fs.writeFileSync(
      dataPath,
      JSON.stringify({ blog: true, gallery: true, portfolio: true, venues: true }, null, 4),
      'utf-8'
    )
  })

  const safeGoto = async (page: any, url: string) => {
    try {
      return await page.goto(url, { waitUntil: 'domcontentloaded' })
    } catch (err: any) {
      if (err?.message?.includes('ERR_ABORTED')) {
        await page.waitForTimeout(500)
        return await page.goto(url, { waitUntil: 'domcontentloaded' })
      }
      throw err
    }
  }



  test('positive control: /services/ is always accessible and returns 200', async ({ page }) => {
    const response = await page.goto('/services/')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Services')
  })

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

