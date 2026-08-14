export interface MenuItem {
  id: string
  slug: string
  title: string
  category: string
  description: string
  price: string
  image: string
  featured?: boolean
}

export const MENUS_DATA: MenuItem[] = [
  {
    id: '1',
    slug: 'corporate-banquet',
    title: 'Corporate Banquet Experience',
    category: 'Corporate',
    description: 'Artisanal multi-course dining with wine pairings crafted for executive summits.',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: '2',
    slug: 'social-gala',
    title: 'Social Gala & Reception',
    category: 'Cocktail',
    description: 'Decadent cocktail bites, interactive live stations, and luxury dessert bar.',
    price: '$95',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: '3',
    slug: 'royal-wedding',
    title: 'Royal Wedding Feast',
    category: 'Wedding',
    description: 'Bespoke plated dinner service featuring signature seafood and steak courses.',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: '4',
    slug: 'gala-dinner',
    title: 'Gala Dinner Tasting Menu',
    category: 'Gala Dinner',
    description: 'Seven-course tasting experience with curated international fusion dishes.',
    price: '$110',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: '5',
    slug: 'luxury-buffet',
    title: 'Grand Imperial Buffet',
    category: 'Buffet',
    description: 'Extensive gourmet selection featuring carving stations, fresh seafood bar, and artisan pastries.',
    price: '$75',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
]

export const MENUS = MENUS_DATA
