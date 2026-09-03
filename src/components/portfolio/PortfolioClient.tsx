'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioProject } from '@/data/portfolio'
import { usePortfolioProjects } from '@/hooks/usePortfolioProjects'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { resolveImageUrl } from '@/lib/image-url'
import styles from '@/app/portfolio/portfolio.module.css'

const CATEGORY_PILLS = ['All', 'Weddings', 'Corporate', 'Birthdays', 'Engagements', 'Private', 'Destination']

interface PortfolioClientProps {
  initialProjects?: PortfolioProject[]
}

export function PortfolioClient({ initialProjects = [] }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const { projects } = usePortfolioProjects(initialProjects, selectedCategory)

  return (
    <div className={styles.portfolioContainer}>
      {/* SECTION 1: Dark Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              letterSpacing: '0.22em',
              color: '#c9a96e',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
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

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className={styles.emptyState}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#1a1815', marginBottom: '0.75rem' }}>
                Curating Our Latest Showcases
              </p>
              <p style={{ fontSize: '0.95rem', color: '#7a7369', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
                Our latest event case studies and photography are currently being curated by the 11:11 Decor creative studio. Check back shortly.
              </p>
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {projects.map((project) => (
                <Link key={project.slug} href={`/portfolio/${project.slug}/`} className={styles.portfolioCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={resolveImageUrl(project.heroImage)}
                      alt={project.title}
                      fill
                      unoptimized
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
          )}
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
