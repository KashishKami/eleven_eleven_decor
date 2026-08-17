import { describe, it, expect } from 'vitest'
import { GALLERY_ITEMS } from '../src/data/gallery'

describe('Gallery Data Registry (W-603)', () => {
  it('contains category-tagged gallery images', () => {
    expect(GALLERY_ITEMS.length).toBeGreaterThanOrEqual(12)
  })

  it('ensures each image item has id, src, title, and valid category tag', () => {
    GALLERY_ITEMS.forEach((item) => {
      expect(item.id).toBeDefined()
      expect(item.src).toContain('http')
      expect(item.title.length).toBeGreaterThan(0)
      expect(item.category).toBeDefined()
    })
  })
})
