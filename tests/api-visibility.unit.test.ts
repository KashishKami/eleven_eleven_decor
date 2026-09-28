import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

function getPhpBinary(): string {
  if (fs.existsSync('C:\\php\\php.exe')) return 'C:\\php\\php.exe'
  return 'php'
}

describe('PHP Public API Page Visibility Gating', () => {
  const phpBin = getPhpBinary()
  const rootDir = process.cwd()
  const apiDir = path.join(rootDir, 'php-admin', 'api')

  it('gallery.php returns empty array when gallery visibility is disabled', () => {
    const galleryApi = path.join(apiDir, 'gallery.php')
    const output = execSync(`"${phpBin}" "${galleryApi}"`, {
      encoding: 'utf-8',
      env: { ...process.env, VISIBILITY_GALLERY: '0' },
    })
    const json = JSON.parse(output.trim())
    expect(json).toEqual([])
  })

  it('portfolio.php returns empty array when portfolio visibility is disabled', () => {
    const portfolioApi = path.join(apiDir, 'portfolio.php')
    const output = execSync(`"${phpBin}" "${portfolioApi}"`, {
      encoding: 'utf-8',
      env: { ...process.env, VISIBILITY_PORTFOLIO: '0' },
    })
    const json = JSON.parse(output.trim())
    expect(json).toEqual([])
  })

  it('venues.php returns empty array when venues visibility is disabled', () => {
    const venuesApi = path.join(apiDir, 'venues.php')
    const output = execSync(`"${phpBin}" "${venuesApi}"`, {
      encoding: 'utf-8',
      env: { ...process.env, VISIBILITY_VENUES: '0' },
    })
    const json = JSON.parse(output.trim())
    expect(json).toEqual([])
  })

  it('blogs.php returns empty array when blog visibility is disabled', () => {
    const blogsApi = path.join(apiDir, 'blogs.php')
    const output = execSync(`"${phpBin}" "${blogsApi}"`, {
      encoding: 'utf-8',
      env: { ...process.env, VISIBILITY_BLOG: '0' },
    })
    const json = JSON.parse(output.trim())
    expect(json).toEqual([])
  })
})
