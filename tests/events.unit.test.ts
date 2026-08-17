import { describe, it, expect } from 'vitest'
import { EVENT_CATEGORIES, EVENTS_PAGE_FAQS } from '../src/data/events'

describe('Events Data Unit Suite (W-401, W-402, W-403)', () => {
  it('contains exactly 6 event categories', () => {
    expect(EVENT_CATEGORIES).toHaveLength(6)
  })

  it('exports valid static slugs for prerendering', () => {
    const slugs = EVENT_CATEGORIES.map((cat) => cat.slug)
    expect(slugs).toEqual([
      'wedding-events',
      'corporate-events',
      'birthday-events',
      'engagement-events',
      'private-events',
      'destination-events',
    ])
  })

  it('ensures each category has mandatory content blocks and non-empty FAQs', () => {
    EVENT_CATEGORIES.forEach((cat) => {
      expect(cat.title).toBeTruthy()
      expect(cat.subtitle).toBeTruthy()
      expect(cat.description).toBeTruthy()
      expect(cat.heroImage).toMatch(/^https:\/\//)
      expect(cat.planningServices.length).toBeGreaterThan(0)
      expect(cat.decorationOptions.length).toBeGreaterThan(0)
      expect(cat.eventManagement.length).toBeGreaterThan(0)
      expect(cat.faqs.length).toBeGreaterThan(0)
      expect(cat.metaTitle).toContain('11:11 Decor')
    })
  })

  it('contains valid hub FAQs', () => {
    expect(EVENTS_PAGE_FAQS.length).toBeGreaterThan(0)
    EVENTS_PAGE_FAQS.forEach((faq) => {
      expect(faq.question).toBeTruthy()
      expect(faq.answer).toBeTruthy()
    })
  })
})
