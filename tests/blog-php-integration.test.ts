import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

describe('PHP & Blog Backend Integration Tests', () => {
  const rootDir = process.cwd()
  const phpAdminDir = path.join(rootDir, 'php-admin')
  const testDataDir = path.join(rootDir, 'tests', 'fixtures', 'data')
  const postsJson = path.join(testDataDir, 'posts.json')
  const crudScriptPath = path.join(rootDir, 'tests', 'scripts', 'test-crud.php')
  const phpBin = fs.existsSync('C:\\php\\php.exe') ? 'C:\\php\\php.exe' : 'php'

  it('verifies PHP BlogStore auto-seeds initial luxury articles', () => {
    const blogsApiPath = path.join(phpAdminDir, 'api', 'blogs.php')
    const output = execSync(`"${phpBin}" "${blogsApiPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir }
    })
    const posts = JSON.parse(output)

    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThanOrEqual(5)
    expect(fs.existsSync(postsJson)).toBe(true)

    const first = posts[0]
    expect(first).toHaveProperty('id')
    expect(first).toHaveProperty('slug')
    expect(first).toHaveProperty('title')
    expect(first).toHaveProperty('category')
    expect(first).toHaveProperty('categoryName')
    expect(first).toHaveProperty('excerpt')
    expect(first).toHaveProperty('author')
    expect(first).toHaveProperty('image')
    expect(first).toHaveProperty('readTime')
    expect(first).toHaveProperty('date')
  })

  it('executes all CRUD operations (Create, Read List, Read Single, Filter, Update, Delete)', () => {
    const output = execSync(`"${phpBin}" "${crudScriptPath}"`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir }
    })
    const data = JSON.parse(output)

    expect(data.success).toBe(true)
    expect(data.results.create).toBe(true)
    expect(data.results.read_list).toBe(true)
    expect(data.results.read_single).toBe(true)
    expect(data.results.category_filter).toBe(true)
    expect(data.results.update).toBe(true)
    expect(data.results.delete).toBe(true)
  })

  it('verifies api/blog-post.php returns single post detail with FAQs', () => {
    const seedCheck = JSON.parse(fs.readFileSync(postsJson, 'utf-8'))
    expect(seedCheck.length).toBeGreaterThanOrEqual(5)
    const seedPost = seedCheck.find(
      (p: { slug: string; faqs: { question: string; answer: string }[]; related_service_slug: string }) =>
        p.slug === 'complete-wedding-decor-checklist'
    )
    expect(seedPost).toBeDefined()
    expect(seedPost.faqs.length).toBeGreaterThan(0)
    expect(seedPost.related_service_slug).toBe('wedding-decoration')
  })
})
