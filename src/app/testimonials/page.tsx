import React from 'react'
import type { Metadata } from 'next'
import { TESTIMONIALS } from '@/data/testimonials'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import styles from './testimonials.module.css'

export const metadata: Metadata = {
  title: 'Client Testimonials | 1111 Decor',
  description:
    'Read real stories and reviews from hosts and couples who experienced luxury event planning and decor by 11:11 Decor.',
  openGraph: {
    title: 'Client Testimonials | 1111 Decor',
    description:
      'Read real stories and reviews from hosts and couples who experienced luxury event planning and decor by 11:11 Decor.',
    url: 'https://1111decor.com/testimonials/',
  },
  alternates: {
    canonical: 'https://1111decor.com/testimonials/',
  },
}

export default function TestimonialsPage() {
  // SEO Note (Section 11 Handoff Warning): Strictly omit Review or AggregateRating JSON-LD schema
  return (
    <div className={styles.testimonialsContainer}>
      {/* SECTION 1: Dark Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600 }}>
            REAL STORIES & CELEBRATIONS
          </span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff', marginTop: '0.5rem' }}>
            Client Words & Celebrations
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>
            Our greatest reward is creating flawless memories for couples, families, and organizations across India and international destinations.
          </p>
        </div>
      </section>

      {/* SECTION 2: Light Theme Testimonials Grid */}
      <section className={styles.gridSectionLight}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelDark}>HEARTFELT REVIEWS</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a' }}>
              What Hosts Say About Us
            </WindRevealHeading>
          </div>

          <div className={styles.cardsGrid}>
            {TESTIMONIALS.map((item) => (
              <article key={item.id} className={styles.testimonialCard}>
                <div>
                  <div className={styles.starsRow}>
                    {'★'.repeat(item.rating)}
                  </div>
                  <p className={styles.quoteText}>&ldquo;{item.quote}&rdquo;</p>
                </div>

                <div className={styles.clientMeta}>
                  <h3 className={styles.clientName}>{item.clientName}</h3>
                  <span className={styles.eventDetails}>{item.eventType}</span>
                  <span className={styles.locationText}>{item.location} • {item.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
