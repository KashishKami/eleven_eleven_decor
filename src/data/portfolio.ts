export interface PortfolioProject {
  slug: string
  title: string
  subtitle: string
  category: 'Weddings' | 'Corporate' | 'Birthdays' | 'Engagements' | 'Private' | 'Destination'
  location: string
  venue: string
  guestCount: number
  summary: string
  heroImage: string
  galleryImages: string[]
  planningDetails: string[]
  decorHighlights: string[]
  executionNotes: string
  metaTitle: string
  metaDescription: string
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = []
