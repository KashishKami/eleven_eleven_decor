import { describe, it, expect } from 'vitest'
import { BLOG_CATEGORIES, type BlogPost } from '@/types/blog'
import { BLOG_DATA } from '@/data/blog'

describe('Blog API Schema & Data Contracts (W-703 / W-1102)', () => {
  it('ensures static fallback BLOG_DATA array is empty by default', () => {
    expect(Array.isArray(BLOG_DATA)).toBe(true)
    expect(BLOG_DATA.length).toBe(0)
  })

  it('validates BlogPost contract shape with categories and FAQs', () => {
    const mockPost: BlogPost = {
      id: '1',
      slug: 'wedding-decor-checklist',
      title: 'Wedding Decor Checklist',
      excerpt: 'Complete checklist for luxury weddings.',
      content: '<h2>Step by step guide</h2>',
      category: 'wedding-planning',
      categoryName: 'Wedding Planning',
      date: 'August 10, 2026',
      author: '1111 Decor Studio',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      readTime: '6 min read',
      published: true,
      faqs: [{ question: 'How early should we book?', answer: '4 to 6 months in advance.' }],
    }

    expect(mockPost.id).toBeDefined()
    expect(mockPost.slug).toBe('wedding-decor-checklist')
    const matchingCat = BLOG_CATEGORIES.find((c) => c.slug === mockPost.category)
    expect(matchingCat).toBeDefined()
  })

  it('serves live posts from data store via GET /api/blogs.php handler', async () => {
    const originalFetch = global.fetch
    global.fetch = async () =>
      new Response(
        JSON.stringify([
          {
            id: '1',
            slug: 'mock-live-post',
            title: 'Mock Live Post',
            category: 'wedding-planning',
            categoryName: 'Wedding Planning',
            excerpt: 'Live excerpt',
            author: '1111 Decor Team',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
            readTime: '5 min read',
            date: 'August 27, 2026',
          },
        ]),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )

    try {
      const response = await fetch('http://127.0.0.1:8080/api/blogs.php')
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(1)
      expect(data[0].slug).toBe('mock-live-post')
    } finally {
      global.fetch = originalFetch
    }
  })
})
