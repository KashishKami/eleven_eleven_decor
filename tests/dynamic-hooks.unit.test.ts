import { describe, it, expect } from 'vitest'
import { fetchPortfolioProjects } from '@/hooks/usePortfolioProjects'
import { fetchVenues } from '@/hooks/useVenues'
import { fetchGalleryItems } from '@/hooks/useGallery'

describe('Dynamic Client Hooks & API Connectors (W-1106)', () => {
  it('fetches live portfolio projects via fetchPortfolioProjects', async () => {
    const originalFetch = global.fetch
    global.fetch = async () =>
      new Response(
        JSON.stringify([
          {
            id: '1',
            slug: 'royal-wedding',
            title: 'Royal Wedding',
            subtitle: 'Palace Staging',
            category: 'Weddings',
            location: 'Mussoorie',
            venue: 'JW Marriott',
            guestCount: 400,
            summary: 'Floral mandap',
            heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
            galleryImages: [],
            planningDetails: [],
            decorHighlights: [],
            executionNotes: '',
            published: 1,
          },
        ]),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )

    try {
      const res = await fetchPortfolioProjects()
      expect(res.projects.length).toBe(1)
      expect(res.projects[0]!.slug).toBe('royal-wedding')
      expect(res.error).toBeNull()
    } finally {
      global.fetch = originalFetch
    }
  })

  it('fetches live venues via fetchVenues', async () => {
    const originalFetch = global.fetch
    global.fetch = async () =>
      new Response(
        JSON.stringify([
          {
            id: '1',
            slug: 'jw-marriott-mussoorie',
            name: 'JW Marriott Mussoorie',
            tagline: 'Himalayan Luxury',
            spaceType: 'Hybrid (Indoor & Outdoor)',
            location: 'Mussoorie',
            capacity: 500,
            summary: 'Panoramic views',
            heroImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b',
            galleryImages: [],
            decorHighlights: [],
            planningConsiderations: [],
            published: 1,
          },
        ]),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )

    try {
      const res = await fetchVenues()
      expect(res.venues.length).toBe(1)
      expect(res.venues[0]!.name).toBe('JW Marriott Mussoorie')
      expect(res.error).toBeNull()
    } finally {
      global.fetch = originalFetch
    }
  })

  it('fetches live gallery items via fetchGalleryItems', async () => {
    const originalFetch = global.fetch
    global.fetch = async () =>
      new Response(
        JSON.stringify([
          {
            id: 'gal-1',
            src: 'https://images.unsplash.com/photo-1519741497674-611481863552',
            title: 'Royal Mandap Orchid Canopy',
            category: 'Weddings',
            aspectRatio: 'landscape',
            published: 1,
          },
        ]),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )

    try {
      const res = await fetchGalleryItems()
      expect(res.items.length).toBe(1)
      expect(res.items[0]!.id).toBe('gal-1')
      expect(res.error).toBeNull()
    } finally {
      global.fetch = originalFetch
    }
  })
})
