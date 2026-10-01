import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import { generateMetadata } from '@/app/blog/[...slug]/page'

function getPhpBinary(): string {
  if (fs.existsSync('C:\\php\\php.exe')) return 'C:\\php\\php.exe'
  return 'php'
}

describe('W-902 — Dedicated Meta Title & Meta Description Integration', () => {
  const phpBin = getPhpBinary()
  const rootDir = process.cwd()
  const testDataDir = path.join(rootDir, 'tests', 'fixtures', 'data')
  const postsJson = path.join(testDataDir, 'posts.json')
  const apiPostPath = path.join(rootDir, 'php-admin', 'api', 'blog-post.php')

  it('saves and reads custom meta_title and meta_description in BlogStore', () => {
    const testScriptPath = path.join(rootDir, 'tests', 'scripts', 'test-meta-save.php')
    const output = execSync(`"${phpBin}" "${testScriptPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir },
    })

    const res = JSON.parse(output)
    expect(res.success).toBe(true)
    expect(res.post.meta_title).toBe('Custom SERP Meta Title | 11:11 Decor')
    expect(res.post.meta_description).toBe('Custom SERP meta description strictly within 120-160 characters for search snippet ranking.')

    // Verify stored in posts.json
    const posts = JSON.parse(fs.readFileSync(postsJson, 'utf-8'))
    const found = posts.find((p: { slug: string }) => p.slug === 'custom-meta-tags-test-post')
    expect(found).toBeDefined()
    expect(found.meta_title).toBe('Custom SERP Meta Title | 11:11 Decor')
    expect(found.meta_description).toBe('Custom SERP meta description strictly within 120-160 characters for search snippet ranking.')
  })

  it('serializes metaTitle and metaDescription in GET /api/blog-post.php', () => {
    const output = execSync(`"${phpBin}" "${apiPostPath}"`, {
      encoding: 'utf-8',
      env: {
        ...process.env,
        TEST_DATA_DIR: testDataDir,
        QUERY_STRING: 'slug=custom-meta-tags-test-post',
        REQUEST_METHOD: 'GET',
      },
    })

    const data = JSON.parse(output)
    expect(data.slug).toBe('custom-meta-tags-test-post')
    expect(data.metaTitle).toBe('Custom SERP Meta Title | 11:11 Decor')
    expect(data.metaDescription).toBe('Custom SERP meta description strictly within 120-160 characters for search snippet ranking.')
  })

  it('generateMetadata uses post.metaTitle and post.metaDescription when available', async () => {
    const metadata = await generateMetadata({
      params: { slug: ['weddings', 'custom-meta-tags-test-post'] },
    })

    expect(metadata.title).toBe('Custom SERP Meta Title | 11:11 Decor')
    expect(metadata.description).toBe('Custom SERP meta description strictly within 120-160 characters for search snippet ranking.')
    expect(metadata.openGraph?.title).toBe('Custom SERP Meta Title | 11:11 Decor')
    expect(metadata.openGraph?.description).toBe('Custom SERP meta description strictly within 120-160 characters for search snippet ranking.')
  })
})
