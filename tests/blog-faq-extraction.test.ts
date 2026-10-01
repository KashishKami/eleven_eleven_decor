import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

function getPhpBinary(): string {
  if (fs.existsSync('C:\\php\\php.exe')) return 'C:\\php\\php.exe'
  return 'php'
}

describe('W-901 — Blog FAQ Extraction & Gateway Integration', () => {
  const phpBin = getPhpBinary()
  const rootDir = process.cwd()
  const testScriptPath = path.join(rootDir, 'tests', 'scripts', 'test-faq-save.php')
  const testDataDir = path.join(rootDir, 'tests', 'fixtures', 'data')
  const apiPostPath = path.join(rootDir, 'php-admin', 'api', 'blog-post.php')

  it('automatically extracts FAQ items from content on BlogStore::save', () => {
    const output = execSync(`"${phpBin}" "${testScriptPath}" save`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir },
    })

    const res = JSON.parse(output)
    expect(res.success).toBe(true)
    expect(res.has_faqs).toBe(true)
    expect(res.faq_count).toBe(2)
    expect(res.faqs[0].question).toBe('Can we customize our stage?')
    expect(res.faqs[0].answer).toBe('Yes, absolutely bespoke.')
    expect(res.faqs[1].question).toBe('Do you travel to Mussoorie?')
    expect(res.faqs[1].answer).toBe('Yes, regularly.')
  })

  it('returns parsed FAQs via GET /api/blog-post.php?slug=...', () => {
    const output = execSync(`"${phpBin}" "${apiPostPath}"`, {
      encoding: 'utf-8',
      env: {
        ...process.env,
        TEST_DATA_DIR: testDataDir,
        QUERY_STRING: 'slug=faq-extraction-test-post',
        REQUEST_METHOD: 'GET',
      },
    })

    const data = JSON.parse(output)
    expect(data.slug).toBe('faq-extraction-test-post')
    expect(Array.isArray(data.faqs)).toBe(true)
    expect(data.faqs).toHaveLength(2)
    expect(data.faqs[0].question).toBe('Can we customize our stage?')
  })
})
