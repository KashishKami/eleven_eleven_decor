import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchBlogPosts } from '@/hooks/useBlogPosts'
import type { BlogPost } from '@/types/blog'

describe('useBlogPosts / fetchBlogPosts client fetcher', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('successfully fetches and returns all blog posts from /api/blogs.php', async () => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        slug: 'luxury-wedding-trends-2026',
        title: 'Top Luxury Wedding Decor Trends Shaping 2026',
        excerpt: 'From sculptural floral arches to ambient kinetic lighting...',
        category: 'wedding-planning',
        categoryName: 'Wedding Planning',
        date: 'August 10, 2026',
        author: '1111 Decor Team',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
        readTime: '5 min read',
      },
    ]

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    const result = await fetchBlogPosts()
    expect(global.fetch).toHaveBeenCalledWith('/api/blogs.php')
    expect(result.posts).toHaveLength(1)
    expect(result.posts[0]?.title).toBe('Top Luxury Wedding Decor Trends Shaping 2026')
    expect(result.error).toBeNull()
  })

  it('appends category query param when filtered by category slug', async () => {
    const mockPosts: BlogPost[] = [
      {
        id: '2',
        slug: 'corporate-banquet-styling',
        title: 'Designing Executive Corporate Galas That Inspire',
        excerpt: 'How spatial staging and high-end gastronomy elevate brand authority.',
        category: 'corporate-events',
        categoryName: 'Corporate Events',
        date: 'August 04, 2026',
        author: '1111 Decor Team',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
        readTime: '4 min read',
      },
    ]

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    const result = await fetchBlogPosts('corporate-events')
    expect(global.fetch).toHaveBeenCalledWith('/api/blogs.php?category=corporate-events')
    expect(result.posts).toHaveLength(1)
    expect(result.posts[0]?.category).toBe('corporate-events')
    expect(result.error).toBeNull()
  })

  it('handles network error gracefully and returns fallback message', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network request failed'))

    const result = await fetchBlogPosts()
    expect(result.posts).toEqual([])
    expect(result.error).toBe('Failed to load posts')
  })
})
