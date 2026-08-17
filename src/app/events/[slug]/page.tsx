import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
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

  return (
    <div className={styles.detailContainer}>
      <JsonLd data={schemaData} />

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

      {/* SECTION 6: Light Theme 4-Step Process Workflow */}
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

      {/* SECTION 7: Dark Theme FAQs */}
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
        </div>
      </section>

      <FooterCTA />
    </div>
  )
}
