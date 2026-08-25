import { describe, it, expect } from 'vitest'
import { buildImageAlt, sanitizeFilename } from '@/admin-editor/lib/imageHelpers'

describe('W-753: Image Block & Auto-Alt Helper', () => {
  it('builds SEO alt text with focus keyword and sanitized filename', () => {
    const alt = buildImageAlt('wedding decoration', 'venue-photo.jpg')
    expect(alt).toBe('wedding decoration - venue photo')
  })

  it('builds clean alt text without keyword prefix when focus keyword is empty', () => {
    const alt = buildImageAlt('', 'my-photo.jpg')
    expect(alt).toBe('my photo')
  })

  it('sanitizes messy filenames into lowercase hyphenated safe strings', () => {
    const clean = sanitizeFilename('My Wedding Photo 2026!.jpg')
    expect(clean).toBe('my-wedding-photo-2026.jpg')
  })

  it('normalizes missing protocol and converts Unsplash photo page links to direct CDN image URLs', async () => {
    const { normalizeImageUrl } = await import('@/admin-editor/lib/imageHelpers')
    const converted = normalizeImageUrl('https://unsplash.com/photos/powerboats-circling-catamaran-on-exe-estuary--4jMa0nNpr0')
    expect(converted).toContain('images.unsplash.com/photo-4jMa0nNpr0')

    const shortUnsplash = normalizeImageUrl('unsplash.com/photos/4jMa0nNpr0')
    expect(shortUnsplash).toContain('images.unsplash.com/photo-4jMa0nNpr0')

    const regular = normalizeImageUrl('images.unsplash.com/photo-123456?auto=format')
    expect(regular).toBe('https://images.unsplash.com/photo-123456?auto=format')
  })
})
