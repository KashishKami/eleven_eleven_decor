export interface VenueItem {
  slug: string
  name: string
  tagline: string
  spaceType: 'Indoor' | 'Outdoor' | 'Hybrid (Indoor & Outdoor)'
  location: string
  capacity: number
  summary: string
  heroImage: string
  galleryImages: string[]
  decorHighlights: string[]
  planningConsiderations: string[]
  metaTitle: string
  metaDescription: string
}

export const VENUES: VenueItem[] = [
  {
    slug: 'jw-marriott-mussoorie-walnut-grove',
    name: 'JW Marriott Mussoorie Walnut Grove',
    tagline: '5-Star Himalayan Luxury Resort & Valley Lawn',
    spaceType: 'Hybrid (Indoor & Outdoor)',
    location: 'Mussoorie, Uttarakhand',
    capacity: 500,
    summary:
      'Set against panoramic Garhwal mountain peaks, offering pillarless ballrooms and manicured cliffside lawns ideal for royal wedding mandaps and executive galas.',
    heroImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
    ],
    decorHighlights: [
      'Cliffside glass mandap architecture with mist-proof heating systems',
      'High-ceiling grand ballroom suitable for complex truss lighting grids',
      'Cascading botanical entry pathways and terrace cocktail lounges',
    ],
    planningConsiderations: [
      'Hill transport fleet management for guest arrivals from Jolly Grant Airport',
      'Weather-contingency glass marquee setups during monsoon and winter seasons',
      'In-house culinary staging integration with 11:11 Decor master directors',
    ],
    metaTitle: 'JW Marriott Mussoorie Venue & Décor Possibilities | 1111 Decor',
    metaDescription:
      'Discover venue planning and décor staging possibilities at JW Marriott Mussoorie Walnut Grove by 11:11 Decor.',
  },
  {
    slug: 'taj-rishikesh-resort-spa',
    name: 'Taj Rishikesh Resort & Spa',
    tagline: 'Sanctuary on the Banks of the Holy Ganges',
    spaceType: 'Outdoor',
    location: 'Rishikesh, Uttarakhand',
    capacity: 350,
    summary:
      'Serene terraced riverfront estate designed in traditional Himalayan stone architecture, perfect for spiritual wedding rituals, Sangeet evenings, and holistic wellness retreats.',
    heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
    ],
    decorHighlights: [
      'Riverside diya water-light installations and floating lotus bowls',
      'Terraced lawn floral drapes featuring yellow and marigold garlands',
      'Acoustic sound damping for live classical Indian music ensembles',
    ],
    planningConsiderations: [
      'Ganga riverfront environmental regulations and acoustic guidelines',
      'Eco-friendly biodegradable floral and wooden stagecraft materials',
    ],
    metaTitle: 'Taj Rishikesh Venue & Décor Possibilities | 1111 Decor',
    metaDescription:
      'Explore riverside wedding and event staging at Taj Rishikesh Resort & Spa curated by 11:11 Decor.',
  },
  {
    slug: 'savoy-heritage-palace-mussoorie',
    name: 'The Savoy Heritage Hotel',
    tagline: 'Colonial Era Heritage Estate & Grand Ballroom',
    spaceType: 'Indoor',
    location: 'Mussoorie, Uttarakhand',
    capacity: 400,
    summary:
      'Historic 19th-century Victorian estate offering gothic arched ballrooms, wood-paneled dining halls, and timeless royal heritage charm.',
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop',
    ],
    decorHighlights: [
      'Vintage crystal chandelier restoration and warm amber wash lighting',
      'Royal velvet drapery paired with brass candelabra centerpieces',
    ],
    planningConsiderations: [
      'Heritage property preservation guidelines for stage framing and wall mounts',
      'Historic ballroom acoustic balancing',
    ],
    metaTitle: 'The Savoy Heritage Mussoorie Venue Staging | 1111 Decor',
    metaDescription:
      'Explore colonial heritage ballroom wedding and event staging at The Savoy Mussoorie by 11:11 Decor.',
  },
  {
    slug: 'dehradun-botanical-estate-gardens',
    name: 'Dehradun Botanical Estate',
    tagline: 'Sprawling Private Lawn & Glass Pavilion Sanctuary',
    spaceType: 'Outdoor',
    location: 'Dehradun Valley',
    capacity: 700,
    summary:
      'Expansive private botanical gardens featuring ancient mango orchards, open amphitheaters, and modern glass pavilion structures.',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop',
    ],
    decorHighlights: [
      'Overhead canopy of 5,000 fairy lights spanning central lawn area',
      'Custom timber stagecraft and botanical archways',
    ],
    planningConsiderations: [
      'Generator power backup and distribution grid setup',
      'High-capacity guest parking and shuttle dispatching',
    ],
    metaTitle: 'Dehradun Botanical Estate Venue Staging | 1111 Decor',
    metaDescription:
      'Discover outdoor garden wedding and gala venue staging at Dehradun Botanical Estate by 11:11 Decor.',
  },
]
