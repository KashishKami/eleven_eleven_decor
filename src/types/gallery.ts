export interface GalleryItem {
  id: string
  src?: string
  image?: string
  title: string
  category: string
  aspectRatio?: 'square' | 'portrait' | 'landscape'
  published?: boolean | number
  tags?: string[]
}
