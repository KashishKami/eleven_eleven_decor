import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

function getPhpBinary(): string {
  if (fs.existsSync('C:\\php\\php.exe')) return 'C:\\php\\php.exe'
  return 'php'
}

describe('Dynamic XML Sitemaps Engine (W-1201)', () => {
  const phpBin = getPhpBinary()
  const rootDir = process.cwd()
  const phpAdminDir = path.join(rootDir, 'php-admin')
  const apiDir = path.join(phpAdminDir, 'api')
  const portfolioSitemapPath = path.join(apiDir, 'portfolio-sitemap.php')
  const venuesSitemapPath = path.join(apiDir, 'venues-sitemap.php')
  const sitemapIndexPath = path.join(apiDir, 'sitemap-index.php')

  it('portfolio-sitemap.php handles visibility toggle and generates valid XML', () => {
    expect(fs.existsSync(portfolioSitemapPath)).toBe(true)

    // 1. When visibility is false (overridden), returns clean empty urlset
    const hiddenOutput = execSync(`"${phpBin}" "${portfolioSitemapPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, VISIBILITY_PORTFOLIO: '0' },
    })
    expect(hiddenOutput).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(hiddenOutput).not.toContain('/portfolio/')

    // 2. When visibility is true, outputs all published portfolio projects
    const visibleOutput = execSync(`"${phpBin}" "${portfolioSitemapPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, VISIBILITY_PORTFOLIO: '1' },
    })
    expect(visibleOutput).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(visibleOutput).toContain('/portfolio/')
    expect(visibleOutput).toContain('<changefreq>monthly</changefreq>')
    expect(visibleOutput).toContain('<priority>0.75</priority>')
  })

  it('venues-sitemap.php handles visibility toggle and generates valid XML', () => {
    expect(fs.existsSync(venuesSitemapPath)).toBe(true)

    // 1. When visibility is false, returns clean empty urlset
    const hiddenOutput = execSync(`"${phpBin}" "${venuesSitemapPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, VISIBILITY_VENUES: '0' },
    })
    expect(hiddenOutput).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(hiddenOutput).not.toContain('/venues/')

    // 2. When visibility is true, outputs all published venues
    const visibleOutput = execSync(`"${phpBin}" "${venuesSitemapPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, VISIBILITY_VENUES: '1' },
    })
    expect(visibleOutput).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(visibleOutput).toContain('/venues/')
    expect(visibleOutput).toContain('<changefreq>monthly</changefreq>')
    expect(visibleOutput).toContain('<priority>0.75</priority>')
  })

  it('sitemap-index.php includes references to blog, portfolio, and venues dynamic sitemaps', () => {
    const output = execSync(`"${phpBin}" "${sitemapIndexPath}"`, { encoding: 'utf-8' })
    expect(output).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(output).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(output).toContain('/sitemap.xml')
    expect(output).toContain('/php-admin/api/blog-sitemap.php')
    expect(output).toContain('/php-admin/api/portfolio-sitemap.php')
    expect(output).toContain('/php-admin/api/venues-sitemap.php')
    expect(output).toContain('</sitemapindex>')
  })
})
