export interface VenueItem {
  slug: string
  name: string
  tagline: string
  spaceType: 'Indoor' | 'Outdoor' | 'Hybrid (Indoor & Outdoor)'
  location: string
  capacity: number
  summary: string
  heroImage: string
  galleryImages: string[]
  decorHighlights: string[]
  planningConsiderations: string[]
  metaTitle: string
  metaDescription: string
}

export const VENUES: VenueItem[] = []
export const VENUES_DATA: VenueItem[] = []
