'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioProject } from '@/data/portfolio'
import { usePortfolioProject } from '@/hooks/usePortfolioProject'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { generatePortfolioSchema } from '@/lib/schemaGenerators'
import { resolveImageUrl } from '@/lib/image-url'
import styles from '@/app/portfolio/[slug]/portfolio-detail.module.css'

interface Props {
  slug: string
  initialProject?: PortfolioProject | null
}

export function DynamicPortfolioClient({ slug, initialProject }: Props) {
  const { project, loading, error } = usePortfolioProject(slug, initialProject)

  // Client-side JSON-LD injection for rich Google Schema
  useEffect(() => {
    if (!project || typeof document === 'undefined') return

    const schemaData = generatePortfolioSchema({
      title: project.title,
      description: project.summary,
      slug: project.slug,
      heroImage: project.heroImage,
      location: project.location,
      category: project.category,
    })

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = `portfolio-schema-${project.slug}`
    script.text = JSON.stringify(schemaData)
    document.head.appendChild(script)

    return () => {
      const existing = document.getElementById(`portfolio-schema-${project.slug}`)
      if (existing) {
        existing.remove()
      }
    }
  }, [project])

  if (loading) {
    return (
      <div style={{ paddingTop: '140px', minHeight: '80vh', textAlign: 'center', backgroundColor: '#0f0e0c', color: '#ede5d8' }}>
        <p style={{ color: '#c9a96e', fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>Curating production showcase...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div style={{ paddingTop: '140px', minHeight: '80vh', textAlign: 'center', backgroundColor: '#0f0e0c', color: '#ffffff', padding: '0 1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#c9a96e', marginBottom: '1rem' }}>
          Production Case Study Not Found
        </h1>
        <p style={{ color: '#a8a29e', marginBottom: '2.5rem', fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          This event showcase may be private, in draft status, or undergoing curation by our creative studio.
        </p>
        <Link
          href="/portfolio/"
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
          Return to Portfolio Archive
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.detailContainer}>
      {/* SECTION 1: Dark Hero Banner */}
      <div className={styles.heroSection}>
        <Image src={resolveImageUrl(project.heroImage)} alt={project.title} fill unoptimized className={styles.heroImage} priority />
        <div className={styles.heroContent}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600 }}>
            {project.category} CASE STUDY
          </span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff', marginTop: '0.5rem' }}>
            {project.title}
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>{project.subtitle}</p>
        </div>
      </div>

      {/* Meta Specs Bar */}
      <div className={styles.metaBarDark}>
        <div className={styles.container}>
          <div className={styles.metaGrid}>
            <div>
              <span className={styles.metaLabelGold}>LOCATION</span>
              <span className={styles.metaValueWhite}>{project.location}</span>
            </div>
            <div>
              <span className={styles.metaLabelGold}>VENUE</span>
              <span className={styles.metaValueWhite}>{project.venue}</span>
            </div>
            <div>
              <span className={styles.metaLabelGold}>GUESTS</span>
              <span className={styles.metaValueWhite}>{project.guestCount}+ Attendees</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Light Theme Overview & Planning Details */}
      <section className={styles.overviewSectionLight}>
        <div className={styles.container}>
          <p className={styles.summaryTextLight}>{project.summary}</p>

          <div className={styles.splitGrid}>
            <div className={styles.boxLight}>
              <h2 className={styles.boxTitleDark}>Planning & Management</h2>
              <ul className={styles.featureListLight}>
                {project.planningDetails?.map((detail, idx) => (
                  <li key={idx} className={styles.featureItemLight}>
                    <span className={styles.checkIconGold}>✔</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.boxLight}>
              <h2 className={styles.boxTitleDark}>Design & Floral Highlights</h2>
              <ul className={styles.featureListLight}>
                {project.decorHighlights?.map((highlight, idx) => (
                  <li key={idx} className={styles.featureItemLight}>
                    <span className={styles.checkIconGold}>✦</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Dark Theme Visual Gallery & Execution Notes */}
      <section className={styles.gallerySectionDark}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
              VISUAL STAGING
            </span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              Project Gallery
            </WindRevealHeading>
          </div>

          <div className={styles.galleryGrid}>
            {project.galleryImages?.map((src, idx) => (
              <div key={idx} className={styles.galleryCard}>
                <Image
                  src={resolveImageUrl(src)}
                  alt={`${project.title} Gallery Image ${idx + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {project.executionNotes && (
            <div className={styles.executionBoxDark}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#c9a96e', marginBottom: '0.85rem' }}>
                Execution Strategy & On-Site Performance
              </h3>
              <p className={styles.executionTextDark}>{project.executionNotes}</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link
              href="/portfolio/"
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
              &larr; Back to Portfolio Archive
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
