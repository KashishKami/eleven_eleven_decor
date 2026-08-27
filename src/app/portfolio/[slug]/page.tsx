import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import pageVisibility from '../../../../php-admin/data/page-visibility.json'
import { getAllPortfolioProjectsServer, getPortfolioProjectBySlugServer } from '@/lib/server-portfolio'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './portfolio-detail.module.css'

interface Props {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  const projects = getAllPortfolioProjectsServer()
  if (projects.length === 0) {
    return [{ slug: '__empty__' }]
  }
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (params.slug === '__empty__') {
    return { title: 'Project Not Found | 1111 Decor' }
  }
  const project = getPortfolioProjectBySlugServer(params.slug)
  if (!project || !pageVisibility.portfolio) {
    return { title: 'Project Not Found | 1111 Decor' }
  }

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `https://elevenelevendecor.com/portfolio/${project.slug}/`,
      images: [{ url: project.heroImage }],
    },
    alternates: {
      canonical: `https://elevenelevendecor.com/portfolio/${project.slug}/`,
    },
  }
}

export default function PortfolioDetailPage({ params }: Props) {
  if (!pageVisibility.portfolio || params.slug === '__empty__') {
    notFound()
  }

  const project = getPortfolioProjectBySlugServer(params.slug)
  if (!project) {
    notFound()
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    provider: {
      '@type': 'Organization',
      name: '11:11 Decor',
      url: 'https://1111decor.com/',
    },
    locationCreated: project.location,
  }

  return (
    <div className={styles.detailContainer}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Dark Hero Banner */}
      <div className={styles.heroSection}>
        <Image src={project.heroImage} alt={project.title} fill className={styles.heroImage} priority />
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
                {project.planningDetails.map((detail, idx) => (
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
                {project.decorHighlights.map((highlight, idx) => (
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
            {project.galleryImages.map((src, idx) => (
              <div key={idx} className={styles.galleryCard}>
                <Image
                  src={src}
                  alt={`${project.title} Gallery Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          <div className={styles.executionBoxDark}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#c9a96e', marginBottom: '0.85rem' }}>
              Execution Strategy & On-Site Performance
            </h3>
            <p className={styles.executionTextDark}>{project.executionNotes}</p>
          </div>

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
