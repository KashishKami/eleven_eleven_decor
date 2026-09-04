import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import pageVisibility from './fixtures/data/page-visibility.json'

describe('Dynamic Sitemap & Robots Generation with Visibility Gate (W-902 / W-1003)', () => {
  it('excludes hidden sections (gallery, portfolio, venues, blog) from sitemap when visibility is false', () => {
    const sitemapEntries = sitemap()
    const urls = sitemapEntries.map((e) => e.url)

    // Hidden sections MUST NOT be present when their flag is false
    if (!pageVisibility.gallery) {
      expect(urls).not.toContain('https://1111decor.com/gallery/')
    }
    if (!pageVisibility.portfolio) {
      expect(urls).not.toContain('https://1111decor.com/portfolio/')
      expect(urls.some((u) => u.includes('/portfolio/'))).toBe(false)
    }
    if (!pageVisibility.venues) {
      expect(urls).not.toContain('https://1111decor.com/venues/')
      expect(urls.some((u) => u.includes('/venues/'))).toBe(false)
    }
    if (!pageVisibility.blog) {
      expect(urls).not.toContain('https://1111decor.com/blog/')
      expect(urls.some((u) => u.includes('/blog/'))).toBe(false)
    }

    // Core hubs MUST remain present
    expect(urls).toContain('https://1111decor.com/')
    expect(urls).toContain('https://1111decor.com/about-us/')
    expect(urls).toContain('https://1111decor.com/services/')
    expect(urls).toContain('https://1111decor.com/events/')
    expect(urls).toContain('https://1111decor.com/packages/')
    expect(urls).toContain('https://1111decor.com/testimonials/')
    expect(urls).toContain('https://1111decor.com/contact/')

    // Core dynamic services & events MUST remain present
    expect(urls.some((u) => u.includes('/services/wedding-decoration/'))).toBe(true)
    expect(urls.some((u) => u.includes('/services/birthday-decoration/'))).toBe(true)
    expect(urls.some((u) => u.includes('/events/wedding-events/'))).toBe(true)
  })

  it('guarantees every sitemap URL ends with a trailing slash', () => {
    const sitemapEntries = sitemap()
    sitemapEntries.forEach((entry) => {
      expect(entry.url.endsWith('/')).toBe(true)
      expect(entry.lastModified).toBeDefined()
      expect(entry.changeFrequency).toBeDefined()
      expect(entry.priority).toBeGreaterThan(0)
    })
  })

  it('generates robots.txt referencing the dynamic sitemap XML and protecting admin/API routes', () => {
    const robotsConfig = robots()

    expect(robotsConfig.sitemap).toContain('sitemap-index.php')
    expect(robotsConfig.rules).toBeDefined()

    const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules
    expect(rules?.allow).toBe('/')
    expect(rules?.disallow).toContain('/api/')
    expect(rules?.disallow).toContain('/manage-7f3b9x2k/')
  })
})
