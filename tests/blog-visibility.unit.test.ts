import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'
import type { PageVisibility } from '@/types/page-visibility'
import rawVisibility from '../php-admin/data/page-visibility.json'

describe('Blog Visibility Unit Tests (W-1101)', () => {
  it('validates that page-visibility.json contains blog boolean field defaulting to false', () => {
    const visibility = rawVisibility as unknown as PageVisibility
    expect(visibility).toHaveProperty('blog')
    expect(typeof visibility.blog).toBe('boolean')
    expect(visibility.blog).toBe(false)
  })

  it('excludes /blog/ and all category/article routes from sitemap when blog is false', async () => {
    const sitemapEntries = await sitemap()
    const urls = sitemapEntries.map((e) => e.url)

    const hasBlog = urls.some((u) => u.includes('/blog'))
    expect(hasBlog).toBe(false)
  })
})
