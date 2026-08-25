import { describe, it, expect } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

describe('Static Export & robots.txt / sitemap.ts Hardening (W-704)', () => {
  it('generates robots.txt rules that explicitly disallow PHP API and secret admin paths', () => {
    const robotRules = robots()
    expect(robotRules.rules).toBeDefined()

    const rules = Array.isArray(robotRules.rules) ? robotRules.rules[0] : robotRules.rules
    expect(rules).toBeDefined()
    expect(rules?.userAgent).toBe('*')

    const disallows = Array.isArray(rules?.disallow) ? rules?.disallow : [rules?.disallow]
    expect(disallows).toContain('/api/')
    expect(disallows).toContain('/manage-7f3b9x2k/')
    expect(robotRules.sitemap).toMatch(/\/sitemap\.xml$/)
  })

  it('generates XML sitemap URLs with trailing slashes and excludes secret admin URLs', async () => {
    const sitemapEntries = await sitemap()
    expect(Array.isArray(sitemapEntries)).toBe(true)
    expect(sitemapEntries.length).toBeGreaterThan(15)

    for (const entry of sitemapEntries) {
      expect(entry.url).toMatch(/^https?:\/\//)
      expect(entry.url).toMatch(/\/$/) // Must end with trailing slash
      expect(entry.url).not.toContain('/manage-7f3b9x2k')
      expect(entry.url).not.toContain('/api')
    }

    // Verify key core hub pages are included
    const urls = sitemapEntries.map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/about-us/'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/services/'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/events/'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/blog/'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/gallery/'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/contact/'))).toBe(true)
  })
})
