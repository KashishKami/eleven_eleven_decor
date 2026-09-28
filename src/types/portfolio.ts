export interface PortfolioProject {
  id?: string
  slug: string
  title: string
  subtitle?: string
  category: string
  location: string
  venue?: string
  guestCount?: number | string
  summary?: string
  excerpt?: string
  description?: string
  heroImage: string
  images?: string[]
  galleryImages?: string[]
  planningDetails?: string[]
  decorHighlights?: string[]
  executionNotes?: string
  metaTitle?: string
  metaDescription?: string
  published?: boolean | number
  tags?: string[]
}
