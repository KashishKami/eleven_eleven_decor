import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'
import type { PageVisibility } from '@/types/page-visibility'
import rawVisibility from './fixtures/data/page-visibility.json'

describe('Blog Visibility Unit Tests (W-1101)', () => {
  it('validates that page-visibility.json contains blog boolean field', () => {
    const visibility = rawVisibility as unknown as PageVisibility
    expect(visibility).toHaveProperty('blog')
    expect(typeof visibility.blog).toBe('boolean')
  })

  it('excludes /blog/ and all category/article routes from sitemap when blog is false', async () => {
    const visibility = rawVisibility as unknown as PageVisibility
    const sitemapEntries = await sitemap()
    const urls = sitemapEntries.map((e) => e.url)

    const hasBlog = urls.some((u) => u.includes('/blog'))
    if (!visibility.blog) {
      expect(hasBlog).toBe(false)
    } else {
      expect(hasBlog).toBe(true)
    }
  })
})
