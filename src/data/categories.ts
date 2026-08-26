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
    bgImage: '/events/weddings-bg.jpg',
    cardImage: '/events/weddings-card.jpg',
    link: '/events/wedding-events/',
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    title: 'CORPORATE GALAS & SUMMITS',
    description:
      'Brand launches, galas, award nights, and conferences — professional production and precision execution.',
    bgImage: '/events/corporate-bg.jpg',
    cardImage: '/events/corporate-card.jpg',
    link: '/events/corporate-events/',
  },
  {
    id: 'birthdays',
    name: 'Birthdays',
    title: 'MILESTONE CELEBRATIONS',
    description:
      "Milestone birthdays, theme celebrations, and children's parties — tailored styling and entertainment.",
    bgImage: '/events/birthdays-bg.jpg',
    cardImage: '/events/birthdays-card.jpg',
    link: '/events/birthday-events/',
  },
  {
    id: 'engagements',
    name: 'Engagements',
    title: 'RING CEREMONIES & SANGEET',
    description:
      'Roka ceremonies, ring exchanges, and Sangeet celebrations — romantic ambiance and detailed planning.',
    bgImage: '/events/engagements-bg.jpg',
    cardImage: '/events/engagements-card.jpg',
    link: '/events/engagement-events/',
  },
  {
    id: 'parties',
    name: 'Private Events',
    title: 'PRIVATE SOIRÉES & MILESTONES',
    description:
      'Anniversaries, family gatherings, and house parties — intimate styling and complete coordination.',
    bgImage: '/events/parties-bg.jpg',
    cardImage: '/events/parties-card.jpg',
    link: '/events/private-events/',
  },
  {
    id: 'destinations',
    name: 'Destination Events',
    title: 'DESTINATION RETREATS',
    description:
      'Multi-day celebrations in hill resorts, heritage venues, and scenic retreats across Uttarakhand.',
    bgImage: '/events/destinations-bg.jpg',
    cardImage: '/events/destinations-card.jpg',
    link: '/events/destination-events/',
  },
]
