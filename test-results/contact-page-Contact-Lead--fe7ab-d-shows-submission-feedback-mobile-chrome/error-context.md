# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-page.spec.ts >> Contact & Lead Conversion Page (W-801) >> validates required fields and shows submission feedback
- Location: tests\e2e\contact-page.spec.ts:53:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="contact-success-toast"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-testid="contact-success-toast"]')

```

```yaml
- banner:
  - link "11:11 Decor — Event Management & Décor Studio":
    - /url: /
    - img "11:11 Decor — Event Management & Décor Studio"
  - button "Open menu"
- main:
  - text: GET IN TOUCH & RESERVATIONS
  - heading "L e t ' s P l a n Y o u r E v e n t" [level=1]
  - paragraph: Tell us about your event and we will follow up with availability and a custom quote.
  - text: Direct Contacts
  - heading "Connect With Our Design Studio" [level=2]
  - paragraph: We welcome in-person appointments at our studio or virtual consultations for destination weddings and regional celebrations.
  - text: 📍
  - heading "Our Studio & Headquarters" [level=3]
  - paragraph: 1000, Doon Express Business Park Rd, Subhash Nagar, Dehradun, Sewla Khurd, Uttarakhand 248001
  - text: 📞
  - heading "Phone & WhatsApp Inquiries" [level=3]
  - 'link "Call: +91 74668 54475"':
    - /url: tel:+917466854475
  - text: •
  - link "Chat on WhatsApp ↗":
    - /url: https://wa.me/917466854475?text=Hello%2011:11%20Decor,%20I%20would%20like%20to%20inquire%20about%20event%20planning%20and%20decor%20services.
  - text: ✉️
  - heading "Official Email" [level=3]
  - link "hello1111decor@gmail.com":
    - /url: mailto:hello1111decor@gmail.com
  - text: 🕒
  - heading "Consultation Hours" [level=3]
  - paragraph: Mon – Sat, 10:00 AM – 7:00 PM IST
  - text: Direct Reservation Inquiry
  - heading "Share Your Celebration Details" [level=3]
  - text: Full Name *
  - textbox "Full Name *":
    - /placeholder: e.g. Victoria Sterling
  - text: Phone Number *
  - textbox "Phone Number *":
    - /placeholder: +91 74668 54475
  - text: Email Address *
  - textbox "Email Address *":
    - /placeholder: victoria@example.com
  - text: Event Type *
  - combobox "Event Type *":
    - option "Select Celebration Type..." [disabled] [selected]
    - option "Wedding"
    - option "Corporate"
    - option "Birthday"
    - option "Engagement"
    - option "Theme Party"
    - option "Private Dinner"
    - option "Other"
  - text: Event Date *
  - textbox "Event Date *"
  - text: Estimated Guest Count *
  - spinbutton "Estimated Guest Count *"
  - text: Budget Range (Optional)
  - textbox "Budget Range (Optional)":
    - /placeholder: e.g. ₹5,00,000 – ₹10,00,000 / Flexible
  - text: Tell Us About Your Vision *
  - textbox "Tell Us About Your Vision *":
    - /placeholder: Please describe venue location, decor aesthetic, floral themes, production needs, or any specific inspirations...
  - button "Send Message / Plan Your Event"
  - iframe
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
      - link "Portfolio":
        - /url: /portfolio/
    - listitem:
      - link "Gallery":
        - /url: /gallery/
    - listitem:
      - link "Packages":
        - /url: /packages/
    - listitem:
      - link "Venues":
        - /url: /venues/
    - listitem:
      - link "Blog":
        - /url: /blog/
    - listitem:
      - link "Contact Us":
        - /url: /contact/
  - paragraph: © 2026 11:11 Decor (Eleven Eleven Decor). All rights reserved.
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import fs from 'fs'
  3  | import path from 'path'
  4  | 
  5  | const testInquiriesPath = path.resolve(__dirname, '../fixtures/data/inquiries_test.json')
  6  | 
  7  | test.describe('Contact & Lead Conversion Page (W-801)', () => {
  8  |   test.beforeEach(async ({ page }) => {
  9  |     // Forward X-Test-Mode header to the PHP backend
  10 |     await page.route('**/api/contact.php', async (route) => {
  11 |       const headers = { ...route.request().headers(), 'X-Test-Mode': '1' }
  12 |       await route.continue({ headers })
  13 |     })
  14 |   })
  15 | 
  16 |   test.afterAll(() => {
  17 |     if (fs.existsSync(testInquiriesPath)) {
  18 |       try {
  19 |         fs.unlinkSync(testInquiriesPath)
  20 |       } catch {}
  21 |     }
  22 |   })
  23 |   test('renders H1, 8 form fields, contact info block, and map embed', async ({ page }) => {
  24 |     await page.goto('/contact/')
  25 | 
  26 |     // 1. Assert H1 heading matching Section 14 spec
  27 |     const mainHeading = page.getByRole('heading', { level: 1 })
  28 |     await expect(mainHeading).toBeVisible()
  29 |     await expect(mainHeading).toContainText("Let's Plan Your Event")
  30 | 
  31 |     // 2. Assert all 8 form inputs are rendered
  32 |     await expect(page.locator('input[name="name"]')).toBeVisible()
  33 |     await expect(page.locator('input[name="phone"]')).toBeVisible()
  34 |     await expect(page.locator('input[name="email"]')).toBeVisible()
  35 |     await expect(page.locator('select[name="eventType"]')).toBeVisible()
  36 |     await expect(page.locator('input[name="eventDate"]')).toBeVisible()
  37 |     await expect(page.locator('input[name="guestCount"]')).toBeVisible()
  38 |     await expect(page.locator('input[name="budget"]')).toBeVisible()
  39 |     await expect(page.locator('textarea[name="message"]')).toBeVisible()
  40 | 
  41 |     // 3. Assert contact details are present
  42 |     await expect(page.getByText('Doon Express Business Park Rd', { exact: false }).first()).toBeVisible()
  43 |     await expect(page.getByText('Dehradun', { exact: false }).first()).toBeVisible()
  44 |     await expect(page.locator('a[href^="tel:"]').first()).toBeVisible()
  45 |     await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible()
  46 |     await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible()
  47 |     await expect(page.getByText('10:00 AM', { exact: false }).first()).toBeVisible()
  48 | 
  49 |     // 4. Assert map container is visible
  50 |     await expect(page.locator('[data-testid="contact-map-container"]')).toBeVisible()
  51 |   })
  52 | 
  53 |   test('validates required fields and shows submission feedback', async ({ page }) => {
  54 |     await page.goto('/contact/')
  55 | 
  56 |     // Fill the 8 form fields
  57 |     await page.locator('input[name="name"]').fill('Ananya Sen')
  58 |     await page.locator('input[name="phone"]').fill('+91 98765 43210')
  59 |     await page.locator('input[name="email"]').fill('ananya@example.com')
  60 |     await page.locator('select[name="eventType"]').selectOption('Wedding')
  61 |     await page.locator('input[name="eventDate"]').fill('2026-11-25')
  62 |     await page.locator('input[name="guestCount"]').fill('350')
  63 |     await page.locator('input[name="budget"]').fill('₹10,00,000+')
  64 |     await page.locator('textarea[name="message"]').fill('Looking for mandap and entrance flower styling.')
  65 | 
  66 |     // Submit form
  67 |     const submitBtn = page.getByRole('button', { name: /send message|submit inquiry|plan your event/i })
  68 |     await expect(submitBtn).toBeVisible()
  69 |     await submitBtn.click()
  70 | 
  71 |     // Assert success feedback toast / banner appears
> 72 |     await expect(page.locator('[data-testid="contact-success-toast"]')).toBeVisible({ timeout: 5000 })
     |                                                                         ^ Error: expect(locator).toBeVisible() failed
  73 |     await expect(page.locator('[data-testid="contact-success-toast"]')).toContainText(/thank you|received|touch shortly/i)
  74 |   })
  75 | })
  76 | 
```