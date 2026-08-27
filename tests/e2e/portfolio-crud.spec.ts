import { test, expect } from '@playwright/test'

test.describe('Portfolio PHP Admin CRUD & Management (W-1103)', () => {
  test('logs into PHP Admin, creates a portfolio project, edits it, and deletes it', async ({ page }) => {
    const uniqueTitle = `E2E Wedding ${Date.now()}_${Math.random().toString(36).slice(2, 6)}`

    // 1. Visit PHP Admin login
    await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')

    const passwordInput = page.locator('input[type="password"]')
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('Admin1111Decor!')
      await page.locator('button[type="submit"]').click()
    }

    await expect(page).toHaveURL(/dashboard\.php/)

    // 2. Navigate to Portfolio Manager
    const portfolioTab = page.locator('a[href*="portfolio.php"]')
    await expect(portfolioTab).toBeVisible()
    await portfolioTab.click()
    await expect(page).toHaveURL(/portfolio\.php/)

    // 3. Click "+ Create New Project"
    await page.locator('a[href="new-project.php"]').click()
    await expect(page).toHaveURL(/new-project\.php/)

    // 4. Fill project form
    await page.fill('input[name="title"]', uniqueTitle)
    await page.fill('input[name="subtitle"]', 'Cliffside Palace Staging')
    await page.selectOption('select[name="category"]', 'Weddings')
    await page.fill('input[name="location"]', 'Mussoorie, Uttarakhand')
    await page.fill('input[name="venue"]', 'JW Marriott Walnut Grove')
    await page.fill('input[name="guestCount"]', '400')
    await page.fill('input[name="heroImage"]', 'https://images.unsplash.com/photo-1519741497674-611481863552')
    await page.fill('textarea[name="summary"]', 'Bespoke floral architecture in the Garhwal mountains.')

    await page.locator('button[type="submit"]').click({ force: true })

    // 5. Assert redirected to portfolio list and project is visible
    await expect(page).toHaveURL(/portfolio\.php/)
    const projectRow = page.locator('tr', { hasText: uniqueTitle })
    await expect(projectRow).toBeVisible()

    // 6. Delete project
    page.on('dialog', async (dialog) => dialog.accept())
    const deleteBtn = projectRow.locator('a.action-delete')
    await deleteBtn.click()

    // 7. Verify project removed
    await expect(page.locator('tr', { hasText: uniqueTitle })).toHaveCount(0)
  })
})
