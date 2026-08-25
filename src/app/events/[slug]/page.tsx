import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { EVENT_CATEGORIES } from '@/data/events'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
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
    title: event.metaTitle,
    description: event.metaDescription,
    openGraph: {
      title: event.metaTitle,
      description: event.metaDescription,
      url: `https://1111decor.com/events/${event.slug}/`,
      images: [{ url: event.heroImage }],
    },
    alternates: {
      canonical: `https://1111decor.com/events/${event.slug}/`,
    },
  }
}

export default function EventDetailPage({ params }: Props) {
  const event = EVENT_CATEGORIES.find((cat) => cat.slug === params.slug)
  if (!event) {
    notFound()
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: event.title,
    description: event.description,
    provider: {
      '@type': 'Organization',
      name: '11:11 Decor',
      url: 'https://1111decor.com/',
    },
  }

  const ctaMap: Record<string, string> = {
    'wedding-events': 'Plan Your Wedding',
    'corporate-events': 'Plan Your Corporate Event',
    'birthday-events': 'Plan Your Birthday Event',
    'engagement-events': 'Plan Your Engagement',
    'private-events': 'Plan Your Private Event',
    'destination-events': 'Plan Your Destination Event',
  }

  const breadcrumbsData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1111decor.com/' },
      { '@type': 'ListItem', position: 2, name: 'Events', item: 'https://1111decor.com/events/' },
      { '@type': 'ListItem', position: 3, name: event.title, item: `https://1111decor.com/events/${event.slug}/` },
    ],
  }

  const eventCtaText = ctaMap[event.slug] || 'Plan Your Event'

  return (
    <div className={styles.detailContainer}>
      <JsonLd data={schemaData} />
      <JsonLd data={breadcrumbsData} />

      {/* SECTION 1: Dark Hero Banner */}
      <div className={styles.heroSection}>
        <Image src={event.heroImage} alt={event.title} fill className={styles.heroImage} priority />
        <div className={styles.heroContent}>
          <span className={styles.labelBlockGold}>11:11 DECOR OCCASION</span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff' }}>
            {event.title}
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>{event.subtitle}</p>
        </div>
      </div>

      {/* SECTION 2: Light Theme Intro Overview */}
      <section className={styles.introSectionLight}>
        <div className={styles.container}>
          <p className={styles.introTextLight}>{event.intro}</p>
        </div>
      </section>

      {/* SECTION 3: Dark Theme Planning & Management Services */}
      <section className={styles.servicesSectionDark}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelBlockGold}>EXPERT SERVICES</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              {`${event.title.split(' ')[0]} Planning Services`}
            </WindRevealHeading>
          </div>
          <div className={styles.servicesGrid}>
            {event.planningServices.map((service, idx) => (
              <div key={idx} className={styles.featureCardDark}>
                <span className={styles.featureIconGold}>✦</span>
                <span className={styles.featureTextDark}>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Light Theme Signature Decoration Options */}
      <section className={styles.decorSectionLight}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelBlockDark}>DESIGN & STYLING</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a' }}>
              Signature Decoration Options
            </WindRevealHeading>
          </div>
          <div className={styles.decorGrid}>
            {event.decorationOptions.map((decor, idx) => (
              <div key={idx} className={styles.decorCardLight}>
                <p className={styles.decorTextLight}>{decor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Dark Theme On-Site Event Management */}
      <section className={styles.managementSectionDark}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelBlockGold}>ON-SITE EXECUTION</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              What We Manage On Event Day
            </WindRevealHeading>
          </div>
          <div className={styles.servicesGrid}>
            {event.eventManagement.map((item, idx) => (
              <div key={idx} className={styles.featureCardDark}>
                <span className={styles.featureIconGold}>✔</span>
                <span className={styles.featureTextDark}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Light Theme What We Handle */}
      {event.whatWeHandle && event.whatWeHandle.length > 0 && (
        <section className={styles.decorSectionLight} style={{ borderTop: '1px solid rgba(201, 169, 110, 0.2)' }}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.labelBlockDark}>SCOPE OF WORK</span>
              <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a' }}>
                What We Handle
              </WindRevealHeading>
            </div>
            <div className={styles.servicesGrid}>
              {event.whatWeHandle.map((handleItem, idx) => (
                <div
                  key={idx}
                  className={styles.decorCardLight}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
                >
                  <span style={{ color: '#c9a96e', fontSize: '1.2rem', fontWeight: 700 }}>✦</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#2c2620', fontWeight: 500 }}>
                    {handleItem}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: Dark Theme Why Choose 11:11 Decor */}
      {event.whyChooseUs && event.whyChooseUs.length > 0 && (
        <section className={styles.servicesSectionDark} style={{ borderTop: '1px solid rgba(201, 169, 110, 0.2)' }}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.labelBlockGold}>WHY 11:11 DECOR</span>
              <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
                Why Choose 11:11 Decor
              </WindRevealHeading>
            </div>
            <div className={styles.servicesGrid}>
              {event.whyChooseUs.map((reason, idx) => (
                <div key={idx} className={styles.featureCardDark}>
                  <span className={styles.featureIconGold}>★</span>
                  <span className={styles.featureTextDark}>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: Light Theme 4-Step Process Workflow */}
      <section className={styles.processSectionLight}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelBlockDark}>OUR WORKFLOW</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a' }}>
              Our Planning Process
            </WindRevealHeading>
          </div>
          <div className={styles.processGridLight}>
            {event.processSteps.map((step, idx) => (
              <div key={idx} className={styles.processCardLight}>
                <div className={styles.processStepNumGold}>0{idx + 1}</div>
                <h3 className={styles.processTitleLight}>{step.title}</h3>
                <p className={styles.processDescLight}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Dark Theme FAQs */}
      <section className={styles.faqSectionDark}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelBlockGold}>COMMON QUESTIONS</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              Frequently Asked Questions
            </WindRevealHeading>
          </div>
          <div className={styles.faqGridDark}>
            {event.faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqCardDark}>
                <h3 className={styles.faqQuestionGold}>{faq.question}</h3>
                <p className={styles.faqAnswerDark}>{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Event Specific CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link
              href="/contact/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.75rem',
                backgroundColor: '#c9a96e',
                color: '#111111',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                textDecoration: 'none',
                boxShadow: '0 6px 22px rgba(201, 169, 110, 0.45)',
                transition: 'all 0.3s ease',
              }}
            >
              <span>{eventCtaText}</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
