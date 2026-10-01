import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

function getPhpBinary(): string {
  if (fs.existsSync('C:\\php\\php.exe')) return 'C:\\php\\php.exe'
  return 'php'
}

describe('W-903 — API Cache-Control & Gateway Freshness Pipeline', () => {
  const phpBin = getPhpBinary()
  const rootDir = process.cwd()
  const testScriptPath = path.join(rootDir, 'tests', 'scripts', 'test-headers.php')
  const freshnessScriptPath = path.join(rootDir, 'tests', 'scripts', 'test-gateway-freshness.php')
  const testDataDir = path.join(rootDir, 'tests', 'fixtures', 'data')

  it('enforces strict no-cache headers on api/blog-post.php', () => {
    const apiPath = path.join(rootDir, 'php-admin', 'api', 'blog-post.php')
    const output = execSync(
      `"${phpBin}" "${testScriptPath}" "${apiPath}" "slug=wedding-decor-checklist"`,
      {
        encoding: 'utf-8',
        env: { ...process.env, TEST_DATA_DIR: testDataDir },
      }
    )

    const res = JSON.parse(output)
    const headers: string[] = res.headers || []

    const hasCacheControl = headers.some(
      (h) =>
        h.toLowerCase().includes('cache-control') &&
        h.toLowerCase().includes('no-store') &&
        h.toLowerCase().includes('no-cache')
    )
    const hasPragma = headers.some(
      (h) => h.toLowerCase().includes('pragma') && h.toLowerCase().includes('no-cache')
    )

    expect(hasCacheControl).toBe(true)
    expect(hasPragma).toBe(true)
  })

  it('enforces strict no-cache headers on api/blogs.php', () => {
    const apiPath = path.join(rootDir, 'php-admin', 'api', 'blogs.php')
    const output = execSync(`"${phpBin}" "${testScriptPath}" "${apiPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir },
    })

    const res = JSON.parse(output)
    const headers: string[] = res.headers || []

    const hasCacheControl = headers.some(
      (h) =>
        h.toLowerCase().includes('cache-control') &&
        h.toLowerCase().includes('no-store') &&
        h.toLowerCase().includes('no-cache')
    )
    const hasPragma = headers.some(
      (h) => h.toLowerCase().includes('pragma') && h.toLowerCase().includes('no-cache')
    )

    expect(hasCacheControl).toBe(true)
    expect(hasPragma).toBe(true)
  })

  it('enforces strict no-cache headers on api/blog-sitemap.php', () => {
    const apiPath = path.join(rootDir, 'php-admin', 'api', 'blog-sitemap.php')
    const output = execSync(`"${phpBin}" "${testScriptPath}" "${apiPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir },
    })

    const res = JSON.parse(output)
    const headers: string[] = res.headers || []

    const hasCacheControl = headers.some(
      (h) =>
        h.toLowerCase().includes('cache-control') &&
        h.toLowerCase().includes('no-store') &&
        h.toLowerCase().includes('no-cache')
    )

    expect(hasCacheControl).toBe(true)
  })

  it('gateway freshness serves updated post metadata and extracted FAQ schema immediately', () => {
    const output = execSync(`"${phpBin}" "${freshnessScriptPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir },
    })

    const res = JSON.parse(output)
    expect(res.slug).toBe('freshness-test-post')
    expect(res.metaTitle).toBe('Fresh Live SERP Meta Title | 11:11 Decor')
    expect(res.metaDesc).toBe('Fresh meta description strictly 120-160 chars for SEO snippet testing.')
    expect(res.has_faq_schema).toBe(true)
    expect(res.faqs).toHaveLength(1)
    expect(res.faqs[0].question).toBe('Can you customize mandaps?')
  })
})
