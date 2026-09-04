# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-section.spec.ts >> Blog Section (W-209) >> renders blog articles with read more links
- Location: tests\e2e\blog-section.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /read article/i }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /read article/i }).first()

```

```yaml
- banner:
  - navigation "Main navigation":
    - button "Services ▾"
    - button "Events ▾"
    - link "Portfolio":
      - /url: /portfolio/
    - link "Gallery":
      - /url: /gallery/
    - link "Venues":
      - /url: /venues/
    - link "Blog":
      - /url: /blog/
    - link "About Us":
      - /url: /about-us/
  - link "11:11 Decor — Event Management & Décor Studio":
    - /url: /
    - img "11:11 Decor — Event Management & Décor Studio"
  - link "Plan Your Event":
    - /url: /contact/
- main:
  - paragraph: EDITORIAL JOURNAL & GUIDES
  - heading "N e w s & I n s i g h t s" [level=1]
  - paragraph: Curated planning wisdom, backstage production insights, and couture styling trends from the 1111 Decor creative studio.
  - navigation "Blog categories":
    - button "All Articles"
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
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Blog Section (W-209)', () => {
  4  |   test('renders blog articles with read more links', async ({ page }) => {
  5  |     await page.goto('/blog/')
  6  | 
  7  |     const main = page.locator('main')
  8  |     await expect(main).toBeVisible()
  9  | 
  10 |     const readMoreLinks = page.getByRole('link', { name: /read article/i })
> 11 |     await expect(readMoreLinks.first()).toBeVisible()
     |                                         ^ Error: expect(locator).toBeVisible() failed
  12 |   })
  13 | })
  14 | 
```