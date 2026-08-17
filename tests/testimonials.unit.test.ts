import { describe, it, expect } from 'vitest'
import { TESTIMONIALS } from '../src/data/testimonials'

describe('Testimonials Data Registry (W-503)', () => {
  it('contains client testimonials', () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(4)
  })

  it('ensures each testimonial has valid client details, quote, star rating, and event category', () => {
    TESTIMONIALS.forEach((item) => {
      expect(item.id).toBeDefined()
      expect(item.clientName.length).toBeGreaterThan(0)
      expect(item.quote.length).toBeGreaterThan(0)
      expect(item.rating).toBeGreaterThanOrEqual(4)
      expect(item.eventType.length).toBeGreaterThan(0)
      expect(item.location.length).toBeGreaterThan(0)
    })
  })
})
