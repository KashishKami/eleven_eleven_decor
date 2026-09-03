import React from 'react'
import type { Metadata } from 'next'
import { getAllVenuesServer } from '@/lib/server-venues'
import { VenuesClient } from '@/components/sections/VenuesClient'
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
    url: 'https://elevenelevendecor.com/venues/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://elevenelevendecor.com/venues/',
  },
}

export default function VenuesHubPage() {
  const initialVenues = getAllVenuesServer()

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '11:11 Decor Preferred Venue Directory',
    itemListElement: initialVenues.map((v, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: v.name,
      url: `https://elevenelevendecor.com/venues/${v.slug}/`,
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

      {/* SECTION 2: Venues Client Component */}
      <VenuesClient initialVenues={initialVenues} />

      <FooterCTA />
    </div>
  )
}
