import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { VENUES } from '@/data/venues'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './venues.module.css'

export const metadata: Metadata = {
  title: 'Find the Right Setting for Your Event | 1111 Decor',
  description:
    'Explore luxury indoor ballrooms, hill resort lawns, and riverfront settings across Dehradun, Mussoorie, and Rishikesh curated by 11:11 Decor.',
  openGraph: {
    title: 'Find the Right Setting for Your Event | 1111 Decor',
    description:
      'Explore luxury indoor ballrooms, hill resort lawns, and riverfront settings across Dehradun, Mussoorie, and Rishikesh curated by 11:11 Decor.',
    url: 'https://1111decor.com/venues/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://1111decor.com/venues/',
  },
}

export default function VenuesHubPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '11:11 Decor Preferred Venue Directory',
    itemListElement: VENUES.map((v, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: v.name,
      url: `https://1111decor.com/venues/${v.slug}/`,
    })),
  }

  return (
    <div className={styles.venuesContainer}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Dark Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.25rem' }}>
            CURATED SETTINGS
          </span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff' }}>
            Find the Right Setting for Your Event
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>
            Whether a venue is already booked or still being chosen, 11:11 Decor helps plan the layout and décor to suit the space — indoor, outdoor, or a mix of both.
          </p>
        </div>
      </section>

      {/* SECTION 2: Light Theme Venues Grid */}
      <section className={styles.gridSectionLight}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelDark}>PREFLIGHT VENUE DIRECTORY</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a', marginTop: '0.25rem' }}>
              Luxury Settings & Decor Frameworks
            </WindRevealHeading>
          </div>

          <div className={styles.cardsGrid}>
            {VENUES.map((venue) => (
              <Link key={venue.slug} href={`/venues/${venue.slug}/`} className={styles.venueCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={venue.heroImage}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div>
                    <span className={styles.spaceBadge}>{venue.spaceType}</span>
                    <h3 className={styles.cardTitle}>{venue.name}</h3>
                    <p className={styles.cardMeta}>{venue.location} • Up to {venue.capacity} Guests</p>
                    <p className={styles.cardDesc}>{venue.summary}</p>
                  </div>
                  <span className={styles.cardLink}>Explore Venue Staging &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
