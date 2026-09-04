# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gallery.spec.ts >> Interactive Photo Gallery & Lightbox Modal (W-603) >> renders photo gallery grid and opens Lightbox modal on image click
- Location: tests\e2e\gallery.spec.ts:16:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="gallery-item"]').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="gallery-item"]').first()

```

```yaml
- banner:
  - link "11:11 Decor — Event Management & Décor Studio":
    - /url: /
    - img "11:11 Decor — Event Management & Décor Studio"
  - button "Open menu"
- main:
  - text: VISUAL PORTFOLIO
  - heading "M o m e n t s W e ' v e H e l p e d C r e a t e" [level=1]
  - paragraph: A curated visual archive capturing the elegance, floral craftsmanship, and surgical precision behind our events.
  - button "All"
  - button "Weddings"
  - button "Corporate Events"
  - button "Birthdays"
  - button "Engagements"
  - button "Décor"
  - button "Stage Designs"
  - button "Venue Designs"
  - paragraph: Curating Event Photography
  - paragraph: Our visual gallery of floral installations, mandaps, and lighting architecture is currently being curated. Check back soon.
  - text: START THE CONVERSATION
  - heading "L e t ' s c r e a t e s o m e t h i n g u n f o r g e t t a b l e ." [level=2]
  - paragraph: Tell us about your event — date, guest count, venue, and vision. We'll follow up with availability and a custom quote.
  - link "Plan Your Event →":
    - /url: /contact/
  - link "WhatsApp Us ↗":
    - /url: https://wa.me/917466854475?text=Hello%2011:11%20Decor,%20I%20would%20like%20to%20inquire%20about%20event%20planning%20and%20decor%20services.
- contentinfo:
  - link "11:11 Decor":
    - /url: /
  - paragraph: An event management and décor studio. We plan and design weddings, celebrations, and corporate events from first concept to final detail.
  - link "+91 74668 54475":
    - /url: tel:+917466854475
  - link "hello1111decor@gmail.com":
    - /url: mailto:hello1111decor@gmail.com
  - heading "Our Services" [level=4]
  - list:
    - listitem:
      - link "Event Planning":
        - /url: /services/event-planning/
    - listitem:
      - link "Event Decoration":
        - /url: /services/event-decoration/
    - listitem:
      - link "Wedding Decoration":
        - /url: /services/wedding-decoration/
    - listitem:
      - link "Corporate Event Management":
        - /url: /services/corporate-event-management/
    - listitem:
      - link "Stage Decoration":
        - /url: /services/stage-decoration/
    - listitem:
      - link "Birthday Decoration":
        - /url: /services/birthday-decoration/
    - listitem:
      - link "Floral Decoration":
        - /url: /services/floral-decoration/
    - listitem:
      - link "All Services →":
        - /url: /services/
  - heading "Event Types" [level=4]
  - list:
    - listitem:
      - link "Wedding Events":
        - /url: /events/wedding-events/
    - listitem:
      - link "Corporate Events":
        - /url: /events/corporate-events/
    - listitem:
      - link "Birthday Events":
        - /url: /events/birthday-events/
    - listitem:
      - link "Engagement Events":
        - /url: /events/engagement-events/
    - listitem:
      - link "Private Events":
        - /url: /events/private-events/
    - listitem:
      - link "Destination Events":
        - /url: /events/destination-events/
  - heading "Company" [level=4]
  - list:
    - listitem:
      - link "About Us":
        - /url: /about-us/
    - listitem:
      - link "Packages":
        - /url: /packages/
    - listitem:
      - link "Contact Us":
        - /url: /contact/
  - paragraph: © 2026 11:11 Decor (Eleven Eleven Decor). All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import fs from 'fs'
  3  | import path from 'path'
  4  | 
  5  | const dataPath = path.resolve(__dirname, '../fixtures/data/page-visibility.json')
  6  | 
  7  | test.describe('Interactive Photo Gallery & Lightbox Modal (W-603)', () => {
  8  |   test.beforeAll(() => {
  9  |     fs.writeFileSync(
  10 |       dataPath,
  11 |       JSON.stringify({ blog: true, gallery: true, portfolio: true, venues: true }, null, 4),
  12 |       'utf-8'
  13 |     )
  14 |   })
  15 | 
  16 |   test('renders photo gallery grid and opens Lightbox modal on image click', async ({ page }) => {
  17 |     await page.goto('/gallery/')
  18 | 
  19 |     // 1. Assert main H1 heading
  20 |     const mainHeading = page.getByRole('heading', { level: 1 })
  21 |     await expect(mainHeading).toBeVisible()
  22 |     await expect(mainHeading).toContainText("Moments We've Helped Create")
  23 | 
  24 |     // 2. Click a gallery thumbnail to trigger Lightbox modal
  25 |     const firstThumbnail = page.locator('[data-testid="gallery-item"]').first()
> 26 |     await expect(firstThumbnail).toBeVisible({ timeout: 10000 })
     |                                  ^ Error: expect(locator).toBeVisible() failed
  27 |     await firstThumbnail.click()
  28 | 
  29 |     // 3. Assert Lightbox modal opens
  30 |     const modal = page.locator('#lightbox-modal, [data-testid="lightbox-modal"]')
  31 |     await expect(modal).toBeVisible()
  32 | 
  33 |     // 4. Press Escape to close Lightbox modal
  34 |     await page.keyboard.press('Escape')
  35 |     await expect(modal).not.toBeVisible()
  36 |   })
  37 | })
  38 | 
```