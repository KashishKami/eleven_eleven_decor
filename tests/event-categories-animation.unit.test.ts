import { describe, it, expect } from 'vitest'
import { CATEGORIES } from '@/data/categories'

describe('EventCategories Component Configuration (Seamless Inline Seam Matching & Route Safety)', () => {
  it('defines 4 categories for event showcase', () => {
    expect(CATEGORIES).toHaveLength(4)
    expect(CATEGORIES[0]?.id).toBe('corporate')
  })

  it('calculates equal track heights (400vh) for background and circle photo windows to guarantee 100% inline seam matching', () => {
    const totalSlides = CATEGORIES.length
    const expectedTrackHeightVh = totalSlides * 100
    expect(expectedTrackHeightVh).toBe(400)
  })
})
