export interface Category {
  id: string
  name: string
  title: string
  description: string
  bgImage: string
  cardImage: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'corporate',
    name: 'CORPORATE',
    title: 'CORPORATE GALAS',
    description:
      'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    bgImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'social',
    name: 'SOCIAL EVENT',
    title: 'SOCIAL RECEPTIONS',
    description:
      'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    bgImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'weddings',
    name: 'WEDDINGS',
    title: 'WEDDING BANQUETS',
    description:
      'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    bgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'parties',
    name: 'PARTIES',
    title: 'PRIVATE SOIRÉES',
    description:
      'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    bgImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop',
  },
]
