export interface BlogFaq {
  question: string
  answer: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  category: string
  categoryName?: string
  date: string
  author: string
  image: string
  readTime: string
  published?: boolean
  faqs?: BlogFaq[]
  relatedServiceSlug?: string
  relatedServiceName?: string
  tags?: string[]
}

export interface BlogCategory {
  slug: string
  name: string
  description: string
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'weddings',
    name: 'Weddings',
    description: 'Expert planning advice, timelines, mandap inspiration, and coordination secrets for luxury weddings.',
  },
  {
    slug: 'birthdays',
    name: 'Birthdays',
    description: 'Creative birthday themes, bespoke milestones, balloon styling, and immersive celebration ideas.',
  },
  {
    slug: 'corporate-events',
    name: 'Corporate Events',
    description: 'Executive galas, summit staging, brand launch aesthetics, and professional event management.',
  },
  {
    slug: 'parties-celebrations',
    name: 'Parties & Celebrations',
    description: 'Private soirees, cocktail nights, anniversaries, and personal milestone celebrations.',
  },
  {
    slug: 'event-decoration',
    name: 'Event Decoration',
    description: 'Inspiring floral palettes, bespoke stage styling, couture tablescapes, and ambient lighting.',
  },
  {
    slug: 'event-planning',
    name: 'Event Planning',
    description: 'Practical checklists, budget planning, vendor coordination, and structural event strategies.',
  },
  {
    slug: 'event-ideas-inspiration',
    name: 'Event Ideas & Inspiration',
    description: 'Curated aesthetic moodboards, design trend spotlights, and inventive styling concepts.',
  },
  {
    slug: 'special-occasions',
    name: 'Special Occasions',
    description: 'Engagement functions, ring ceremonies, festive gatherings, and memorable family occasions.',
  },
  {
    slug: 'local-event-guides',
    name: 'Local Event Guides',
    description: 'Premier venues, regional vendor spotlights, destination logistics, and local event insights.',
  },
]
