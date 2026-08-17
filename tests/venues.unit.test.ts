import { describe, it, expect } from 'vitest'
import { VENUES } from '../src/data/venues'

describe('Venues Data Registry (W-602)', () => {
  it('contains venue locations', () => {
    expect(VENUES.length).toBeGreaterThanOrEqual(4)
  })

  it('ensures each venue has valid slug, name, spaceType, capacity, and decor highlights', () => {
    VENUES.forEach((venue) => {
      expect(venue.slug).toBeDefined()
      expect(venue.name.length).toBeGreaterThan(0)
      expect(venue.spaceType).toBeDefined()
      expect(venue.capacity).toBeGreaterThan(0)
      expect(venue.heroImage).toContain('http')
      expect(venue.decorHighlights.length).toBeGreaterThan(0)
    })
  })
})
