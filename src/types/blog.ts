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
}

export interface BlogCategory {
  slug: string
  name: string
  description: string
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'wedding-planning',
    name: 'Wedding Planning',
    description: 'Expert planning advice, timelines, and coordination secrets for seamless wedding celebrations.',
  },
  {
    slug: 'event-planning',
    name: 'Event Planning',
    description: 'Practical guides and structural strategies for planning milestones, anniversaries, and social events.',
  },
  {
    slug: 'decoration-ideas',
    name: 'Decoration Ideas',
    description: 'Inspiring floral palettes, mandap styling, lighting concepts, and couture tablescapes.',
  },
  {
    slug: 'corporate-events',
    name: 'Corporate Events',
    description: 'Executive galas, summit staging, brand launch aesthetics, and professional event management.',
  },
  {
    slug: 'venue-destination-events',
    name: 'Venue & Destination Events',
    description: 'Destination logistics, luxury resort transformations, and indoor vs outdoor venue selection.',
  },
]
