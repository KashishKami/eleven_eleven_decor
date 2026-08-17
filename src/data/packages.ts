export interface PackageTier {
  id: string
  name: string
  tagline: string
  priceLabel: string
  popular: boolean
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
}

export const PACKAGES: PackageTier[] = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Curated Styling & Core Coordination',
    priceLabel: 'Custom Quote',
    popular: false,
    description:
      'Ideal for couples and hosts who have secured their venue and key vendors, seeking professional décor styling and seamless day-of management.',
    features: [
      'Comprehensive Décor Concept & Mood Board',
      'Stage, Mandap, or Entrance Backdrop Styling',
      'Table Centerpieces & Entrance Welcome Signage',
      'On-Site Day-of Event Manager (6 Hours)',
      'Vendor Coordination & Master Timeline Run-Through',
    ],
    ctaText: 'Request a Custom Quote',
    ctaHref: '/contact/',
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Full Planning, Floral Artistry & Production',
    priceLabel: 'Custom Quote',
    popular: true,
    description:
      'Our most requested experience. Complete end-to-end event planning, custom floral architecture, ambient lighting, and full venue transformation.',
    features: [
      'Bespoke Floral Architecture & Custom Mandap Design',
      'Full End-to-End Event Planning & Budget Management',
      'Architectural Pin-Spotting & Ambient Lighting Grid',
      'Vendor Procurement (Caterers, DJs, Photographers)',
      'Dedicated On-Site Director & Production Crew (Full Day)',
      'Guest Hospitality & Resort Check-in Helpdesk',
    ],
    ctaText: 'Request a Custom Quote',
    ctaHref: '/contact/',
  },
  {
    id: 'bespoke',
    name: 'Bespoke',
    tagline: 'Multi-Day Royal Banquets & Destinations',
    priceLabel: 'Custom Quote',
    popular: false,
    description:
      'Turnkey multi-day extravaganza management for royal palace weddings, destination resorts, and high-capacity corporate galas.',
    features: [
      'Multi-Day Master Timeline & Theme Isolation',
      '3D Venue Renderings & Architectural Floor Plans',
      'Custom Fabricated Structural Set Pieces & Stagecraft',
      'Air-Charter, VIP Logistics & Security Detail',
      'Full Destination Resort Management in Rajasthan/Hill Stations',
      '24/7 Dedicated Concierge & Production Directors',
    ],
    ctaText: 'Request a Custom Quote',
    ctaHref: '/contact/',
  },
]
