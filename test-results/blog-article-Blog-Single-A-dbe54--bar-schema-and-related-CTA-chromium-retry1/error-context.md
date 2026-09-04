# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-article.spec.ts >> Blog Single Article Detail Page (W-702) >> renders article detail with H1, author, reading progress bar, schema, and related CTA
- Location: tests\e2e\blog-article.spec.ts:4:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected pattern: /The Complete Wedding Decor Checklist/i
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')

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
  - paragraph: Loading article...
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
  3  | test.describe('Blog Single Article Detail Page (W-702)', () => {
  4  |   test('renders article detail with H1, author, reading progress bar, schema, and related CTA', async ({ page }) => {
  5  |     await page.goto('/blog/wedding-planning/complete-wedding-decor-checklist')
  6  | 
  7  |     // Verify H1
  8  |     const heading = page.locator('h1')
> 9  |     await expect(heading).toContainText(/The Complete Wedding Decor Checklist/i)
     |                           ^ Error: expect(locator).toContainText(expected) failed
  10 | 
  11 |     // Verify author and date metadata
  12 |     const metaContainer = page.locator('text=By 1111 Decor Design Studio')
  13 |     await expect(metaContainer).toBeVisible()
  14 | 
  15 |     // Verify main article body content
  16 |     const mainContent = page.locator('main')
  17 |     await expect(mainContent).toContainText(/The Foundation of Luxury Wedding Decor/i)
  18 | 
  19 |     // Verify related service CTA link
  20 |     const serviceCta = page.getByRole('link', { name: /Explore Service/i })
  21 |     await expect(serviceCta).toBeVisible()
  22 |     await expect(serviceCta).toHaveAttribute('href', '/services/wedding-decoration/')
  23 | 
  24 |     // Verify client-side Article JSON-LD schema is injected into document
  25 |     const schemaScript = page.locator('script#article-jsonld')
  26 |     await expect(schemaScript).toBeAttached()
  27 |     const schemaText = await schemaScript.textContent()
  28 |     expect(schemaText).toContain('"@type":"Article"')
  29 |     expect(schemaText).toContain('The Complete Wedding Decor Checklist')
  30 |   })
  31 | })
  32 | 
```