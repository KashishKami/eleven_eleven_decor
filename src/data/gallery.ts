export interface GalleryItem {
  id: string
  src: string
  title: string
  category: 'Weddings' | 'Corporate Events' | 'Birthdays' | 'Engagements' | 'Décor' | 'Stage Designs' | 'Venue Designs'
  aspectRatio?: 'square' | 'portrait' | 'landscape'
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    title: 'Royal Mandap Orchid Canopy',
    category: 'Weddings',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-2',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
    title: 'Botanical Glasshouse Reception Table',
    category: 'Décor',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-3',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    title: 'Executive Keynote Curved LED Stage',
    category: 'Stage Designs',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-4',
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
    title: '50th Jubilee Marquee & Edison Canopy',
    category: 'Birthdays',
    aspectRatio: 'square',
  },
  {
    id: 'gal-5',
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop',
    title: 'Ganga Riverside Sangeet Step Garlanding',
    category: 'Engagements',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-6',
    src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
    title: 'Colonial Heritage Ballroom Chandelier Staging',
    category: 'Venue Designs',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-7',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    title: 'Champagne Tower & Brass Pedestal Surround',
    category: 'Décor',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-8',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    title: 'Cliffside Heated Marquee Lounge',
    category: 'Venue Designs',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-9',
    src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop',
    title: 'Himalayan Valley Wedding Lawn Overview',
    category: 'Weddings',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-10',
    src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    title: 'Corporate Award Gala Velvet Seating',
    category: 'Corporate Events',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-11',
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop',
    title: 'Private Villa Candlelit Garden Walkway',
    category: 'Décor',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-12',
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
    title: 'Custom Wooden Sangeet Dance Floor Stage',
    category: 'Stage Designs',
    aspectRatio: 'square',
  },
]
