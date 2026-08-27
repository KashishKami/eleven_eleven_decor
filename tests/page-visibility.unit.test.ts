import { describe, it, expect } from 'vitest'
import pageVisibility from '../php-admin/data/page-visibility.json'

describe('Page Visibility Data Layer (W-1001)', () => {
  it('contains exactly 4 keys: blog, gallery, portfolio, venues', () => {
    expect(pageVisibility).toBeDefined()
    const keys = Object.keys(pageVisibility).sort()
    expect(keys).toEqual(['blog', 'gallery', 'portfolio', 'venues'])
  })

  it('ensures each visibility flag is a boolean', () => {
    expect(typeof pageVisibility.gallery).toBe('boolean')
    expect(typeof pageVisibility.portfolio).toBe('boolean')
    expect(typeof pageVisibility.venues).toBe('boolean')
  })

  it('ensures all flags default to false (safe hidden state)', () => {
    expect(pageVisibility.gallery).toBe(false)
    expect(pageVisibility.portfolio).toBe(false)
    expect(pageVisibility.venues).toBe(false)
  })
})
