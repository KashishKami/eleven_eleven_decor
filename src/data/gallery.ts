export interface GalleryItem {
  id: string
  src: string
  title: string
  category: 'Weddings' | 'Corporate Events' | 'Birthdays' | 'Engagements' | 'Décor' | 'Stage Designs' | 'Venue Designs'
  aspectRatio?: 'square' | 'portrait' | 'landscape'
}

export const GALLERY_ITEMS: GalleryItem[] = []

