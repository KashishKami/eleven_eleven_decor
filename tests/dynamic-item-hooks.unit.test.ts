import { describe, it, expect } from 'vitest'
import { fetchPortfolioProject } from '@/hooks/usePortfolioProject'
import { fetchVenue } from '@/hooks/useVenue'
import { generatePortfolioSchema, generateVenueSchema } from '@/lib/schemaGenerators'

describe('Dynamic Item Hooks & Schema Generators (W-1202)', () => {
  it('fetchPortfolioProject fetches single project by slug from live API', async () => {
    const originalFetch = global.fetch
    global.fetch = async (url) => {
      if (typeof url === 'string' && url.includes('slug=udaipur-palace')) {
        return new Response(
          JSON.stringify({
            id: 'proj-1',
            slug: 'udaipur-palace',
            title: 'Royal Udaipur Palace Wedding',
            subtitle: 'Heritage Extravaganza',
            category: 'Weddings',
            location: 'Udaipur, Rajasthan',
            venue: 'City Palace',
            guestCount: 500,
            summary: 'A grand celebration with bespoke floral canopies.',
            heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
            galleryImages: [],
            planningDetails: ['Bespoke mandap design'],
            decorHighlights: ['Orchid chandeliers'],
            executionNotes: 'Executed flawlessly in 48 hours.',
            published: 1,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      }
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
    }

    try {
      const res = await fetchPortfolioProject('udaipur-palace')
      expect(res.project).toBeDefined()
      expect(res.project?.slug).toBe('udaipur-palace')
      expect(res.project?.title).toBe('Royal Udaipur Palace Wedding')
      expect(res.error).toBeNull()
    } finally {
      global.fetch = originalFetch
    }
  })

  it('fetchVenue fetches single venue by slug from live API', async () => {
    const originalFetch = global.fetch
    global.fetch = async (url) => {
      if (typeof url === 'string' && url.includes('slug=taj-lake-palace')) {
        return new Response(
          JSON.stringify({
            id: 'ven-1',
            slug: 'taj-lake-palace',
            name: 'Taj Lake Palace',
            tagline: 'Floating Luxury on Lake Pichola',
            spaceType: 'Palace Heritage & Lake Terraces',
            location: 'Udaipur, Rajasthan',
            capacity: 350,
            summary: 'A timeless marble masterpiece.',
            heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
            galleryImages: [],
            decorHighlights: ['Floating floral stages'],
            planningConsiderations: ['Boat transit logistics'],
            published: 1,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      }
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
    }

    try {
      const res = await fetchVenue('taj-lake-palace')
      expect(res.venue).toBeDefined()
      expect(res.venue?.slug).toBe('taj-lake-palace')
      expect(res.venue?.name).toBe('Taj Lake Palace')
      expect(res.error).toBeNull()
    } finally {
      global.fetch = originalFetch
    }
  })

  it('generatePortfolioSchema creates valid Schema.org CreativeWork JSON-LD', () => {
    const schema = generatePortfolioSchema({
      title: 'Royal Udaipur Palace Wedding',
      description: 'A grand celebration with bespoke floral canopies.',
      slug: 'udaipur-palace',
      heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      location: 'Udaipur, Rajasthan',
      category: 'Weddings',
    })

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('CreativeWork')
    expect(schema.name).toBe('Royal Udaipur Palace Wedding')
    expect(schema.description).toBe('A grand celebration with bespoke floral canopies.')
    expect(schema.image).toBe('https://images.unsplash.com/photo-1519741497674-611481863552')
    expect(schema.locationCreated).toBe('Udaipur, Rajasthan')
    expect(schema.provider).toHaveProperty('name', '11:11 Decor')
  })

  it('generateVenueSchema creates valid Schema.org EventVenue JSON-LD', () => {
    const schema = generateVenueSchema({
      name: 'Taj Lake Palace',
      description: 'A timeless marble masterpiece.',
      slug: 'taj-lake-palace',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      location: 'Udaipur, Rajasthan',
      capacity: 350,
      spaceType: 'Palace Heritage & Lake Terraces',
    })

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('EventVenue')
    expect(schema.name).toBe('Taj Lake Palace')
    expect(schema.description).toBe('A timeless marble masterpiece.')
    expect(schema.image).toBe('https://images.unsplash.com/photo-1566073771259-6a8506099945')
    expect(schema.address).toBe('Udaipur, Rajasthan')
    expect(schema.maximumAttendeeCapacity).toBe(350)
  })
})
