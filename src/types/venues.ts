export interface Venue {
  id?: string
  slug: string
  name: string
  tagline?: string
  spaceType?: string
  category?: string
  location: string
  city?: string
  capacity: number | string
  summary?: string
  excerpt?: string
  description?: string
  heroImage?: string
  coverImage?: string
  images?: string[]
  galleryImages?: string[]
  decorHighlights?: string[]
  planningConsiderations?: string[]
  metaTitle?: string
  metaDescription?: string
  published?: boolean | number
  tags?: string[]
}

export type VenueItem = Venue
