'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useVenues } from '@/hooks/useVenues'
import type { VenueItem } from '@/data/venues'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import styles from '@/app/venues/venues.module.css'

interface VenuesClientProps {
  initialVenues: VenueItem[]
}

export function VenuesClient({ initialVenues }: VenuesClientProps) {
  const { venues } = useVenues(initialVenues)

  return (
    <section className={styles.gridSectionLight}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.labelDark}>PREFLIGHT VENUE DIRECTORY</span>
          <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a', marginTop: '0.25rem' }}>
            Luxury Settings &amp; Decor Frameworks
          </WindRevealHeading>
        </div>

        {venues.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
            <p style={{ fontSize: '1.25rem', color: '#1a1a1a', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
              Curating Partner Venues &amp; Estates
            </p>
            <p style={{ fontSize: '0.95rem', color: '#7a7369', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              Our curated directory of mountain resorts, palace lawns, and luxury banquet estates is currently being updated. Contact our team directly for custom venue recommendations.
            </p>
          </div>
        ) : (
          <div className={styles.cardsGrid}>
            {venues.map((venue) => (
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
        )}
      </div>
    </section>
  )
}
