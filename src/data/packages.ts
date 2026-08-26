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

export const PACKAGES_HERO = {
  h1: 'Planning Built Around Your Event',
  intro:
    'Every quote depends on event type, guest count, venue, décor scope, and production needs — packages below are a starting point, not a fixed price.',
  ctaText: 'Request a Custom Quote',
  ctaHref: '/contact/',
}

export const PACKAGES: PackageTier[] = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Core décor & single-day coordination',
    priceLabel: 'Custom Quote',
    popular: false,
    description:
      'Ideal for events with venues established, focused on core styling, stage design, and day-of vendor coordination.',
    features: [
      'Core décor & styling',
      'Single-day on-site coordination',
      'Vendor and supplier liaison',
      'Run-of-show timeline execution',
      'Décor mood board and setup supervision',
    ],
    ctaText: 'Request a Custom Quote',
    ctaHref: '/contact/',
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Full planning, complete décor & dedicated on-site team',
    priceLabel: 'Custom Quote',
    popular: true,
    description:
      'Our comprehensive service covering complete concept planning, décor design across every ceremony, and dedicated management.',
    features: [
      'Full event planning & management',
      'Complete décor across all functions',
      'Dedicated on-site management team',
      'Master timeline & vendor contract coordination',
      'Stage, floral, lighting & ambient styling',
      'Full guest flow & on-day troubleshooting',
    ],
    ctaText: 'Request a Custom Quote',
    ctaHref: '/contact/',
  },
  {
    id: 'bespoke',
    name: 'Bespoke',
    tagline: 'Custom concept development & multi-venue logistics',
    priceLabel: 'Custom Quote',
    popular: false,
    description:
      'Tailored turnkey production for multi-venue celebrations, destination events, and custom stage fabrication.',
    features: [
      'Custom concept development',
      'Destination & multi-venue logistics',
      'Production, lighting & entertainment coordination',
      'Travel and logistics planning for destination events',
      'Comprehensive on-site multi-day management',
    ],
    ctaText: 'Request a Custom Quote',
    ctaHref: '/contact/',
  },
]
