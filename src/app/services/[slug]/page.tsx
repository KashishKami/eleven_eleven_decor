import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES_DATA } from '@/data/services'
import { PORTFOLIO_PROJECTS } from '@/data/portfolio'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { WorkProcess } from '@/components/sections/WorkProcess'
import JsonLd from '@/components/seo/JsonLd'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerators'
import styles from './service-detail.module.css'

interface Props {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug)
  if (!service) {
    return {
      title: 'Service Not Found | 1111 Decor',
    }
  }

  return {
    title: `${service.title} | 1111 Decor`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | 1111 Decor`,
      description: service.shortDescription,
      url: `https://1111decor.com/services/${service.slug}/`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    alternates: {
      canonical: `https://1111decor.com/services/${service.slug}/`,
    },
  }
}

export default function ServiceDetailPage({ params }: Props) {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' },
    { name: service.title, url: `/services/${service.slug}/` },
  ]

  const featuredPortfolio = PORTFOLIO_PROJECTS.slice(0, 3)

  return (
    <main className={styles.detailContainer}>
      <JsonLd
        data={generateServiceSchema({
          name: service.title,
          description: service.shortDescription,
          slug: service.slug,
          image: service.image,
        })}
      />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <span className={styles.label}>11:11 DECOR EXPERTISE</span>
          <WindRevealHeading as="h1" className={styles.heroHeading}>
            {service.heroH1}
          </WindRevealHeading>
          <p className={styles.heroIntro}>{service.intro}</p>
        </div>
      </section>

      {/* Hero Banner Image */}
      <section className={styles.bannerSection}>
        <div className="container">
          <div className={styles.bannerWrapper}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={styles.bannerImage}
            />
          </div>
        </div>
      </section>

      {/* Two Column Layout: What We Provide & Why Choose/Expect */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Left Column: What We Provide */}
            <div className={styles.provideBox} data-testid="what-we-provide">
              <h2 className={styles.sectionHeading}>What We Provide</h2>
              <ul className={styles.provideList}>
                {service.whatWeProvide.map((item, idx) => (
                  <li key={idx} className={styles.provideItem}>
                    <span className={styles.checkIcon}>✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Why Choose & What To Expect */}
            <div className={styles.infoBox} data-testid="what-you-can-expect">
              <div className={styles.infoBlock}>
                <h3 className={styles.subHeading}>Why Choose 11:11 Decor</h3>
                <p className={styles.infoText}>{service.whyChooseUs}</p>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.subHeading}>What You Can Expect</h3>
                <p className={styles.infoText}>{service.whatYouCanExpect}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reused 4-Step Process Block */}
      <WorkProcess />

      {/* Related Services */}
      <section className={styles.relatedSection}>
        <div className="container">
          <h3 className={styles.relatedHeading}>Related Services</h3>
          <div className={styles.relatedGrid}>
            {service.relatedServices.map((rel) => (
              <Link key={rel.slug} href={`/services/${rel.slug}/`} className={styles.relatedChip}>
                <span>{rel.title}</span>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Portfolio Section (PDF Section 5 Requirement) */}
      <section style={{ padding: '80px 0', backgroundColor: '#161616', borderTop: '1px solid rgba(201, 169, 110, 0.15)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className={styles.label}>FEATURED CASE STUDIES</span>
            <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#ffffff', margin: 0 }}>
              Recent Work & Staging
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '36px' }}>
            {featuredPortfolio.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}/`}
                style={{
                  backgroundColor: '#1f1f1f',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      color: '#c9a96e',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#ffffff', margin: '0 0 8px 0' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#a09990', lineHeight: 1.5, margin: 0 }}>
                      {project.summary}
                    </p>
                  </div>
                  <span style={{ marginTop: '16px', color: '#c9a96e', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                    View Case Study &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/portfolio/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#c9a96e',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                textDecoration: 'none',
              }}
            >
              <span>Explore All Case Studies</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={styles.faqSection} data-testid="service-faqs">
        <div className="container">
          <div className={styles.faqHeader}>
            <span className={styles.label}>SERVICE FAQs</span>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {service.faqs.map((faq, idx) => (
              <details key={idx} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{faq.question}</span>
                  <span className={styles.faqPlus}>+</span>
                </summary>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className={styles.ctaBannerSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to plan your {service.title}?</h2>
            <p className={styles.ctaText}>
              Reach out today to discuss your vision, check date availability, and receive a customized quote.
            </p>
            <Link href="/contact/" className={styles.ctaButton} data-testid="service-cta">
              {service.ctaText} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
