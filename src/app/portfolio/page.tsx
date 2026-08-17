'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PORTFOLIO_PROJECTS } from '@/data/portfolio'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './portfolio.module.css'

const CATEGORY_PILLS = ['All', 'Weddings', 'Corporate', 'Birthdays', 'Engagements', 'Private', 'Destination']

export default function PortfolioHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredProjects =
    selectedCategory === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '11:11 Decor Portfolio Showcase',
    itemListElement: PORTFOLIO_PROJECTS.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.title,
      url: `https://1111decor.com/portfolio/${p.slug}/`,
    })),
  }

  return (
    <div className={styles.portfolioContainer}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Dark Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.25rem' }}>
            FEATURED PRODUCTIONS
          </span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff' }}>
            Our Work
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>
            Immerse yourself in our portfolio of royal weddings, corporate galas, milestone birthday soirées, and destination transformations across India.
          </p>
        </div>
      </section>

      {/* SECTION 2: Light Theme Filter Pills & Cards Grid */}
      <section className={styles.gridSectionLight}>
        <div className={styles.container}>
          {/* Filter Pills */}
          <div className={styles.filtersRow}>
            {CATEGORY_PILLS.map((pill) => (
              <button
                key={pill}
                onClick={() => setSelectedCategory(pill)}
                className={`${styles.filterPill} ${selectedCategory === pill ? styles.filterPillActive : ''}`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className={styles.cardsGrid}>
            {filteredProjects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}/`} className={styles.portfolioCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div>
                    <span className={styles.categoryTag}>{project.category} • {project.location}</span>
                    <h2 className={styles.cardTitle}>{project.title}</h2>
                    <p className={styles.cardDesc}>{project.summary}</p>
                  </div>
                  <span className={styles.cardLink}>View Case Study &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
