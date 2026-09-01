import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './about-us.module.css'

export const metadata: Metadata = {
  title: 'About Us | 11:11 Decor',
  description:
    '11:11 Decor is an event management and décor studio designing weddings, celebrations, and corporate events with intention and detail.',
  openGraph: {
    title: 'About Us | 11:11 Decor',
    description:
      '11:11 Decor is an event management and décor studio designing weddings, celebrations, and corporate events with intention and detail.',
    url: 'https://1111decor.com/about-us/',
  },
  alternates: {
    canonical: 'https://1111decor.com/about-us/',
  },
}

export default function AboutUsPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '11:11 Decor',
    url: 'https://1111decor.com/',
    logo: 'https://1111decor.com/logo.png',
    description:
      '11:11 Decor is an event management and décor studio designing weddings, celebrations, and corporate events.',
  }

  return (
    <div className={styles.aboutContainer}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Dark Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <span className={styles.labelGold}>ABOUT 11:11 DECOR</span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff' }}>
            Creating Experiences, Not Just Events
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>
            11:11 Decor is an event management and décor studio designing weddings, celebrations, and corporate events. We work across planning, décor, and on-site coordination — either as a full end-to-end service or as individual pieces of a larger event you&apos;re managing yourself.
          </p>
        </div>
      </section>

      {/* SECTION 2: Light Theme Intro & Our Approach */}
      <section className={styles.approachSectionLight}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div>
              <span className={styles.labelDark}>PHILOSOPHY</span>
              <h2 className="heading-lg" style={{ color: '#1a1a1a', marginBlock: '0.5rem 1.25rem' }}>
                Our Approach
              </h2>
              <p className={styles.textContentLight} style={{ marginBottom: '1.25rem' }}>
                Every event begins with a conversation, not a template. We start by understanding the occasion, the people it&apos;s for, and the feeling you want guests to walk away with.
              </p>
              <p className={styles.textContentLight}>
                That shapes the concept — the palette, the layout, the pacing of the day — before a single vendor is booked.
              </p>
            </div>
            <div className={styles.imageBox}>
              <Image
                src="/images/about/about-page.jpg"
                alt="11:11 Decor Event Design"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Dark Theme Planning & Décor Together */}
      <section className={styles.togetherSectionDark}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelGold}>INTEGRATED PROCESS</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              Planning &amp; Décor, Together
            </WindRevealHeading>
          </div>
          <div className={styles.cardsGridDark}>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Connected Thinking</h3>
              <p className={styles.cardTextDark}>
                Planning and décor are handled as one connected process rather than two separate services.
              </p>
            </div>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Informed Layouts</h3>
              <p className={styles.cardTextDark}>
                The design concept informs the floor plan, and the floor plan informs vendor logistics.
              </p>
            </div>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Harmonious Execution</h3>
              <p className={styles.cardTextDark}>
                Every element is built to work together on the day rather than assembled at the last minute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Light Theme Attention to Detail */}
      <section className={styles.detailSectionLight}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div className={styles.imageBox}>
              <Image
                src="/about-detail.jpg"
                alt="11:11 Decor Attention to Detail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <span className={styles.labelDark}>CRAFTSMANSHIP</span>
              <h2 className="heading-lg" style={{ color: '#1a1a1a', marginBlock: '0.5rem 1.25rem' }}>
                Attention to Detail
              </h2>
              <p className={styles.textContentLight} style={{ marginBottom: '1.25rem' }}>
                The small decisions — spacing between tables, the order of the evening, where the light falls at golden hour — are treated with the same care as the large ones.
              </p>
              <p className={styles.textContentLight}>
                It&apos;s these details that guests remember, even if they can&apos;t always name why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Dark Theme On Event Day */}
      <section className={styles.daySectionDark}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelGold}>PEACE OF MIND</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              On Event Day
            </WindRevealHeading>
            <p className={styles.daySubtitleDark}>
              Our team manages setup, timing, and coordination on-site, so you&apos;re free to be a guest at your own event rather than its stage manager.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Link
                href="/contact/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: '#c9a96e',
                  color: '#111111',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(201, 169, 110, 0.35)',
                }}
              >
                <span>Plan Your Event</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <FooterCTA />
    </div>
  )
}
