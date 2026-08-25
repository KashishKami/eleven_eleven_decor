import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'

describe('Dynamic Sitemap & Robots Generation (W-902)', () => {
  it('generates a comprehensive sitemap containing core hubs and dynamic routes', () => {
    const sitemapEntries = sitemap()

    expect(sitemapEntries).toBeInstanceOf(Array)
    expect(sitemapEntries.length).toBeGreaterThanOrEqual(30)

    const urls = sitemapEntries.map((e) => e.url)

    // Check core hubs
    expect(urls).toContain('https://elevenelevendecor.com/')
    expect(urls).toContain('https://elevenelevendecor.com/about-us/')
    expect(urls).toContain('https://elevenelevendecor.com/services/')
    expect(urls).toContain('https://elevenelevendecor.com/events/')
    expect(urls).toContain('https://elevenelevendecor.com/portfolio/')
    expect(urls).toContain('https://elevenelevendecor.com/venues/')
    expect(urls).toContain('https://elevenelevendecor.com/packages/')
    expect(urls).toContain('https://elevenelevendecor.com/testimonials/')
    expect(urls).toContain('https://elevenelevendecor.com/gallery/')
    expect(urls).toContain('https://elevenelevendecor.com/blog/')
    expect(urls).toContain('https://elevenelevendecor.com/contact/')

    // Check dynamic routes
    expect(urls.some((u) => u.includes('/services/wedding-decoration/'))).toBe(true)
    expect(urls.some((u) => u.includes('/events/wedding-events/'))).toBe(true)
    expect(urls.some((u) => u.includes('/venues/taj-rishikesh-resort-spa/'))).toBe(true)
    expect(urls.some((u) => u.includes('/portfolio/royal-palace-wedding-dehradun/'))).toBe(true)
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

    expect(robotsConfig.sitemap).toContain('/sitemap.xml')
    expect(robotsConfig.rules).toBeDefined()

    const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules
    expect(rules?.allow).toBe('/')
    expect(rules?.disallow).toContain('/api/')
    expect(rules?.disallow).toContain('/manage-7f3b9x2k/')
  })
})
