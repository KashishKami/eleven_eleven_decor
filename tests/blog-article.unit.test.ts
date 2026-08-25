import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchBlogPost } from '@/hooks/useBlogPost'
import type { BlogPost } from '@/types/blog'

describe('useBlogPost / fetchBlogPost single article fetcher', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('successfully fetches and returns a single blog post by slug from /api/blog-post.php', async () => {
    const mockPost: BlogPost = {
      id: '1',
      slug: 'complete-wedding-decor-checklist',
      title: 'The Complete Wedding Decor Checklist',
      excerpt: 'Step-by-step styling framework...',
      content: '<p>Article content goes here</p>',
      category: 'wedding-planning',
      categoryName: 'Wedding Planning',
      date: 'August 10, 2026',
      author: '1111 Decor Design Studio',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      readTime: '6 min read',
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPost,
    } as Response)

    const result = await fetchBlogPost('complete-wedding-decor-checklist')
    expect(global.fetch).toHaveBeenCalledWith('/api/blog-post.php?slug=complete-wedding-decor-checklist')
    expect(result.post?.title).toBe('The Complete Wedding Decor Checklist')
    expect(result.post?.content).toBe('<p>Article content goes here</p>')
    expect(result.error).toBeNull()
  })

  it('handles 404 / post not found properly', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Post not found' }),
    } as Response)

    const result = await fetchBlogPost('non-existent-slug')
    expect(result.post).toBeNull()
    expect(result.error).toBe('Post not found')
  })

  it('handles network failure properly', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Connection failed'))

    const result = await fetchBlogPost('complete-wedding-decor-checklist')
    expect(result.post).toBeNull()
    expect(result.error).toBe('Failed to load post')
  })
})
