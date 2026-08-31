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
    telephone: '+919876543210',
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
      telephone: '+919876543210',
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
