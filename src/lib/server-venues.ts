import fs from 'fs'
import path from 'path'
import type { VenueItem } from '@/data/venues'
import { getServerDataDir } from './server-data-dir'

export function getAllVenuesServer(): VenueItem[] {
  const jsonPath = path.join(getServerDataDir(), 'venues.json')
  if (!fs.existsSync(jsonPath)) {
    return []
  }
  try {
    const content = fs.readFileSync(jsonPath, 'utf-8')
    const venues = JSON.parse(content)
    if (Array.isArray(venues)) {
      return venues.filter((v) => !v.published || v.published === 1 || v.published === true)
    }
    return []
  } catch {
    return []
  }
}

export function getVenueBySlugServer(slug: string): VenueItem | null {
  const venues = getAllVenuesServer()
  return venues.find((v) => v.slug === slug) || null
}
