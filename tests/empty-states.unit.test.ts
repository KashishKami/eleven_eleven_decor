import { describe, it, expect } from 'vitest'
import { BLOG_DATA } from '@/data/blog'
import { PORTFOLIO_PROJECTS } from '@/data/portfolio'
import { VENUES_DATA, VENUES } from '@/data/venues'
import { GALLERY_ITEMS } from '@/data/gallery'
import { fetchBlogPosts } from '@/hooks/useBlogPosts'

describe('Empty Fallback & Data Layer Isolation (W-1102)', () => {
  it('ensures all static fallback data arrays are completely empty (no fake/dummy items)', () => {
    expect(BLOG_DATA).toEqual([])
    expect(PORTFOLIO_PROJECTS).toEqual([])
    expect(VENUES_DATA).toEqual([])
    expect(VENUES).toEqual([])
    expect(GALLERY_ITEMS).toEqual([])
  })

  it('ensures fetchBlogPosts returns an empty array and does not inject fake articles when API returns []', async () => {
    // Simulate fetch returning []
    const originalFetch = global.fetch
    global.fetch = async () =>
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })

    try {
      const res = await fetchBlogPosts()
      expect(res.posts).toEqual([])
      expect(res.error).toBeNull()
    } finally {
      global.fetch = originalFetch
    }
  })
})
