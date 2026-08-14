export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  image: string
  readTime: string
}

export const BLOG_DATA: BlogPost[] = [
  {
    id: '1',
    slug: 'luxury-wedding-trends-2026',
    title: 'Top Luxury Wedding Decor Trends Shaping 2026',
    excerpt: 'From sculptural floral arches to ambient kinetic lighting, discover how top planners create magic.',
    category: 'Weddings',
    date: 'August 10, 2026',
    author: 'Elena Rostova',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    readTime: '5 min read',
  },
  {
    id: '2',
    slug: 'corporate-banquet-styling',
    title: 'Designing Executive Corporate Galas That Inspire',
    excerpt: 'How spatial staging and high-end gastronomy elevate brand authority at corporate summits.',
    category: 'Corporate',
    date: 'August 04, 2026',
    author: 'Marcus Vance',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
    readTime: '4 min read',
  },
  {
    id: '3',
    slug: 'art-of-tablescape-design',
    title: 'The Art of the Haute Couture Tablescape',
    excerpt: 'Exploring custom crystal, hand-embroided linens, and botanical centerpiece harmony.',
    category: 'Event Styling',
    date: 'July 28, 2026',
    author: 'Sophia Laurent',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1000&auto=format&fit=crop',
    readTime: '6 min read',
  },
]
