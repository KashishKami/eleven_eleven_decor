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
    name: 'WEDDING EVENTS',
    title: 'ROYAL WEDDING BANQUETS',
    description:
      'Bespoke mandap architecture, multi-day master timelines, and royal celebration execution.',
    bgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
    link: '/events/wedding-events/',
  },
  {
    id: 'corporate',
    name: 'CORPORATE EVENTS',
    title: 'CORPORATE GALAS & SUMMITS',
    description:
      'Executive galas, award ceremonies, and brand launches engineered with precision stagecraft.',
    bgImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
    link: '/events/corporate-events/',
  },
  {
    id: 'birthdays',
    name: 'BIRTHDAY EVENTS',
    title: 'MILESTONE BIRTHDAYS',
    description:
      'Theme selection, organic balloon canopies, marquee light letters, and custom dessert setups.',
    bgImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
    link: '/events/birthday-events/',
  },
  {
    id: 'engagements',
    name: 'ENGAGEMENT & SANGEET',
    title: 'RING CEREMONIES & SANGEET',
    description:
      'Ring exchanges, Roka ceremonies, and energetic Sangeet nights crafted with romantic flair.',
    bgImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    link: '/events/engagement-events/',
  },
  {
    id: 'parties',
    name: 'PRIVATE PARTIES',
    title: 'PRIVATE SOIRÉES',
    description:
      'Anniversaries, housewarmings, baby showers, and discreet luxury home venue transformations.',
    bgImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop',
    link: '/events/private-events/',
  },
  {
    id: 'destinations',
    name: 'DESTINATION EVENTS',
    title: 'DESTINATION CELEBRATIONS',
    description:
      'Turnkey destination planning in Mussoorie, Rishikesh, and Rajasthan with full guest hospitality.',
    bgImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1600&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop',
    link: '/events/destination-events/',
  },
]
