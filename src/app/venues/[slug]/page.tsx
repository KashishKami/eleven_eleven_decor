import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import pageVisibility from '../../../../php-admin/data/page-visibility.json'
import { getAllVenuesServer, getVenueBySlugServer } from '@/lib/server-venues'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './venue-detail.module.css'

interface Props {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  const venues = getAllVenuesServer()
  if (venues.length === 0) {
    return [{ slug: '__empty__' }]
  }
  return venues.map((venue) => ({
    slug: venue.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (params.slug === '__empty__') {
    return { title: 'Venue Not Found | 1111 Decor' }
  }
  const venue = getVenueBySlugServer(params.slug)
  if (!venue || !pageVisibility.venues) {
    return { title: 'Venue Not Found | 1111 Decor' }
  }

  return {
    title: venue.metaTitle,
    description: venue.metaDescription,
    openGraph: {
      title: venue.metaTitle,
      description: venue.metaDescription,
      url: `https://elevenelevendecor.com/venues/${venue.slug}/`,
      images: [{ url: venue.heroImage }],
    },
    alternates: {
      canonical: `https://elevenelevendecor.com/venues/${venue.slug}/`,
    },
  }
}

export default function VenueDetailPage({ params }: Props) {
  if (!pageVisibility.venues || params.slug === '__empty__') {
    notFound()
  }

  const venue = getVenueBySlugServer(params.slug)
  if (!venue) {
    notFound()
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: venue.name,
    description: venue.summary,
    address: venue.location,
    maximumAttendeeCapacity: venue.capacity,
  }

  return (
    <div className={styles.detailContainer}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Dark Hero Banner */}
      <div className={styles.heroSection}>
        <Image src={venue.heroImage} alt={venue.name} fill className={styles.heroImage} priority />
        <div className={styles.heroContent}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600 }}>
            PREFERRED VENUE FRAMEWORK
          </span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff', marginTop: '0.5rem' }}>
            {venue.name}
          </WindRevealHeading>
          <p className={styles.heroTagline}>{venue.tagline}</p>
        </div>
      </div>

      {/* Meta Specs Bar */}
      <div className={styles.metaBarDark}>
        <div className={styles.container}>
          <div className={styles.metaGrid}>
            <div>
              <span className={styles.metaLabelGold}>LOCATION</span>
              <span className={styles.metaValueWhite}>{venue.location}</span>
            </div>
            <div>
              <span className={styles.metaLabelGold}>SPACE PROFILE</span>
              <span className={styles.metaValueWhite}>{venue.spaceType}</span>
            </div>
            <div>
              <span className={styles.metaLabelGold}>MAX CAPACITY</span>
              <span className={styles.metaValueWhite}>{venue.capacity} Guests</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Light Theme Staging & Considerations */}
      <section className={styles.stagingSectionLight}>
        <div className={styles.container}>
          <p className={styles.summaryTextLight}>{venue.summary}</p>

          <div className={styles.splitGrid}>
            <div className={styles.boxLight}>
              <h2 className={styles.boxTitleDark}>Décor & Staging Possibilities</h2>
              <ul className={styles.featureListLight}>
                {venue.decorHighlights.map((highlight, idx) => (
                  <li key={idx} className={styles.featureItemLight}>
                    <span className={styles.iconGold}>✦</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.boxLight}>
              <h2 className={styles.boxTitleDark}>Technical & Planning Considerations</h2>
              <ul className={styles.featureListLight}>
                {venue.planningConsiderations.map((item, idx) => (
                  <li key={idx} className={styles.featureItemLight}>
                    <span className={styles.iconGold}>✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Dark Theme Visual Gallery */}
      <section className={styles.gallerySectionDark}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
              VENUE GALLERY
            </span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              Space & Atmosphere Showcase
            </WindRevealHeading>
          </div>

          <div className={styles.galleryGrid}>
            {venue.galleryImages.map((src, idx) => (
              <div key={idx} className={styles.galleryCard}>
                <Image
                  src={src}
                  alt={`${venue.name} Gallery Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link
              href="/venues/"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.75rem',
                border: '1px solid #c9a96e',
                color: '#c9a96e',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 700,
                borderRadius: '4px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              &larr; Back to Venues Directory
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
