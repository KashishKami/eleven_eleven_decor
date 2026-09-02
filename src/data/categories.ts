export interface Category {
  id: string
  name: string
  title: string
  description: string
  bgImage: string
  bgPosition?: string
  cardImage: string
  link: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'weddings',
    name: 'Weddings',
    title: 'WEDDING CELEBRATIONS',
    description:
      'End-to-end wedding planning and décor — mandap, stage, venue styling, and coordination across every ceremony.',
    bgImage: '/events/weddings-new.jpg',
    cardImage: '/events/weddings-new.jpg',
    link: '/events/wedding-events/',
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    title: 'CORPORATE EVENTS',
    description:
      'Product launches, conferences, and company celebrations planned and staged with a professional finish.',
    bgImage: '/events/corporate-bg.jpg',
    cardImage: '/events/corporate-bg.jpg',
    link: '/events/corporate-events/',
  },
  {
    id: 'birthdays',
    name: 'Birthday Celebrations',
    title: 'BIRTHDAY CELEBRATIONS',
    description:
      'Milestone birthdays and intimate parties, themed and decorated to match the celebration in mind.',
    bgImage: '/events/birthdays-card.jpg',
    cardImage: '/events/birthdays-card.jpg',
    link: '/events/birthday-events/',
  },
  {
    id: 'engagements',
    name: 'Engagements',
    title: 'ENGAGEMENT FUNCTIONS',
    description:
      'Ring ceremonies and engagement functions styled with décor that photographs as beautifully as it feels.',
    bgImage: '/events/engagements-new.jpeg',
    cardImage: '/events/engagements-new.jpeg',
    link: '/events/engagement-events/',
  },
  {
    id: 'parties',
    name: 'Private Events',
    title: 'PRIVATE CELEBRATIONS',
    description:
      'Anniversaries, family functions, and personal celebrations planned with the same attention as our largest events.',
    bgImage: '/events/private-parties-4.jpg',
    cardImage: '/events/private-parties-4.jpg',
    link: '/events/private-events/',
  },
  {
    id: 'destinations',
    name: 'Destination Events',
    title: 'DESTINATION EVENTS',
    description:
      'Planning and décor coordination for events held away from home, with logistics handled end to end.',
    bgImage: '/events/destinations-card.jpg',
    cardImage: '/events/destinations-card.jpg',
    link: '/events/destination-events/',
  },
]
