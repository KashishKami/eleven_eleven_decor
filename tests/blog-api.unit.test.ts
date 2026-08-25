import { describe, it, expect } from 'vitest'
import { BLOG_CATEGORIES, type BlogPost } from '@/types/blog'
import { BLOG_DATA } from '@/data/blog'

describe('Blog API Schema & Data Contracts (W-703)', () => {
  it('validates that all seed posts adhere to BlogPost schema requirements', () => {
    expect(BLOG_DATA.length).toBeGreaterThanOrEqual(5)

    for (const post of BLOG_DATA) {
      expect(post.id).toBeDefined()
      expect(typeof post.slug).toBe('string')
      expect(post.slug.length).toBeGreaterThan(0)
      expect(typeof post.title).toBe('string')
      expect(post.title.length).toBeGreaterThan(0)
      expect(typeof post.excerpt).toBe('string')
      expect(typeof post.content).toBe('string')
      expect(typeof post.category).toBe('string')
      expect(typeof post.date).toBe('string')
      expect(typeof post.author).toBe('string')
      expect(typeof post.image).toBe('string')
      expect(typeof post.readTime).toBe('string')
      expect(post.image).toMatch(/^https?:\/\//)
    }
  })

  it('validates that every seed post category matches a known category in BLOG_CATEGORIES', () => {
    const validSlugs = new Set(BLOG_CATEGORIES.map((c) => c.slug))

    for (const post of BLOG_DATA) {
      expect(validSlugs.has(post.category)).toBe(true)
    }
  })

  it('contains valid FAQs with question and answer if present', () => {
    for (const post of BLOG_DATA) {
      if (post.faqs) {
        expect(Array.isArray(post.faqs)).toBe(true)
        for (const faq of post.faqs) {
          expect(typeof faq.question).toBe('string')
          expect(typeof faq.answer).toBe('string')
          expect(faq.question.length).toBeGreaterThan(0)
          expect(faq.answer.length).toBeGreaterThan(0)
        }
      }
    }
  })

  it('serves live posts from data store via GET /api/blogs.php handler', async () => {
    const { GET } = await import('@/app/api/blogs.php/route')
    const req = new Request('http://localhost:3000/api/blogs.php')
    const res = await GET(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(Array.isArray(json)).toBe(true)
    expect(json.length).toBeGreaterThanOrEqual(1)
  })

  it('serves single post by slug via GET /api/blog-post.php handler', async () => {
    const { GET } = await import('@/app/api/blog-post.php/route')
    const req = new Request('http://localhost:3000/api/blog-post.php?slug=complete-wedding-decor-checklist')
    const res = await GET(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.slug).toBe('complete-wedding-decor-checklist')
    expect(json.title).toBeDefined()
  })
})
