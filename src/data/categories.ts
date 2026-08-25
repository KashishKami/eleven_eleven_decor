export interface Category {
  id: string
  name: string
  title: string
  description: string
  bgImage: string
  cardImage: string
  link: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'weddings',
    name: 'Weddings',
    title: 'WEDDING CELEBRATIONS',
    description:
      'End-to-end wedding planning and décor — mandap architecture, floral styling, lighting, and timeline management.',
    bgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
    link: '/events/wedding-events/',
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    title: 'CORPORATE GALAS & SUMMITS',
    description:
      'Brand launches, galas, award nights, and conferences — professional production and precision execution.',
    bgImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
    link: '/events/corporate-events/',
  },
  {
    id: 'birthdays',
    name: 'Birthdays',
    title: 'MILESTONE CELEBRATIONS',
    description:
      "Milestone birthdays, theme celebrations, and children's parties — tailored styling and entertainment.",
    bgImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
    link: '/events/birthday-events/',
  },
  {
    id: 'engagements',
    name: 'Engagements',
    title: 'RING CEREMONIES & SANGEET',
    description:
      'Roka ceremonies, ring exchanges, and Sangeet celebrations — romantic ambiance and detailed planning.',
    bgImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    link: '/events/engagement-events/',
  },
  {
    id: 'parties',
    name: 'Private Events',
    title: 'PRIVATE SOIRÉES & MILESTONES',
    description:
      'Anniversaries, family gatherings, and house parties — intimate styling and complete coordination.',
    bgImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop',
    link: '/events/private-events/',
  },
  {
    id: 'destinations',
    name: 'Destination Events',
    title: 'DESTINATION RETREATS',
    description:
      'Multi-day celebrations in hill resorts, heritage venues, and scenic retreats across Uttarakhand.',
    bgImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop',
    link: '/events/destination-events/',
  },
]
