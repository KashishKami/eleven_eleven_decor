import { describe, it, expect } from 'vitest'
import { GALLERY_ITEMS, type GalleryItem } from '../src/data/gallery'

describe('Gallery Data Layer & Schema (W-603 / W-1102)', () => {
  it('ensures static fallback array is empty by default to prevent dummy data leaks', () => {
    expect(Array.isArray(GALLERY_ITEMS)).toBe(true)
    expect(GALLERY_ITEMS.length).toBe(0)
  })

  it('validates GalleryItem contract shape', () => {
    const mockItem: GalleryItem = {
      id: 'gal-1',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      title: 'Royal Mandap Orchid Canopy',
      category: 'Weddings',
      aspectRatio: 'landscape',
    }

    expect(mockItem.id).toBeDefined()
    expect(mockItem.src).toContain('http')
    expect(mockItem.title.length).toBeGreaterThan(0)
    expect(mockItem.category).toBeDefined()
  })
})
