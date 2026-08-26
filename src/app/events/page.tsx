import React from 'react'
import type { Metadata } from 'next'
import { EVENTS_PAGE_FAQS } from '@/data/events'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { EventCategories } from '@/components/sections/EventCategories'
import { WorkProcess } from '@/components/sections/WorkProcess'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './events.module.css'

export const metadata: Metadata = {
  title: 'Events We Plan, Manage & Decorate | 11:11 Decor',
  description:
    'Every event type carries its own rhythm — a wedding unfolds across days, a product launch runs on minutes. 11:11 Decor plans and decorates each differently.',
  openGraph: {
    title: 'Events We Plan, Manage & Decorate | 11:11 Decor',
    description:
      'Every event type carries its own rhythm — a wedding unfolds across days, a product launch runs on minutes. 11:11 Decor plans and decorates each differently.',
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
            Events We Plan, Manage &amp; Decorate
          </WindRevealHeading>
          <p className={styles.introSubtext}>
            Every event type carries its own rhythm — a wedding unfolds across days, a product launch runs on minutes. 11:11 Decor plans and decorates each differently, matched to what that event actually needs.
          </p>
        </div>
      </section>

      {/* SECTION 2: Interactive Curtain-Wipe Event Categories Animation */}
      <EventCategories />

      {/* SECTION 3: 4-Step Process Section */}
      <WorkProcess />

      {/* SECTION 4: Why Choose Us Section */}
      <WhyChooseUs />

      {/* SECTION 5: Dark Theme FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqHeader}>
            <span className={styles.label} style={{ color: 'var(--color-accent)' }}>
              FREQUENTLY ASKED QUESTIONS
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

      {/* SECTION 6: Global Footer CTA */}
      <FooterCTA />
    </div>
  )
}
