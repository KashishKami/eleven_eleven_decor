export interface PortfolioProject {
  slug: string
  title: string
  subtitle: string
  category: 'Weddings' | 'Corporate' | 'Birthdays' | 'Engagements' | 'Private' | 'Destination'
  location: string
  venue: string
  guestCount: number
  summary: string
  heroImage: string
  galleryImages: string[]
  planningDetails: string[]
  decorHighlights: string[]
  executionNotes: string
  metaTitle: string
  metaDescription: string
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'royal-palace-wedding-dehradun',
    title: 'The Royal Palace Wedding',
    subtitle: 'A Multi-Day Palace Celebration in Dehradun',
    category: 'Weddings',
    location: 'Dehradun, Uttarakhand',
    venue: 'Palace Estate Gardens',
    guestCount: 650,
    summary:
      'A majestic multi-day wedding featuring bespoke botanical mandap architecture, 5,000+ imported white orchids, and micro-pinspot ambient lighting grids.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
    ],
    planningDetails: [
      'Multi-day master timeline covering Sangeet, Haldi, Mandap ritual, and Grand Reception',
      'Guest resort check-in helpdesk with custom welcome hampers and luggage dispatch',
      'Vendor management for 14 specialized teams including royal caterers and classical ensembles',
    ],
    decorHighlights: [
      '30ft custom glass mandap surrounded by reflecting lily ponds',
      'Cascading white orchid and Rajnigandha floral chandeliers',
      'Handcrafted velvet seating with gold embroidery and brass lanterns',
    ],
    executionNotes:
      'Our production directors managed a crew of 45 craftsmen working round-the-clock to construct the glass mandap and install 120 pin-spots without disturbing venue lawn architecture.',
    metaTitle: 'The Royal Palace Wedding Case Study | 1111 Decor',
    metaDescription:
      'Explore how 11:11 Decor produced a multi-day royal palace wedding in Dehradun featuring custom glass mandap architecture and floral staging.',
  },
  {
    slug: 'executive-brand-summit-mussoorie',
    title: 'Executive Leadership Summit',
    subtitle: 'Corporate Gala & Brand Launch at JW Marriott Mussoorie',
    category: 'Corporate',
    location: 'Mussoorie, Uttarakhand',
    venue: 'JW Marriott Walnut Grove',
    guestCount: 280,
    summary:
      'High-impact executive gala engineered with curved LED stagecraft, acoustic damping, and polished corporate hospitality.',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
    ],
    planningDetails: [
      'Seamless AV integration with dual 4K LED screens and wireless microphone array',
      'VIP airport transfers from Jolly Grant Airport Dehradun to Mussoorie hills',
      'Strict corporate brand guideline alignment across all stage signage and press walls',
    ],
    decorHighlights: [
      'Modern matte-black stage design with brushed champagne gold geometric accents',
      'Monochrome white calla lily and eucalyptus table arrangements',
      'Dynamic intelligent moving-head light show for executive keynote intros',
    ],
    executionNotes:
      'Delivered 100% on-time execution for international board members with zero technical latency during live satellite keynote broadcasts.',
    metaTitle: 'Executive Leadership Summit Case Study | 1111 Decor',
    metaDescription:
      'Discover executive corporate gala production at JW Marriott Mussoorie engineered by 11:11 Decor with precision stagecraft.',
  },
  {
    slug: 'golden-50th-milestone-soiree',
    title: 'Golden 50th Jubilee Soirée',
    subtitle: 'Intimate Luxury Milestone Celebration in Private Estate',
    category: 'Birthdays',
    location: 'Dehradun, Uttarakhand',
    venue: 'Private Botanical Estate',
    guestCount: 120,
    summary:
      'Warm candlelit garden transformation featuring organic balloon arches, marquee light numbers, and custom dessert staging.',
    heroImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop',
    ],
    planningDetails: [
      'Curated live jazz quartet entertainment booking and sound balance',
      'Bespoke multi-course culinary tasting menu coordination with artisanal chefs',
      'Valet parking management for 80 luxury vehicles',
    ],
    decorHighlights: [
      'Giant 6ft vintage Edison bulb marquee "50" numeral backdrop',
      'Warm fairy-light canopy spanning over 2,000 sq ft of private lawn',
      'Custom champagne tower display with floral pedestal surround',
    ],
    executionNotes:
      'Transformed a residential garden into a 5-star venue with zero disruption to neighboring residential properties.',
    metaTitle: 'Golden 50th Jubilee Soirée Case Study | 1111 Decor',
    metaDescription:
      'Explore how 11:11 Decor transformed a private estate for a luxury 50th milestone birthday celebration.',
  },
  {
    slug: 'ganga-riverside-sangeet-rishikesh',
    title: 'Ganga Riverside Sangeet',
    subtitle: 'Romantic Ring Ceremony & Energetic Sangeet Night',
    category: 'Engagements',
    location: 'Rishikesh, Uttarakhand',
    venue: 'Ganga Vista Resort',
    guestCount: 300,
    summary:
      'Romantic riverbank engagement featuring marigold floral mandap arches, folk music performances, and energetic dance floor production.',
    heroImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000&auto=format&fit=crop',
    ],
    planningDetails: [
      'Rishikesh riverfront authority permits and safety management',
      'Choreographer rehearsal scheduling and stage sound check',
      'Traditional Uttarakhand folk artist welcome performance setup',
    ],
    decorHighlights: [
      'Traditional yellow & orange marigold floral drapes along riverside steps',
      'Custom wooden dance floor with LED perimeter washer lights',
      'Brass diya water lanterns floating along the venue reflection pools',
    ],
    executionNotes:
      'Overcame riverbank breeze challenges by anchoring floral drapes with reinforced brass frame structures.',
    metaTitle: 'Ganga Riverside Sangeet Case Study | 1111 Decor',
    metaDescription:
      'Read about a romantic riverfront engagement and Sangeet night in Rishikesh designed by 11:11 Decor.',
  },
  {
    slug: 'botanical-anniversary-soiree',
    title: 'Candlelit Villa Anniversary',
    subtitle: 'Discreet Private Luxury Home Transformation',
    category: 'Private',
    location: 'Rajpur Road Villa, Dehradun',
    venue: 'Private Residence',
    guestCount: 60,
    summary:
      'Intimate anniversary dinner surrounded by 500+ pillar candles, lush moss table runners, and personalized acoustic serenades.',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000&auto=format&fit=crop',
    ],
    planningDetails: [
      'Private chef menu pairing and sommelier service coordination',
      'Acoustic cellist and violinist playlist curation',
    ],
    decorHighlights: [
      'Natural moss and white garden rose tablescape',
      'Custom gold-embossed menu cards and place cards for each guest',
    ],
    executionNotes:
      'Executed full setup and strike within a 12-hour window maintaining total homeowner privacy.',
    metaTitle: 'Candlelit Villa Anniversary Case Study | 1111 Decor',
    metaDescription:
      'See how 11:11 Decor turned a private villa into an intimate candlelit sanctuary for a luxury silver anniversary.',
  },
  {
    slug: 'himalayan-destination-wedding-mussoorie',
    title: 'Himalayan Destination Extravaganza',
    subtitle: '3-Day Mountain Peak Resort Wedding',
    category: 'Destination',
    location: 'Mussoorie Hills',
    venue: 'Savoy Heritage Resort',
    guestCount: 400,
    summary:
      'Turnkey destination wedding set against snow-capped mountain peaks with full guest hospitality and mountain transport logistics.',
    heroImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    ],
    planningDetails: [
      'Hilly terrain transport logistics and fleet management for 400 guests',
      'Weather backup hangar setup with heated marquee structures',
      '24/7 guest hospitality desk inside resort lobby',
    ],
    decorHighlights: [
      'Glass-walled cliffside mandap with panoramic mountain valley backdrop',
      'Heated outdoor lounge with velvet bolsters and fire pits',
    ],
    executionNotes:
      'Managed sudden mountain weather shifts seamlessly by deploying pre-staged transparent canopy covers within 15 minutes.',
    metaTitle: 'Himalayan Destination Wedding Case Study | 1111 Decor',
    metaDescription:
      'Explore a turnkey 3-day Himalayan destination wedding in Mussoorie produced by 11:11 Decor.',
  },
]
