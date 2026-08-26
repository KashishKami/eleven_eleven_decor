import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './about-us.module.css'

export const metadata: Metadata = {
  title: 'About Us | 1111 Decor',
  description:
    'Discover the vision behind 11:11 Decor. We combine strategic event planning, bespoke floral staging, and flawless execution for unforgettable celebrations.',
  openGraph: {
    title: 'About Us | 1111 Decor',
    description:
      'Discover the vision behind 11:11 Decor. We combine strategic event planning, bespoke floral staging, and flawless execution for unforgettable celebrations.',
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
      'Luxury event planning, design, and execution specializing in royal weddings, corporate galas, and private celebrations.',
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
            At 11:11 Decor, we believe that an extraordinary celebration is more than a gathering—it is a living tapestry of atmosphere, emotion, and architectural beauty.
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
                We approach event production with an unwavering commitment to artistic harmony and operational excellence. Every venue is an open canvas where architectural lighting, lush floral installations, and refined tablescapes are woven into an unforgettable narrative.
              </p>
              <p className={styles.textContentLight}>
                Whether designing a multi-day wedding banquet or an intimate private soirée, we balance high-end aesthetics with flawless logistics so you can remain present for every precious moment.
              </p>
            </div>
            <div className={styles.imageBox}>
              <Image
                src="/about-approach.jpg"
                alt="1111 Decor Event Design"
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
            <span className={styles.labelGold}>INTEGRATED SYNERGY</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              Planning & Décor, Together
            </WindRevealHeading>
          </div>
          <div className={styles.cardsGridDark}>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Unified Design Vision</h3>
              <p className={styles.cardTextDark}>
                Unlike separate vendors working in silos, our in-house planners and floral designers collaborate from day one to ensure your visual aesthetic aligns perfectly with stage dimensions and guest flow.
              </p>
            </div>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Streamlined Logistics</h3>
              <p className={styles.cardTextDark}>
                Combining timeline management, vendor contracts, and decor setup eliminates miscommunication, reducing stress and budget overhead.
              </p>
            </div>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Flawless Execution</h3>
              <p className={styles.cardTextDark}>
                On event day, our master directors oversee sound checks, floral refreshes, and resort hospitality in lockstep.
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
                alt="1111 Decor Attention to Detail"
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
                True luxury resides in the details that guests feel before they even notice them. From hand-selected velvet ribbons and custom stationery weight to micro-calibrated warm pin-spotting, we curate every touchpoint with surgical precision.
              </p>
              <p className={styles.textContentLight}>
                Our team selects seasonal botanicals, custom furniture rentals, and acoustic setups tailored to your venue&apos;s unique architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Dark Theme On Event Day */}
      <section className={styles.daySectionDark}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelGold}>CALM & PRECISION</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              On Event Day
            </WindRevealHeading>
          </div>
          <div className={styles.cardsGridDark}>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Early Arrival & Set Up</h3>
              <p className={styles.cardTextDark}>
                Our production crew arrives hours ahead to construct staging, align lighting grids, and hydrate floral arches.
              </p>
            </div>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Vendor Dispatching</h3>
              <p className={styles.cardTextDark}>
                We act as the single command point for caterers, DJs, photographers, and resort hospitality staff.
              </p>
            </div>
            <div className={styles.cardDark}>
              <h3 className={styles.cardTitleGold}>Guest Care & Farewell</h3>
              <p className={styles.cardTextDark}>
                From welcoming VIPs to managing coat checks and end-of-night transport, we ensure every guest experiences royal hospitality.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link
              href="/contact/"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                backgroundColor: '#c9a96e',
                color: '#111111',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: '4px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(201, 169, 110, 0.45)',
              }}
            >
              Plan Your Event
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
