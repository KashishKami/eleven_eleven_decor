# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: php-admin-visibility.spec.ts >> PHP Admin Panel: Page Visibility Controls (W-1005) >> authenticates and toggles page visibility live from admin dashboard
- Location: tests\e2e\php-admin-visibility.spec.ts:24:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.toast-success, #visibility-status-msg')
Expected pattern: /updated|saved/i
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('.toast-success, #visibility-status-msg')
    11 × locator resolved to <span class="toast-success" id="visibility-status-msg">Saving...</span>
       - unexpected value "Saving..."
    3 × locator resolved to <span class="toast-success" id="visibility-status-msg"></span>
      - unexpected value ""

```

```yaml
- banner:
  - text: 11:11 DECOR
  - paragraph: Website Management Studio
  - link "+ Create New Post":
    - /url: new-post.php
  - link "View Live Site ↗":
    - /url: http://localhost:3000/blog
  - link "Log Out":
    - /url: logout.php
- link "Blog Articles & Visibility":
  - /url: dashboard.php
- link "Portfolio Showcase":
  - /url: portfolio.php
- link "Venues Directory":
  - /url: venues.php
- link "Photo Gallery":
  - /url: gallery.php
- text: Page & Content Visibility Controls
- paragraph: Toggle sections ON or OFF to control public access, navigation links, and sitemap indexing. When hidden, pages return 404 and disappear from menus.
- heading "Blog Articles" [level=4]
- paragraph: /blog/ & stories
- checkbox
- heading "Photo Gallery" [level=4]
- paragraph: /gallery/
- checkbox
- heading "Portfolio Showcase" [level=4]
- paragraph: /portfolio/ & projects
- checkbox
- heading "Venues Archive" [level=4]
- paragraph: /venues/ & detail pages
- checkbox
- text: ⚠️
- strong: "GoDaddy Static Build Notice:"
- text: Changes update the server configuration immediately. Run
- code: pnpm build
- text: to re-export static files when publishing to production.
- heading "Blog Articles Management" [level=3]
- table:
  - rowgroup:
    - row "Photo Article Title Category Date Status Actions":
      - columnheader "Photo"
      - columnheader "Article Title"
      - columnheader "Category"
      - columnheader "Date"
      - columnheader "Status"
      - columnheader "Actions"
  - rowgroup:
    - 'row "Destination Event Planning: Navigating Multi-Day Logistics & Local Sourcing /blog/venue-destination-events/destination-event-planning-logistics Venue & Destination Events Aug 24, 2026 Published Edit Delete"':
      - cell
      - 'cell "Destination Event Planning: Navigating Multi-Day Logistics & Local Sourcing /blog/venue-destination-events/destination-event-planning-logistics"':
        - strong: "Destination Event Planning: Navigating Multi-Day Logistics & Local Sourcing"
        - text: /blog/venue-destination-events/destination-event-planning-logistics
      - cell "Venue & Destination Events"
      - cell "Aug 24, 2026"
      - cell "Published"
      - cell "Edit Delete":
        - link "Edit":
          - /url: edit-post.php?id=5
        - link "Delete":
          - /url: delete-post.php?id=5
    - row "Designing Executive Corporate Galas That Reinforce Brand Authority /blog/corporate-events/executive-corporate-gala-design Corporate Events Aug 21, 2026 Published Edit Delete":
      - cell
      - cell "Designing Executive Corporate Galas That Reinforce Brand Authority /blog/corporate-events/executive-corporate-gala-design":
        - strong: Designing Executive Corporate Galas That Reinforce Brand Authority
        - text: /blog/corporate-events/executive-corporate-gala-design
      - cell "Corporate Events"
      - cell "Aug 21, 2026"
      - cell "Published"
      - cell "Edit Delete":
        - link "Edit":
          - /url: edit-post.php?id=4
        - link "Delete":
          - /url: delete-post.php?id=4
    - 'row "The Art of the Haute Couture Tablescape: Textures, Florals & Light /blog/decoration-ideas/haute-couture-tablescape-ideas Decoration Ideas Aug 18, 2026 Published Edit Delete"':
      - cell
      - 'cell "The Art of the Haute Couture Tablescape: Textures, Florals & Light /blog/decoration-ideas/haute-couture-tablescape-ideas"':
        - strong: "The Art of the Haute Couture Tablescape: Textures, Florals & Light"
        - text: /blog/decoration-ideas/haute-couture-tablescape-ideas
      - cell "Decoration Ideas"
      - cell "Aug 18, 2026"
      - cell "Published"
      - cell "Edit Delete":
        - link "Edit":
          - /url: edit-post.php?id=3
        - link "Delete":
          - /url: delete-post.php?id=3
    - row "5 Crucial Event Planning Mistakes and How to Prevent Them /blog/event-planning/top-event-planning-mistakes-to-avoid Event Planning Aug 15, 2026 Published Edit Delete":
      - cell
      - cell "5 Crucial Event Planning Mistakes and How to Prevent Them /blog/event-planning/top-event-planning-mistakes-to-avoid":
        - strong: 5 Crucial Event Planning Mistakes and How to Prevent Them
        - text: /blog/event-planning/top-event-planning-mistakes-to-avoid
      - cell "Event Planning"
      - cell "Aug 15, 2026"
      - cell "Published"
      - cell "Edit Delete":
        - link "Edit":
          - /url: edit-post.php?id=2
        - link "Delete":
          - /url: delete-post.php?id=2
    - 'row "The Complete Wedding Decor Checklist: From Mandap to Grand Reception /blog/wedding-planning/complete-wedding-decor-checklist Wedding Planning Aug 10, 2026 Published Edit Delete"':
      - cell
      - 'cell "The Complete Wedding Decor Checklist: From Mandap to Grand Reception /blog/wedding-planning/complete-wedding-decor-checklist"':
        - strong: "The Complete Wedding Decor Checklist: From Mandap to Grand Reception"
        - text: /blog/wedding-planning/complete-wedding-decor-checklist
      - cell "Wedding Planning"
      - cell "Aug 10, 2026"
      - cell "Published"
      - cell "Edit Delete":
        - link "Edit":
          - /url: edit-post.php?id=1
        - link "Delete":
          - /url: delete-post.php?id=1
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import fs from 'fs'
  3  | import path from 'path'
  4  | 
  5  | const dataPath = path.resolve(__dirname, '../../php-admin/data/page-visibility.json')
  6  | 
  7  | test.describe.serial('PHP Admin Panel: Page Visibility Controls (W-1005)', () => {
  8  |   test.beforeAll(() => {
  9  |     fs.writeFileSync(
  10 |       dataPath,
  11 |       JSON.stringify({ blog: false, gallery: false, portfolio: false, venues: false }, null, 4),
  12 |       'utf-8'
  13 |     )
  14 |   })
  15 | 
  16 |   test.afterAll(() => {
  17 |     fs.writeFileSync(
  18 |       dataPath,
  19 |       JSON.stringify({ blog: true, gallery: true, portfolio: true, venues: true }, null, 4),
  20 |       'utf-8'
  21 |     )
  22 |   })
  23 | 
  24 |   test('authenticates and toggles page visibility live from admin dashboard', async ({ page }) => {
  25 |     // 1. Visit PHP Admin login
  26 |     await page.goto('http://127.0.0.1:8080/manage-7f3b9x2k/index.php')
  27 | 
  28 |     // 2. Log in if password prompt exists
  29 |     const passwordInput = page.locator('input[type="password"]')
  30 |     if (await passwordInput.isVisible()) {
  31 |       await passwordInput.fill('Admin1111Decor!')
  32 |       await page.locator('button[type="submit"]').click()
  33 |     }
  34 | 
  35 |     await expect(page).toHaveURL(/dashboard\.php/)
  36 | 
  37 |     // 3. Assert "Page Visibility" section exists
  38 |     const visibilitySection = page.locator('#page-visibility-card, [data-testid="page-visibility-card"]')
  39 |     await expect(visibilitySection).toBeVisible()
  40 | 
  41 |     // 4. Assert 3 toggles exist: gallery, portfolio, venues
  42 |     const galleryToggle = page.locator('input#toggle-gallery, input[name="visibility_gallery"]')
  43 |     const portfolioToggle = page.locator('input#toggle-portfolio, input[name="visibility_portfolio"]')
  44 |     const venuesToggle = page.locator('input#toggle-venues, input[name="visibility_venues"]')
  45 | 
  46 |     await expect(galleryToggle).toBeVisible()
  47 |     await expect(portfolioToggle).toBeVisible()
  48 |     await expect(venuesToggle).toBeVisible()
  49 | 
  50 |     // 5. Initial state should all be unchecked (false)
  51 |     await expect(galleryToggle).not.toBeChecked()
  52 |     await expect(portfolioToggle).not.toBeChecked()
  53 |     await expect(venuesToggle).not.toBeChecked()
  54 | 
  55 |     // 6. Click gallery toggle to turn ON
  56 |     await galleryToggle.click()
  57 |     await expect(page.locator('.toast-success, #visibility-status-msg')).toContainText(/updated|saved/i)
  58 | 
  59 |     // 7. Click gallery toggle again to restore OFF state
  60 |     await galleryToggle.click()
> 61 |     await expect(page.locator('.toast-success, #visibility-status-msg')).toContainText(/updated|saved/i)
     |                                                                          ^ Error: expect(locator).toContainText(expected) failed
  62 |     await expect(galleryToggle).not.toBeChecked()
  63 |   })
  64 | })
  65 | 
```