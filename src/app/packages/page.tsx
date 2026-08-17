import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PACKAGES } from '@/data/packages'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './packages.module.css'

export const metadata: Metadata = {
  title: 'Packages & Service Tiers | 1111 Decor',
  description:
    'Explore luxury event planning, décor staging, and master management packages tailored for weddings, corporate galas, and private celebrations.',
  openGraph: {
    title: 'Packages & Service Tiers | 1111 Decor',
    description:
      'Explore luxury event planning, décor staging, and master management packages tailored for weddings, corporate galas, and private celebrations.',
    url: 'https://1111decor.com/packages/',
  },
  alternates: {
    canonical: 'https://1111decor.com/packages/',
  },
}

export default function PackagesPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '11:11 Decor Event Packages',
    itemListElement: PACKAGES.map((pkg, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: pkg.name,
      description: pkg.description,
    })),
  }

  return (
    <div className={styles.packagesContainer}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Dark Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600 }}>
            CURATED EXPERIENCES
          </span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff', marginTop: '0.5rem' }}>
            Planning Built Around Your Event
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>
            Whether seeking expert day-of coordination or a multi-day turnkey palace wedding, our transparent service tiers deliver unmatched elegance and peace of mind.
          </p>
        </div>
      </section>

      {/* SECTION 2: Light Theme Packages Cards Grid */}
      <section className={styles.gridSectionLight}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelDark}>SERVICE TIERS</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a' }}>
              Choose Your Package
            </WindRevealHeading>
          </div>

          <div className={styles.tiersGrid}>
            {PACKAGES.map((tier) => (
              <div
                key={tier.id}
                className={`${styles.tierCard} ${tier.popular ? styles.tierCardPopular : ''}`}
              >
                {tier.popular && <span className={styles.popularBadge}>Most Requested</span>}

                <div>
                  <h2 className={styles.tierName}>{tier.name}</h2>
                  <p className={styles.tierTagline}>{tier.tagline}</p>

                  <div className={styles.priceBox}>
                    <span className={styles.priceLabel}>{tier.priceLabel}</span>
                  </div>

                  <p className={styles.tierDesc}>{tier.description}</p>

                  <ul className={styles.featureList}>
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <span className={styles.checkIcon}>✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tier.ctaHref}
                  className={`${styles.ctaButton} ${tier.popular ? styles.ctaButtonPopular : ''}`}
                >
                  {tier.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
