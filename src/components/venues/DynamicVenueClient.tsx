'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { VenueItem } from '@/data/venues'
import { useVenue } from '@/hooks/useVenue'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { generateVenueSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerators'
import { resolveImageUrl } from '@/lib/image-url'
import styles from '@/app/venues/[slug]/venue-detail.module.css'

interface Props {
  slug: string
  initialVenue?: VenueItem | null
}

/**
 * Returns the last path segment of the browser URL, which is the venue slug.
 * e.g. /venues/grand-heritage-palace/ → 'grand-heritage-palace'
 */
function getSlugFromPathname(): string | null {
  if (typeof window === 'undefined') return null
  const parts = window.location.pathname.replace(/\/$/, '').split('/').filter(Boolean)
  // parts = ['venues', 'grand-heritage-palace']
  const venueIndex = parts.indexOf('venues')
  if (venueIndex === -1 || venueIndex + 1 >= parts.length) return null
  return parts[venueIndex + 1] ?? null
}

export function DynamicVenueClient({ slug: propSlug, initialVenue: propInitialVenue }: Props) {
  // On client mount, read the real slug from the browser URL.
  // If gateway.php served an old HTML shell, propSlug is the old venue's slug.
  // We detect the mismatch and discard the stale initialVenue so the hook
  // fetches the correct venue instead of briefly showing the wrong one.
  const [slug, setSlug] = useState<string>(propSlug)
  const [initialVenue, setInitialVenue] = useState<VenueItem | null | undefined>(propInitialVenue)

  useEffect(() => {
    const urlSlug = getSlugFromPathname()
    if (urlSlug && urlSlug !== propSlug) {
      // URL slug differs from the baked prop — new CMS item served via old shell.
      // Discard stale initialVenue so useVenue fetches fresh data.
      setInitialVenue(null)
      setSlug(urlSlug)
    }
  // Run once on mount only.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { venue, loading, error } = useVenue(slug, initialVenue)

  // Client-side JSON-LD injection for rich Google Schema
  useEffect(() => {
    if (!venue || typeof document === 'undefined') return

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        generateVenueSchema({
          name: venue.name,
          description: venue.summary,
          slug: venue.slug,
          heroImage: venue.heroImage,
          location: venue.location,
          capacity: venue.capacity,
          spaceType: venue.spaceType,
        }),
        generateBreadcrumbSchema([
          { name: 'Home', url: 'https://1111decor.com/' },
          { name: 'Venues', url: 'https://1111decor.com/venues/' },
          { name: venue.name, url: `https://1111decor.com/venues/${venue.slug}/` },
        ]),
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = `venue-schema-${venue.slug}`
    script.text = JSON.stringify(schemaData)
    document.head.appendChild(script)

    return () => {
      const existing = document.getElementById(`venue-schema-${venue.slug}`)
      if (existing) {
        existing.remove()
      }
    }
  }, [venue])

  if (loading) {
    return (
      <div style={{ paddingTop: '140px', minHeight: '80vh', textAlign: 'center', backgroundColor: '#0f0e0c', color: '#ede5d8' }}>
        <p style={{ color: '#c9a96e', fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>Loading luxury venue framework...</p>
      </div>
    )
  }

  if (error || !venue) {
    return (
      <div style={{ paddingTop: '140px', minHeight: '80vh', textAlign: 'center', backgroundColor: '#0f0e0c', color: '#ffffff', padding: '0 1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#c9a96e', marginBottom: '1rem' }}>
          Venue Not Found
        </h1>
        <p style={{ color: '#a8a29e', marginBottom: '2.5rem', fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          This luxury venue profile may be undergoing staging updates or is currently marked as draft.
        </p>
        <Link
          href="/venues/"
          style={{
            display: 'inline-block',
            padding: '0.85rem 2rem',
            backgroundColor: '#c9a96e',
            color: '#1a1a1a',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
          }}
        >
          Return to Venues Directory
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.detailContainer}>
      {/* SECTION 1: Dark Hero Banner */}
      <div className={styles.heroSection}>
        <Image src={resolveImageUrl(venue.heroImage)} alt={venue.name} fill unoptimized className={styles.heroImage} priority />
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
                {venue.decorHighlights?.map((highlight, idx) => (
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
                {venue.planningConsiderations?.map((item, idx) => (
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
            {venue.galleryImages?.map((src, idx) => (
              <div key={idx} className={styles.galleryCard}>
                <Image
                  src={resolveImageUrl(src)}
                  alt={`${venue.name} Gallery Image ${idx + 1}`}
                  fill
                  unoptimized
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
