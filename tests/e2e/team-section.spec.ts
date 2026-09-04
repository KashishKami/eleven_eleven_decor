import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

const dataPath = path.resolve(__dirname, '../fixtures/data/page-visibility.json')

test.describe('Curated Venues Section (W-207)', () => {
  test.beforeAll(async () => {
    fs.writeFileSync(
      dataPath,
      JSON.stringify({ blog: true, gallery: true, portfolio: true, venues: true }, null, 4),
      'utf-8'
    )
    await new Promise((resolve) => setTimeout(resolve, 300))
  })

  test('renders venue teaser cards with links', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#venues-teaser')
    await expect(section).toBeVisible()

    const exploreLink = section.getByRole('link', { name: /explore venues directory/i })
    await expect(exploreLink).toBeVisible()
  })
})
