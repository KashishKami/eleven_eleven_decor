import { describe, it, expect } from 'vitest'
import { VENUES, type VenueItem } from '../src/data/venues'

describe('Venues Data Layer & Schema (W-602 / W-1102)', () => {
  it('ensures static fallback array is empty by default to prevent dummy data leaks', () => {
    expect(Array.isArray(VENUES)).toBe(true)
    expect(VENUES.length).toBe(0)
  })

  it('validates VenueItem contract shape', () => {
    const mockVenue: VenueItem = {
      slug: 'grand-heritage-palace',
      name: 'Grand Heritage Palace',
      tagline: 'Palatial Architecture & Courtyard',
      spaceType: 'Hybrid (Indoor & Outdoor)',
      location: 'Dehradun',
      capacity: 600,
      summary: 'Sprawling palace grounds for luxury weddings.',
      heroImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b',
      galleryImages: ['https://images.unsplash.com/photo-1544078751-58fee2d8a03b'],
      decorHighlights: ['Courtyard fairy lights'],
      planningConsiderations: ['Power generator setup'],
      metaTitle: 'Grand Heritage Palace | 1111 Decor',
      metaDescription: 'Luxury venue staging by 1111 Decor.',
    }

    expect(mockVenue.slug).toBeDefined()
    expect(mockVenue.name.length).toBeGreaterThan(0)
    expect(mockVenue.capacity).toBeGreaterThan(0)
  })
})
