import { describe, it, expect } from 'vitest'
import { PORTFOLIO_PROJECTS, type PortfolioProject } from '../src/data/portfolio'

describe('Portfolio Data Layer & Schema (W-601 / W-1102)', () => {
  it('ensures static fallback array is empty by default to prevent dummy data leaks', () => {
    expect(Array.isArray(PORTFOLIO_PROJECTS)).toBe(true)
    expect(PORTFOLIO_PROJECTS.length).toBe(0)
  })

  it('validates PortfolioProject contract shape', () => {
    const mockProject: PortfolioProject = {
      slug: 'himalayan-resort-wedding',
      title: 'Himalayan Resort Wedding',
      subtitle: 'Luxury Mountain Staging',
      category: 'Weddings',
      location: 'Mussoorie',
      venue: 'JW Marriott',
      guestCount: 350,
      summary: 'Grand floral mandap styling.',
      heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      galleryImages: ['https://images.unsplash.com/photo-1519741497674-611481863552'],
      planningDetails: ['Custom lighting design'],
      decorHighlights: ['Floral arch canopy'],
      executionNotes: 'Full-day production timeline',
      metaTitle: 'Himalayan Resort Wedding | 1111 Decor',
      metaDescription: 'Luxury mountain wedding decor by 1111 Decor.',
    }

    expect(mockProject.slug).toBeDefined()
    expect(mockProject.title.length).toBeGreaterThan(0)
    expect(mockProject.heroImage).toContain('http')
  })
})
