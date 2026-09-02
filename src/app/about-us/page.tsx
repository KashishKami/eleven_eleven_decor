import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './about-us.module.css'

export const metadata: Metadata = {
  title: 'About Us | 11:11 Decor',
  description:
    '11:11 Decor is an event management and décor studio designing weddings, celebrations, and corporate events with intention and detail.',
  openGraph: {
    title: 'About Us | 11:11 Decor',
    description:
      '11:11 Decor is an event management and décor studio designing weddings, celebrations, and corporate events with intention and detail.',
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
      '11:11 Decor is an event management and décor studio based in Dehradun, working with clients across India.',
  }

  return (
    <div className={styles.aboutContainer}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Hero */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <span className={styles.labelGold}>About 11:11 Decor</span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff' }}>
            Creating Experiences, Not Just Events
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>
            11:11 Decor is an event management and d&eacute;cor studio based in Dehradun, working with clients across India. We handle d&eacute;cor, on-site coordination, catering, vendor booking, and photography coordination for weddings, corporate events, and personal celebrations, either as a full end-to-end service or as individual pieces of a larger event you&apos;re managing yourself. Our focus stays on one thing: making sure the day feels the way you imagined it, without you having to manage the moving parts yourself.
          </p>
        </div>
      </section>

      {/* SECTION 2: Philosophy — Our Approach */}
      <section className={styles.approachSectionLight}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div>
              <span className={styles.labelDark}>PHILOSOPHY</span>
              <h2 className="heading-lg" style={{ color: '#1a1a1a', marginBlock: '0.5rem 1.25rem' }}>
                Our Approach
              </h2>
              <p className={styles.textContentLight} style={{ marginBottom: '1.25rem' }}>
                Every event begins with a conversation, not a template. We start by understanding the occasion, the people it&apos;s for, and the feeling you want guests to walk away with.
              </p>
              <p className={styles.textContentLight} style={{ marginBottom: '1.25rem' }}>
                That shapes the concept, the palette, the layout, the pacing of the day, before a single vendor is booked.
              </p>
              <p className={styles.textContentLight}>
                We&apos;ve found that the best events aren&apos;t the ones with the most elements, they&apos;re the ones where every choice, from the seating layout to the food service timing, actually supports the same idea. That&apos;s the standard we hold ourselves to on every project we take on.
              </p>
            </div>
            <div className={styles.imageBox}>
              <Image
                src="/images/about/about-page-1.jpg"
                alt="11:11 Decor Event Design"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: What We Handle */}
      <section className={styles.handleSectionDark}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelGold}>Full-Service Support</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#ffffff' }}>
              One Team, Every Moving Part
            </WindRevealHeading>
          </div>
          <div className={styles.handleWrapper}>
            <p className={styles.handleText}>
              From the first planning conversation to the final guest walking out, we manage the pieces that usually cause the most stress when handled separately. D&eacute;cor and styling are designed around your venue and theme. Catering is planned and coordinated so food service runs on time without disrupting the flow of the evening. Vendor booking, florists, lighting teams, entertainment, is handled on your behalf, so you&apos;re not chasing quotes and confirmations across a dozen conversations. And on the day itself, photography and videography coordination ensures key moments are captured without guests feeling like they&apos;re constantly being directed for a shot.
            </p>
            <p className={styles.handleText}>
              Bringing all of this under one team means fewer handoffs, fewer things falling through the cracks, and a much smoother experience for you as the host.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Integrated Process — Planning & Décor, Together (Light Theme) */}
      <section className={styles.togetherSectionLight}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelDark}>Integrated Process</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a' }}>
              Planning &amp; D&eacute;cor, Together
            </WindRevealHeading>
          </div>
          <div className={styles.cardsGridLight}>
            <div className={styles.cardLight}>
              <h3 className={styles.cardTitleDark}>Connected Thinking</h3>
              <p className={styles.cardTextLight}>
                D&eacute;cor, catering, and coordination are handled as one connected process rather than separate services stitched together at the last minute.
              </p>
            </div>
            <div className={styles.cardLight}>
              <h3 className={styles.cardTitleDark}>Informed Layouts</h3>
              <p className={styles.cardTextLight}>
                The design concept informs the floor plan, and the floor plan informs vendor and catering logistics, so nothing is decided in isolation.
              </p>
            </div>
            <div className={styles.cardLight}>
              <h3 className={styles.cardTitleDark}>Harmonious Execution</h3>
              <p className={styles.cardTextLight}>
                Every element, from florals to photography timing, is built to work together on the day rather than assembled under pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Craftsmanship — Attention to Detail (Dark Theme) */}
      <section className={styles.detailSectionDark}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div className={styles.imageBox}>
              <Image
                src="/images/about/about-page-2.jpg"
                alt="11:11 Decor Attention to Detail"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />
            </div>
            <div>
              <span className={styles.labelGold}>CRAFTSMANSHIP</span>
              <h2 className="heading-lg" style={{ color: '#ffffff', marginBlock: '0.5rem 1.25rem' }}>
                Attention to Detail
              </h2>
              <p className={styles.textContentDark} style={{ marginBottom: '1.25rem' }}>
                The small decisions, spacing between tables, the order of the evening, where the light falls at golden hour, are treated with the same care as the large ones.
              </p>
              <p className={styles.textContentDark}>
                It&apos;s these details that guests remember, even if they can&apos;t always name why. A well-timed course during dinner, a backdrop that photographs beautifully without needing adjustment, an entrance that doesn&apos;t feel rushed, these are rarely accidents. They come from planning that accounts for how an event actually unfolds, not just how it looks in a mood board.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: On Event Day (Light Theme) */}
      <section className={styles.daySectionLight}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.labelDark}>Peace of Mind</span>
            <WindRevealHeading as="h2" className="heading-lg" style={{ color: '#1a1a1a' }}>
              On Event Day
            </WindRevealHeading>
            <p className={styles.daySubtitleLight}>
              Our team manages d&eacute;cor setup, catering service, vendor coordination, and photography timing on-site, so you&apos;re free to be a guest at your own event rather than its stage manager. You shouldn&apos;t be checking on the caterer or directing the photographer during your own celebration, and with us on-site, you won&apos;t need to.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Link
                href="/contact/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1px solid rgba(201, 169, 110, 0.4)',
                  boxShadow: '0 8px 24px rgba(26, 26, 26, 0.18)',
                }}
              >
                <span>Plan Your Event</span>
                <span style={{ color: '#c9a96e' }}>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Closing CTA */}
      <FooterCTA
        eyebrow="Start the Conversation"
        headline="Let's create something unforgettable"
        body="Tell us about your event, date, guest count, venue, and vision. Based in Dehradun and working with clients nationwide, we'll follow up with availability and a custom quote."
      />
    </div>
  )
}
