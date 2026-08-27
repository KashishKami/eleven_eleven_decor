import fs from 'fs'
import path from 'path'
import type { VenueItem } from '@/data/venues'

export function getAllVenuesServer(): VenueItem[] {
  const jsonPath = path.resolve(process.cwd(), 'php-admin/data/venues.json')
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
