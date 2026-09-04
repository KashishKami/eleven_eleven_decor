# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-hub.spec.ts >> Blog Hub & Category Architecture (W-701) >> navigates to category archive and filters articles
- Location: tests\e2e\blog-hub.spec.ts:27:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('article').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('article').first()

```

```yaml
- banner:
  - link "11:11 Decor — Event Management & Décor Studio":
    - /url: /
    - img "11:11 Decor — Event Management & Décor Studio"
  - button "Open menu"
- main:
  - paragraph: CATEGORY ARCHIVE
  - heading "D e c o r a t i o n I d e a s" [level=1]
  - paragraph: Inspiring floral palettes, mandap styling, lighting concepts, and couture tablescapes.
  - navigation "Blog categories":
    - link "All Articles":
      - /url: /blog/
    - link "Wedding Planning":
      - /url: /blog/wedding-planning/
    - link "Event Planning":
      - /url: /blog/event-planning/
    - link "Decoration Ideas":
      - /url: /blog/decoration-ideas/
    - link "Corporate Events":
      - /url: /blog/corporate-events/
    - link "Venue & Destination Events":
      - /url: /blog/venue-destination-events/
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
  2  | 
  3  | test.describe('Blog Hub & Category Architecture (W-701)', () => {
  4  |   test('renders blog hub page with H1, category filter links, and article cards', async ({ page }) => {
  5  |     await page.goto('/blog')
  6  | 
  7  |     // Verify H1
  8  |     const heading = page.locator('h1')
  9  |     await expect(heading).toContainText(/News & Insights/i)
  10 | 
  11 |     // Verify 5 category navigation links
  12 |     const categoryNav = page.locator('nav[aria-label="Blog categories"]')
  13 |     await expect(categoryNav).toBeVisible()
  14 |     await expect(categoryNav.getByRole('link', { name: /Wedding Planning/i })).toBeVisible()
  15 |     await expect(categoryNav.getByRole('link', { name: /Event Planning/i })).toBeVisible()
  16 |     await expect(categoryNav.getByRole('link', { name: /Decoration Ideas/i })).toBeVisible()
  17 |     await expect(categoryNav.getByRole('link', { name: /Corporate Events/i })).toBeVisible()
  18 |     await expect(categoryNav.getByRole('link', { name: /Venue & Destination/i })).toBeVisible()
  19 | 
  20 |     // Verify blog cards render
  21 |     const articles = page.locator('article')
  22 |     await expect(articles.first()).toBeVisible({ timeout: 10000 })
  23 |     const count = await articles.count()
  24 |     expect(count).toBeGreaterThanOrEqual(1)
  25 |   })
  26 | 
  27 |   test('navigates to category archive and filters articles', async ({ page }) => {
  28 |     await page.goto('/blog/decoration-ideas')
  29 | 
  30 |     // Verify category archive heading
  31 |     const heading = page.locator('h1')
  32 |     await expect(heading).toContainText(/Decoration Ideas/i)
  33 | 
  34 |     // Verify articles rendered
  35 |     const articles = page.locator('article')
> 36 |     await expect(articles.first()).toBeVisible({ timeout: 10000 })
     |                                    ^ Error: expect(locator).toBeVisible() failed
  37 |   })
  38 | })
  39 | 
```