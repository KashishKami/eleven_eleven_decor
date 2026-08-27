# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: team-section.spec.ts >> Curated Venues Section (W-207) >> renders venue teaser cards with links
- Location: tests\e2e\team-section.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#venues-teaser')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#venues-teaser')

```

```yaml
- banner:
  - link "11:11 Decor — Event Management & Décor Studio":
    - /url: /
    - img "11:11 Decor — Event Management & Décor Studio"
  - button "Open menu"
- main:
  - text: 11:11 Decor — Event Management & Décor Studio
  - heading "Y o u r W i s h O u r C r e a t i o n ." [level=1]
  - paragraph: 11:11 Decor designs and manages weddings, celebrations, and corporate events — from the first concept conversation to the last flower placed.
  - link "Plan Your Event":
    - /url: /contact/
  - link "Explore Events":
    - /url: /events/
  - text: ↓ ABOUT 11:11 DECOR
  - heading "C r e a t i n g E x p e r i e n c e s , N o t J u s t E v e n t s" [level=2]
  - 'heading "11:11 Decor is an event management and décor studio built around a simple idea: the details are the experience." [level=3]'
  - paragraph: We plan and design weddings, celebrations, and corporate events from the first conversation through to the final walkthrough on event day. Every event starts with listening — to what you're celebrating, who it's for, and how you want it to feel.
  - paragraph: From there, we shape a concept, translate it into décor and layout, and coordinate every moving part so the day runs the way it was designed to. We work closely with vendors, venues, and your own team to keep planning organized and stress-free, so the only thing you have to do on the day itself is be present in it.
  - img "11:11 Decor Event Curation"
  - text: 100% Integrated Planning & Décor
  - link "Discover 11:11 Decor →":
    - /url: /about-us/
  - img "11:11 Decor Luxury Engagement Styling"
  - img "11:11 Decor Celebration and Floral Styling"
  - text: ✨ Bespoke Artistry
  - img "Weddings"
  - img "Corporate Events"
  - img "Birthday Celebrations"
  - img "Engagements"
  - img "Private Events"
  - img "Destination Events"
  - text: EVENTS CATER
  - img "Weddings"
  - img "Corporate Events"
  - img "Birthday Celebrations"
  - img "Engagements"
  - img "Private Events"
  - img "Destination Events"
  - link "Weddings End-to-end wedding planning and décor — mandap, stage, venue styling, and coordination across every ceremony. Explore Event →":
    - /url: /events/wedding-events/
    - heading "Weddings" [level=3]
    - paragraph: End-to-end wedding planning and décor — mandap, stage, venue styling, and coordination across every ceremony.
    - text: Explore Event →
  - link "Corporate Events Product launches, conferences, and company celebrations planned and staged with a professional finish. Explore Event →":
    - /url: /events/corporate-events/
    - heading "Corporate Events" [level=3]
    - paragraph: Product launches, conferences, and company celebrations planned and staged with a professional finish.
    - text: Explore Event →
  - link "Birthday Celebrations Milestone birthdays and intimate parties, themed and decorated to match the celebration in mind. Explore Event →":
    - /url: /events/birthday-events/
    - heading "Birthday Celebrations" [level=3]
    - paragraph: Milestone birthdays and intimate parties, themed and decorated to match the celebration in mind.
    - text: Explore Event →
  - link "Engagements Ring ceremonies and engagement functions styled with décor that photographs as beautifully as it feels. Explore Event →":
    - /url: /events/engagement-events/
    - heading "Engagements" [level=3]
    - paragraph: Ring ceremonies and engagement functions styled with décor that photographs as beautifully as it feels.
    - text: Explore Event →
  - link "Private Events Anniversaries, family functions, and personal celebrations planned with the same attention as our largest events. Explore Event →":
    - /url: /events/private-events/
    - heading "Private Events" [level=3]
    - paragraph: Anniversaries, family functions, and personal celebrations planned with the same attention as our largest events.
    - text: Explore Event →
  - link "Destination Events Planning and décor coordination for events held away from home, with logistics handled end to end. Explore Event →":
    - /url: /events/destination-events/
    - heading "Destination Events" [level=3]
    - paragraph: Planning and décor coordination for events held away from home, with logistics handled end to end.
    - text: Explore Event →
  - text: OUR CAPABILITIES
  - heading "E v e n t P l a n n i n g , M a n a g e m e n t & D é c o r S e r v i c e s" [level=2]
  - paragraph: Choose a single specialized service, or combine multiple capabilities into a seamlessly coordinated master plan.
  - link "Event Management 01 Event Management Full logistics and on-the-ground coordination so every element runs on schedule. Learn More →":
    - /url: /services/event-management/
    - img "Event Management"
    - text: "01"
    - heading "Event Management" [level=3]
    - paragraph: Full logistics and on-the-ground coordination so every element runs on schedule.
    - text: Learn More →
  - link "Event Planning 02 Event Planning Concept development, vendor sourcing, and timeline planning from day one. Learn More →":
    - /url: /services/event-planning/
    - img "Event Planning"
    - text: "02"
    - heading "Event Planning" [level=3]
    - paragraph: Concept development, vendor sourcing, and timeline planning from day one.
    - text: Learn More →
  - link "Event Decoration 03 Event Decoration Full décor design and setup — florals, staging, lighting, and styling. Learn More →":
    - /url: /services/event-decoration/
    - img "Event Decoration"
    - text: "03"
    - heading "Event Decoration" [level=3]
    - paragraph: Full décor design and setup — florals, staging, lighting, and styling.
    - text: Learn More →
  - link "View All Services →":
    - /url: /services/
  - paragraph: THE 1111 DECOR STANDARD
  - heading "W h y D i s c e r n i n g C l i e n t s C h o o s e U s" [level=2]
  - paragraph: Six reasons our clients come back — and why their guests remember the night for years.
  - text: "01"
  - heading "CREATIVE CONCEPTS" [level=3]
  - paragraph: Every event starts with a concept built around your story, not a repeated template.
  - text: "02"
  - heading "PERSONALIZED DÉCOR" [level=3]
  - paragraph: Colour palettes, florals, and staging are chosen to match your event, venue, and guests.
  - text: "03"
  - heading "DETAILED PLANNING" [level=3]
  - paragraph: Timelines, vendors, and logistics are mapped early, so surprises stay outside the plan.
  - text: "04"
  - heading "PROFESSIONAL COORDINATION" [level=3]
  - paragraph: One point of contact manages vendors, venue, and schedule.
  - text: "05"
  - heading "SEAMLESS EXECUTION" [level=3]
  - paragraph: On event day, our team runs the plan on-site so you can be a guest at your own celebration.
  - text: "06"
  - heading "CLIENT-FOCUSED APPROACH" [level=3]
  - paragraph: "Every decision is checked against one question: does this serve the event you actually asked for."
  - text: ◇ OUR WORK PROCESS
  - heading "S T E P S T O P L A N A S U C C E S S F U L E V E N T" [level=2]
  - img "1111 Decor Work Process Showcase"
  - text: 1111 decor
  - img "Consultation"
  - text: "01"
  - heading "Consultation" [level=3]
  - paragraph: We start with a thorough conversation about your occasion, guest experience, venue preferences, and creative vision.
  - img "Concept & Planning"
  - text: "02"
  - heading "Concept & Planning" [level=3]
  - paragraph: We shape a cohesive concept, draft master timelines, and outline vendor logistics tailored precisely around your date.
  - img "Design & Coordination"
  - text: "03"
  - heading "Design & Coordination" [level=3]
  - paragraph: Décor palettes, staging, florals, and lighting are finalized alongside vendor and venue coordination to build one seamless plan.
  - img "Event Day Execution"
  - text: "04"
  - heading "Event Day Execution" [level=3]
  - paragraph: Our team manages on-site setup, timing, live guest flow, and breakdown so you can be fully present as a host and guest.
  - text: SERVICE TIERS
  - heading "P l a n n i n g B u i l t A r o u n d Y o u r E v e n t" [level=2]
  - paragraph: Every quote depends on event type, guest count, venue, décor scope, and production needs — the packages below are a starting point, not a fixed price.
  - heading "Essential" [level=3]
  - paragraph: Core décor & single-day coordination
  - text: Custom Quote
  - paragraph: Ideal for events with venues established, focused on core styling, stage design, and day-of vendor coordination.
  - list:
    - listitem: ✔ Core décor & styling
    - listitem: ✔ Single-day on-site coordination
    - listitem: ✔ Vendor and supplier liaison
    - listitem: ✔ Run-of-show timeline execution
  - link "Request a Custom Quote":
    - /url: /contact/
  - text: Most Requested
  - heading "Signature" [level=3]
  - paragraph: Full planning, complete décor & dedicated on-site team
  - text: Custom Quote
  - paragraph: Our comprehensive service covering complete concept planning, décor design across every ceremony, and dedicated management.
  - list:
    - listitem: ✔ Full event planning & management
    - listitem: ✔ Complete décor across all functions
    - listitem: ✔ Dedicated on-site management team
    - listitem: ✔ Master timeline & vendor contract coordination
  - link "Request a Custom Quote":
    - /url: /contact/
  - heading "Bespoke" [level=3]
  - paragraph: Custom concept development & multi-venue logistics
  - text: Custom Quote
  - paragraph: Tailored turnkey production for multi-venue celebrations, destination events, and custom stage fabrication.
  - list:
    - listitem: ✔ Custom concept development
    - listitem: ✔ Destination & multi-venue logistics
    - listitem: ✔ Production, lighting & entertainment coordination
    - listitem: ✔ Travel and logistics planning for destination events
  - link "Request a Custom Quote":
    - /url: /contact/
  - link "Compare All Packages & Tiers →":
    - /url: /packages/
  - text: CLIENT REVIEWS
  - heading "C l i e n t W o r d s & C e l e b r a t i o n s" [level=2]
  - paragraph: What hosts and couples say about working with 11:11 Decor.
  - text: ★★★★★
  - paragraph: “Working with 11:11 Decor turned our wedding into a living fairytale. The mandap design with cascading white orchids left every single guest speechless.”
  - heading "Aarav & Meera K." [level=4]
  - paragraph: Royal Wedding Celebration
  - paragraph: Dehradun Palace Resort
  - text: ★★★★★
  - paragraph: “Surgical precision in stage management, sound production, and VIP hospitality. 11:11 Decor is the gold standard for luxury corporate galas.”
  - heading "Vikram S." [level=4]
  - paragraph: Corporate Annual Gala
  - paragraph: JW Marriott Mussoorie
  - text: ★★★★★
  - paragraph: “From guest resort check-in helpdesks to the energetic Sangeet lighting grid, every detail was handled with extraordinary warmth and calm precision.”
  - heading "Priya & Rohan M." [level=4]
  - paragraph: Destination Sangeet & Reception
  - paragraph: Rishikesh Ganga Retreat
  - link "Read More Client Stories →":
    - /url: /testimonials/
  - text: COMMON QUESTIONS
  - heading "F r e q u e n t l y A s k e d Q u e s t i o n s" [level=2]
  - paragraph: Everything you need to know about our event planning, styling, and management process.
  - button "What types of events does 11:11 Decor manage? +" [expanded]
  - paragraph: We manage and decorate weddings, corporate galas, milestone birthdays, engagements, private dinners, and destination celebrations across Uttarakhand.
  - button "Do you provide complete event planning, or only decoration? +"
  - paragraph: We provide both. You can book us for end-to-end event planning and management, decoration services only, or a fully integrated package covering both.
  - button "Can we hire 11:11 Decor for decoration only? +"
  - paragraph: Yes. If your venue, catering, and timeline are already set, our styling team can focus entirely on stage design, floral architecture, lighting, and ambient tablescapes.
  - button "Can we customize our event package? +"
  - paragraph: Absolutely. Every event is unique. Our packages (Essential, Signature, Bespoke) serve as curated frameworks which we tailor to your specific venue, guest count, and creative vision.
  - button "How far in advance should we book? +"
  - paragraph: We recommend booking 4 to 8 months in advance for major weddings and corporate galas to secure premier dates, design custom fabrication sets, and reserve seasonal botanicals.
  - button "Do you manage corporate events as well as weddings? +"
  - paragraph: Yes. We regularly execute corporate annual galas, executive summits, product launches, and award ceremonies with surgical stagecraft and precise audio-visual coordination.
  - button "Do you work outside Dehradun / Uttarakhand? +"
  - paragraph: While our studio is based in Dehradun, we frequently produce destination weddings and corporate retreats across Mussoorie, Rishikesh, Haridwar, Jim Corbett, and beyond.
  - button "How do we request a quote? +"
  - paragraph: You can submit our quick inquiry form on the Contact page or message us directly on WhatsApp (+91 98765 43210) with your event date, estimated guest count, and preferred venue.
  - paragraph: Have a question specific to your celebration?
  - link "Speak With An Event Director →":
    - /url: /contact/
  - text: START THE CONVERSATION
  - heading "L e t ' s c r e a t e s o m e t h i n g u n f o r g e t t a b l e ." [level=2]
  - paragraph: Tell us about your event — date, guest count, venue, and vision. We'll follow up with availability and a custom quote.
  - link "Plan Your Event →":
    - /url: /contact/
  - link "WhatsApp Us ↗":
    - /url: https://wa.me/919876543210?text=Hello%2011:11%20Decor,%20I%20would%20like%20to%20inquire%20about%20event%20planning%20and%20decor%20services.
- contentinfo:
  - link "11:11 Decor":
    - /url: /
  - paragraph: An event management and décor studio. We plan and design weddings, celebrations, and corporate events from first concept to final detail.
  - link "+91 98765 43210":
    - /url: tel:+919876543210
  - link "hello@1111decor.com":
    - /url: mailto:hello@1111decor.com
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
  - text: Instagram Facebook Pinterest
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Curated Venues Section (W-207)', () => {
  4  |   test('renders venue teaser cards with links', async ({ page }) => {
  5  |     await page.goto('/')
  6  | 
  7  |     const section = page.locator('#venues-teaser')
> 8  |     await expect(section).toBeVisible()
     |                           ^ Error: expect(locator).toBeVisible() failed
  9  | 
  10 |     const exploreLink = section.getByRole('link', { name: /explore venues directory/i })
  11 |     await expect(exploreLink).toBeVisible()
  12 |   })
  13 | })
  14 | 
```