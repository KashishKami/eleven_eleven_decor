import { CONTACT_INFO } from '@/data/contact'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ServiceSchemaInput {
  name: string
  description: string
  slug: string
  image?: string
}

export interface ArticleSchemaInput {
  title: string
  description: string
  slug: string
  category: string
  datePublished: string
  dateModified?: string
  image?: string
  author?: string
}

export interface OrganizationSchema {
  '@context': string
  '@type': 'Organization'
  name: string
  alternateName?: string[]
  url: string
  logo: string
  description: string
  sameAs: string[]
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    areaServed: string
    availableLanguage: string[]
  }
}

export interface LocalBusinessSchema {
  '@context': string
  '@type': 'LocalBusiness'
  name: string
  image: string
  url: string
  telephone: string
  email: string
  priceRange: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
}

export interface ServiceSchema {
  '@context': string
  '@type': 'Service'
  name: string
  description: string
  url: string
  image: string
  provider: {
    '@type': 'LocalBusiness'
    name: string
    telephone: string
    url: string
  }
  areaServed: {
    '@type': 'AdministrativeArea'
    name: string
  }
}

export interface FAQPageSchema {
  '@context': string
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

export interface ArticleSchema {
  '@context': string
  '@type': 'BlogPosting'
  headline: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    '@type': 'Organization'
    name: string
    url: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
}

export interface BreadcrumbListSchema {
  '@context': string
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

const SITE_URL = 'https://1111decor.com'

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '11:11 Decor',
    alternateName: ['Eleven Eleven Decor', '1111 Decor'],
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Luxury event planning, bespoke floral staging, stage architecture, and celebration decor services.',
    sameAs: [
      'https://www.instagram.com/1111decor',
      'https://www.facebook.com/1111decor',
      'https://www.pinterest.com/1111decor',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone.display,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  }
}

export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '11:11 Decor',
    image: `${SITE_URL}/og-image.jpg`,
    url: `${SITE_URL}/contact/`,
    telephone: '+917466854475',
    email: CONTACT_INFO.email.display,
    priceRange: '₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address.street,
      addressLocality: CONTACT_INFO.address.city,
      addressRegion: CONTACT_INFO.address.state,
      postalCode: CONTACT_INFO.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.3164945,
      longitude: 77.962884,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
  }
}

export function generateServiceSchema(service: ServiceSchemaInput): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}/`,
    image: service.image || `${SITE_URL}/og-service.jpg`,
    provider: {
      '@type': 'LocalBusiness',
      name: '11:11 Decor',
      telephone: '+917466854475',
      url: `${SITE_URL}/`,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Uttarakhand, India',
    },
  }
}

export function generateFAQSchema(faqs: FaqItem[]): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateArticleSchema(article: ArticleSchemaInput): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/blog/${article.category}/${article.slug}/`,
    image: article.image || `${SITE_URL}/og-blog.jpg`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || '11:11 Decor Design Studio',
      url: `${SITE_URL}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: '11:11 Decor',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.category}/${article.slug}/`,
    },
  }
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export interface PortfolioSchemaInput {
  title: string
  description: string
  slug: string
  heroImage?: string
  location?: string
  category?: string
}

export function generatePortfolioSchema(project: PortfolioSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.heroImage,
    locationCreated: project.location,
    genre: project.category,
    provider: {
      '@type': 'Organization',
      name: '11:11 Decor',
      url: `${SITE_URL}/`,
    },
  }
}

export interface VenueSchemaInput {
  name: string
  description: string
  slug: string
  heroImage?: string
  location?: string
  capacity?: number
  spaceType?: string
}

export function generateVenueSchema(venue: VenueSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: venue.name,
    description: venue.description,
    image: venue.heroImage,
    address: venue.location,
    maximumAttendeeCapacity: venue.capacity,
  }
}

export const HOMEPAGE_FAQS_LIST = [
  {
    question: 'What types of events does 11:11 Decor manage?',
    answer: 'We manage and decorate weddings, corporate galas, milestone birthdays, engagements, private dinners, and destination celebrations across Uttarakhand.',
  },
  {
    question: 'Do you provide complete event planning, or only decoration?',
    answer: 'We provide both. You can book us for end-to-end event planning and management, decoration services only, or a fully integrated package covering both.',
  },
  {
    question: 'Can we hire 11:11 Decor for decoration only?',
    answer: 'Yes. If your venue, catering, and timeline are already set, our styling team can focus entirely on stage design, floral architecture, lighting, and ambient tablescapes.',
  },
  {
    question: 'Can we customize our event package?',
    answer: 'Absolutely. Every event is unique. Our packages (Essential, Signature, Bespoke) serve as curated frameworks which we tailor to your specific venue, guest count, and creative vision.',
  },
  {
    question: 'How far in advance should we book?',
    answer: 'We recommend booking 4 to 8 months in advance for major weddings and corporate galas to secure premier dates, design custom fabrication sets, and reserve seasonal botanicals.',
  },
  {
    question: 'Do you manage corporate events as well as weddings?',
    answer: 'Yes. We regularly execute corporate annual galas, executive summits, product launches, and award ceremonies with surgical stagecraft and precise audio-visual coordination.',
  },
  {
    question: 'Do you work outside Dehradun / Uttarakhand?',
    answer: 'While our studio is based in Dehradun, we frequently produce destination weddings and corporate retreats across Mussoorie, Rishikesh, Haridwar, Jim Corbett, and beyond.',
  },
  {
    question: 'How do we request a quote?',
    answer: 'You can submit our quick inquiry form on the Contact page or message us directly on WhatsApp (+91 74668 54475) with your event date, estimated guest count, and preferred venue.',
  },
]

export function generateHomePageSchemaGraph() {
  const org = generateOrganizationSchema()
  const localBiz = generateLocalBusinessSchema()

  const webSite = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: '11:11 Decor',
    description: 'Luxury Event Management, Wedding Staging & Décor Studio in Dehradun, Uttarakhand.',
    publisher: {
      '@type': 'Organization',
      name: '11:11 Decor',
    },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const webPage = {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: '11:11 Decor | Luxury Event Management & Décor Studio',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@type': 'Organization',
      name: '11:11 Decor',
    },
    description: '11:11 Decor plans and decorates weddings, celebrations, and corporate events — from first concept to final detail.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
      ],
    },
  }

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
    ],
  }

  const serviceCatalog = {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-catalog`,
    name: '11:11 Decor Event Planning & Styling Services',
    serviceType: 'Event Planning, Production, Floral Architecture & Decor',
    description: 'End-to-end luxury event design, wedding coordination, banquet lighting, and stage architecture across Uttarakhand.',
    provider: {
      '@type': 'LocalBusiness',
      name: '11:11 Decor',
      telephone: '+917466854475',
      url: `${SITE_URL}/`,
    },
    areaServed: [
      { '@type': 'City', name: 'Dehradun' },
      { '@type': 'City', name: 'Mussoorie' },
      { '@type': 'City', name: 'Rishikesh' },
      { '@type': 'AdministrativeArea', name: 'Uttarakhand' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '11:11 Decor Core Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wedding Planning & Styling',
            url: `${SITE_URL}/services/wedding-planning/`,
            description: 'Complete royal and intimate wedding curation, mandap architecture, and vendor coordination.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wedding Decoration',
            url: `${SITE_URL}/services/wedding-decoration/`,
            description: 'Bespoke floral arches, couture aisle aesthetics, and cinematic stage lighting.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate Event Management',
            url: `${SITE_URL}/services/corporate-event-management/`,
            description: 'Executive summits, galas, award nights, and brand launches with precision AV staging.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Event Management',
            url: `${SITE_URL}/services/event-management/`,
            description: 'End-to-end production, on-site master control, timeline orchestration, and guest flow.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Event Planning',
            url: `${SITE_URL}/services/event-planning/`,
            description: 'Conceptualization, budget architecture, vendor curation, and blueprint scheduling.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Venue Decoration',
            url: `${SITE_URL}/services/venue-decoration/`,
            description: 'Spatial transformation of ballrooms, heritage estates, and open lawns.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Event Styling',
            url: `${SITE_URL}/services/event-styling/`,
            description: 'Curated color palettes, textures, couture tablescapes, and ambient detailing.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lighting Production',
            url: `${SITE_URL}/services/lighting-production/`,
            description: 'Intelligent kinetic lighting, fairy canopies, and architectural illumination.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stage Architecture',
            url: `${SITE_URL}/services/stage-architecture/`,
            description: 'Sculptural stages, curved LED backdrops, and acoustic rigging.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hospitality & Guest Coordination',
            url: `${SITE_URL}/services/hospitality-guest-coordination/`,
            description: 'VIP welcomes, seamless airport transfers, and guest itinerary support.',
          },
        },
      ],
    },
  }

  const faqPage = {
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQS_LIST.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // Combine into single @graph
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...org, '@context': undefined },
      { ...localBiz, '@context': undefined, areaServed: ['Dehradun', 'Mussoorie', 'Rishikesh', 'Uttarakhand', 'India'] },
      webSite,
      webPage,
      breadcrumbs,
      serviceCatalog,
      faqPage,
    ],
  }
}

export function generateAboutPageSchemaGraph() {
  const org = generateOrganizationSchema()
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about-us/#webpage`,
        url: `${SITE_URL}/about-us/`,
        name: 'About 11:11 Decor — Luxury Event Management & Décor Studio',
        description: 'Learn about 11:11 Decor, our design philosophy, creative leadership, and event execution standards.',
        mainEntity: {
          '@type': 'Organization',
          name: '11:11 Decor',
          url: `${SITE_URL}/`,
        },
      },
      { ...org, '@context': undefined },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: `${SITE_URL}/about-us/` },
        ],
      },
    ],
  }
}

export function generateContactPageSchemaGraph() {
  const localBiz = generateLocalBusinessSchema()
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact/#webpage`,
        url: `${SITE_URL}/contact/`,
        name: 'Contact 11:11 Decor — Plan Your Event',
        description: 'Connect with 11:11 Decor to check date availability and schedule your consultation.',
        mainEntity: {
          '@type': 'LocalBusiness',
          name: '11:11 Decor',
          telephone: '+917466854475',
        },
      },
      { ...localBiz, '@context': undefined },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact Us', item: `${SITE_URL}/contact/` },
        ],
      },
    ],
  }
}

export function generateMenuPageSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FoodService',
        name: '11:11 Decor Catering & Gastronomy Services',
        description: 'Bespoke multi-course wedding banquets, artisanal live stations, and luxury cocktail gastronomy.',
        provider: {
          '@type': 'Organization',
          name: '11:11 Decor',
          url: `${SITE_URL}/`,
        },
        url: `${SITE_URL}/menu/`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Menu', item: `${SITE_URL}/menu/` },
        ],
      },
    ],
  }
}

export function generateTeamPageSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: '11:11 Decor Leadership & Creative Team',
        description: 'Meet the executive planners, floral architects, and stage craft directors behind 11:11 Decor.',
        url: `${SITE_URL}/our-team/`,
      },
      {
        '@type': 'ItemList',
        name: '11:11 Decor Team Directory',
        itemListElement: [
          {
            '@type': 'Person',
            name: 'Kashish',
            jobTitle: 'Founder & Principal Event Director',
            worksFor: { '@type': 'Organization', name: '11:11 Decor' },
          },
          {
            '@type': 'Person',
            name: 'Kami',
            jobTitle: 'Creative Design & Spatial Architecture Lead',
            worksFor: { '@type': 'Organization', name: '11:11 Decor' },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Our Team', item: `${SITE_URL}/our-team/` },
        ],
      },
    ],
  }
}
