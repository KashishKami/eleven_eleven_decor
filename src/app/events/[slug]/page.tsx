import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { EVENT_CATEGORIES } from '@/data/events'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import JsonLd from '@/components/seo/JsonLd'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerators'
import styles from './event-detail.module.css'

interface Props {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return EVENT_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  const event = EVENT_CATEGORIES.find((cat) => cat.slug === params.slug)
  if (!event) {
    return { title: 'Event Not Found | 11:11 Decor' }
  }

  return {
    title: `${event.title} | 11:11 Decor`,
    description: event.description,
    openGraph: {
      title: `${event.title} | 11:11 Decor`,
      description: event.description,
      url: `https://1111decor.com/events/${event.slug}/`,
      images: [
        {
          url: event.heroImage,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    alternates: {
      canonical: `https://1111decor.com/events/${event.slug}/`,
    },
  }
}

function renderLinkedText(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    const label = match[1]
    const href = match[2]
    if (label && href) {
      parts.push(
        <Link
          key={match.index}
          href={href}
          style={{
            color: '#c9a96e',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: 600,
            transition: 'color 0.2s ease',
          }}
        >
          {label}
        </Link>
      )
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export default function EventDetailPage({ params }: Props) {
  const event = EVENT_CATEGORIES.find((cat) => cat.slug === params.slug)
  if (!event) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Events', url: '/events/' },
    { name: event.title, url: `/events/${event.slug}/` },
  ]

  return (
    <main className={styles.detailContainer}>
      <JsonLd
        data={generateServiceSchema({
          name: event.title,
          description: event.description,
          slug: `events/${event.slug}`,
          image: event.heroImage,
        })}
      />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <span className={styles.label}>11:11 DECOR OCCASION</span>
          <WindRevealHeading as="h1" className={styles.heroHeading}>
            {event.title}
          </WindRevealHeading>
          <p className={styles.heroIntro}>{event.intro}</p>
        </div>
      </section>

      {/* Hero Banner Image */}
      <section className={styles.bannerSection}>
        <div className="container">
          <div className={styles.bannerWrapper}>
            <Image
              src={event.heroImage}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={styles.bannerImage}
              style={{ objectPosition: event.heroImagePosition || 'center center' }}
            />
          </div>
        </div>
      </section>

      {/* Editorial Story Section */}
      {event.editorialStory && event.editorialStory.length > 0 && (
        <section className={styles.editorialSection}>
          <div className="container">
            <div className={styles.editorialWrapper}>
              <span className={styles.label}>11:11 DECOR OCCASION OVERVIEW</span>
              <h2 className={styles.editorialHeading}>
                The Art of {event.title}
              </h2>
              <div className={styles.editorialBody}>
                {event.editorialStory.map((paragraph, idx) => (
                  <p key={idx} className={styles.editorialParagraph}>
                    {renderLinkedText(paragraph)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Two Column Structured Content Grid Matching PDF Section Headings */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* 1. Event Planning Services (Row 1 Left) */}
            <div className={styles.infoBlock}>
              <h2 className={styles.sectionHeading}>Event Planning Services</h2>
              <ul className={styles.provideList}>
                {event.planningServices.map((item, idx) => (
                  <li key={`plan-${idx}`} className={styles.provideItem}>
                    <span className={styles.checkIcon}>✦</span>
                    <span>{renderLinkedText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Event Management (Row 1 Right) */}
            <div className={styles.infoBlock}>
              <h2 className={styles.sectionHeading}>Event Management</h2>
              <ul className={styles.provideList}>
                {event.eventManagement.map((item, idx) => (
                  <li key={`mgmt-${idx}`} className={styles.provideItem}>
                    <span className={styles.checkIcon} style={{ color: '#c9a96e' }}>✔</span>
                    <span>{renderLinkedText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Decoration Options (Row 2 Left) */}
            <div className={styles.infoBlock}>
              <h2 className={styles.sectionHeading}>Decoration Options</h2>
              <ul className={styles.provideList}>
                {event.decorationOptions.map((item, idx) => (
                  <li key={`decor-${idx}`} className={styles.provideItem}>
                    <span className={styles.checkIcon}>✦</span>
                    <span>{renderLinkedText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. What We Handle (Row 2 Right) */}
            <div className={styles.infoBlock}>
              <h2 className={styles.sectionHeading}>What We Handle</h2>
              <ul className={styles.provideList}>
                {event.whatWeHandle.map((item, idx) => (
                  <li key={`handle-${idx}`} className={styles.provideItem}>
                    <span className={styles.checkIcon}>✦</span>
                    <span>{renderLinkedText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Why Choose 11:11 Decor (Row 3 Centered) */}
            <div className={`${styles.infoBlock} ${styles.whyChooseCard}`}>
              <h2 className={styles.sectionHeading}>Why Choose 11:11 Decor</h2>
              {event.whyChooseUs.map((reason, idx) => (
                <p key={`why-${idx}`} className={styles.infoText}>
                  {renderLinkedText(reason)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FAQs Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqHeader}>
            <span className={styles.label}>OCCASION FAQs</span>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {event.faqs.map((faq, idx) => (
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
            <h2 className={styles.ctaTitle}>Ready to plan your {event.title}?</h2>
            <p className={styles.ctaText}>
              Reach out today to discuss your vision, check date availability, and receive a customized quote.
            </p>
            <Link href="/contact/" className={styles.ctaButton}>
              Plan Your Event →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
