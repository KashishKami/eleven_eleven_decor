import fs from 'fs'
import path from 'path'
import { getServerDataDir } from './server-data-dir'

export interface PageVisibility {
  blog: boolean
  gallery: boolean
  portfolio: boolean
  venues: boolean
}

const DEFAULT_VISIBILITY: PageVisibility = {
  blog: false,
  gallery: false,
  portfolio: false,
  venues: false,
}

/**
 * Server-only helper to read the latest page visibility state directly
 * from disk without stale module cache in development or test runs.
 */
export function getPageVisibility(): PageVisibility {
  try {
    const filePath = path.join(getServerDataDir(), 'page-visibility.json')
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const parsed = JSON.parse(content)
      return {
        blog: Boolean(parsed.blog),
        gallery: Boolean(parsed.gallery),
        portfolio: Boolean(parsed.portfolio),
        venues: Boolean(parsed.venues),
      }
    }
  } catch {
    // Fallback to default
  }
  return DEFAULT_VISIBILITY
}
