import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import JsonLd from '@/components/seo/JsonLd'
import { SERVICES_DATA } from '@/data/services'
import styles from './services.module.css'

export const metadata: Metadata = {
  title: 'Event Planning, Management & Décor Services | 11:11 Decor',
  description:
    '11:11 Decor offers end-to-end event planning, management, visual decoration, floral installations, and lighting production for weddings, corporate events, and celebrations.',
  openGraph: {
    title: 'Event Planning, Management & Décor Services | 11:11 Decor',
    description:
      'From first concept conversation to the last flower placed. Explore our 11 specialized event services.',
    url: 'https://1111decor.com/services/',
  },
}

export default function ServicesPage() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Event Planning, Management & Décor',
    provider: {
      '@type': 'Organization',
      name: '11:11 Decor',
    },
    areaServed: 'India & Destination Locations',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '11:11 Decor Services Catalog',
      itemListElement: SERVICES_DATA.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
        },
        position: index + 1,
      })),
    },
  }

  return (
    <main className={styles.servicesContainer}>
      <JsonLd data={jsonLdData} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className={styles.label}>WHAT WE OFFER</span>
          <div style={{ width: '100%', textAlign: 'center', margin: '0 auto 24px' }}>
            <WindRevealHeading as="h1" className={styles.heroHeading}>
              Event Planning, Management & Décor Services
            </WindRevealHeading>
          </div>
          <p className={styles.heroSubtext}>
            Some events need full management from the first planning call through to breakdown on event day. Others just need décor built around a date and venue that&apos;s already set. 11:11 Decor offers both — choose one service, or combine several into a single coordinated plan.
          </p>
        </div>
      </section>

      {/* 10 Services Grid */}
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.servicesGrid}>
            {SERVICES_DATA.map((service) => (
              <article
                key={service.slug}
                className={styles.serviceCard}
                data-testid="service-card"
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.cardImage}
                    style={{ objectPosition: service.imagePosition || 'center center' }}
                  />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{service.title}</h2>
                  <p className={styles.cardDescription}>{service.shortDescription}</p>
                  <Link href={`/services/${service.slug}/`} className={styles.cardLink}>
                    <span>Learn More</span>
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                      <path
                        d="M12 1L17 6M17 6L12 11M17 6H1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reused Why Choose Us Section */}
      <WhyChooseUs />
    </main>
  )
}
