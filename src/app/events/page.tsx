import React from 'react'
import type { Metadata } from 'next'
import { EVENTS_PAGE_FAQS } from '@/data/events'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { EventCategories } from '@/components/sections/EventCategories'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './events.module.css'

export const metadata: Metadata = {
  title: 'All 6 Event Categories | 1111 Decor',
  description:
    'Explore luxury event planning, royal weddings, corporate galas, milestone birthdays, and destination management by 11:11 Decor.',
  openGraph: {
    title: 'All 6 Event Categories | 1111 Decor',
    description:
      'Explore luxury event planning, royal weddings, corporate galas, milestone birthdays, and destination management by 11:11 Decor.',
    url: 'https://1111decor.com/events/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://1111decor.com/events/',
  },
}

export default function EventsHubPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://1111decor.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Events',
        item: 'https://1111decor.com/events/',
      },
    ],
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Dark Hero Header */}
      <section className={styles.heroHeader}>
        <div className={styles.container}>
          <span className={styles.label} style={{ color: 'var(--color-accent)' }}>
            EXPLORE OUR OCCASIONS
          </span>
          <WindRevealHeading
            as="h1"
            className="heading-xl"
            style={{ color: '#ffffff', marginTop: '0.75rem' }}
          >
            All 6 Event Categories
          </WindRevealHeading>
          <p className={styles.introSubtext}>
            From intimate private dinners to multi-day royal weddings and corporate galas, our team seamlessly combines
            strategic event planning, bespoke floral design, and surgical on-site execution.
          </p>
        </div>
      </section>

      {/* SECTION 2: Interactive Curtain-Wipe Event Categories Animation */}
      <EventCategories />

      {/* SECTION 3: Dark Theme FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqHeader}>
            <span className={styles.label} style={{ color: 'var(--color-accent)' }}>
              GOT QUESTIONS?
            </span>
            <WindRevealHeading
              as="h2"
              className="heading-lg"
              style={{ color: '#ffffff', marginTop: '0.5rem' }}
            >
              Frequently Asked Questions
            </WindRevealHeading>
          </div>

          <div className={styles.faqGrid}>
            {EVENTS_PAGE_FAQS.map((faq, index) => (
              <div key={index} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Dark Theme Footer CTA */}
      <FooterCTA />
    </div>
  )
}
