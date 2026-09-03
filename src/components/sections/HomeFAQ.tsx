'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

const HOMEPAGE_FAQS = [
  {
    q: 'What types of events does 11:11 Decor manage?',
    a: 'We manage and decorate weddings, corporate galas, milestone birthdays, engagements, private dinners, and destination celebrations across Uttarakhand.',
  },
  {
    q: 'Do you provide complete event planning, or only decoration?',
    a: 'We provide both. You can book us for end-to-end event planning and management, decoration services only, or a fully integrated package covering both.',
  },
  {
    q: 'Can we hire 11:11 Decor for decoration only?',
    a: 'Yes. If your venue, catering, and timeline are already set, our styling team can focus entirely on stage design, floral architecture, lighting, and ambient tablescapes.',
  },
  {
    q: 'Can we customize our event package?',
    a: 'Absolutely. Every event is unique. Our packages (Essential, Signature, Bespoke) serve as curated frameworks which we tailor to your specific venue, guest count, and creative vision.',
  },
  {
    q: 'How far in advance should we book?',
    a: 'We recommend booking 4 to 8 months in advance for major weddings and corporate galas to secure premier dates, design custom fabrication sets, and reserve seasonal botanicals.',
  },
  {
    q: 'Do you manage corporate events as well as weddings?',
    a: 'Yes. We regularly execute corporate annual galas, executive summits, product launches, and award ceremonies with surgical stagecraft and precise audio-visual coordination.',
  },
  {
    q: 'Do you work outside Dehradun / Uttarakhand?',
    a: 'While our studio is based in Dehradun, we frequently produce destination weddings and corporate retreats across Mussoorie, Rishikesh, Haridwar, Jim Corbett, and beyond.',
  },
  {
    q: 'How do we request a quote?',
    a: 'You can submit our quick inquiry form on the Contact page or message us directly on WhatsApp (+91 74668 54475) with your event date, estimated guest count, and preferred venue.',
  },
]

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq-section"
      style={{
        backgroundColor: '#121212',
        color: '#f5f0e8',
        paddingBlock: 'clamp(5rem, 8vw, 7.5rem)',
        borderTop: '1px solid rgba(201, 169, 110, 0.15)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '960px', marginInline: 'auto', paddingInline: '1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              letterSpacing: '0.22em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#c9a96e',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            COMMON QUESTIONS
          </span>
          <div style={{ maxWidth: '800px', marginInline: 'auto', marginBottom: '1.25rem' }}>
            <WindRevealHeading
              as="h2"
              className="heading-lg"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                color: '#ffffff',
                lineHeight: 1.2,
                fontWeight: 500,
                letterSpacing: '0.03em',
              }}
            >
              Frequently Asked Questions
            </WindRevealHeading>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: '#b0a89d',
              maxWidth: '600px',
              marginInline: 'auto',
              lineHeight: 1.65,
            }}
          >
            Everything you need to know about our event planning, styling, and management process.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {HOMEPAGE_FAQS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: isOpen ? 'rgba(30, 30, 30, 0.95)' : 'rgba(22, 22, 22, 0.75)',
                  border: isOpen ? '1px solid rgba(201, 169, 110, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.35rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                  }}
                >
                  <span>{item.q}</span>
                  <span
                    style={{
                      color: '#c9a96e',
                      fontSize: '1.3rem',
                      fontWeight: 400,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? '240px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.35s ease',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: '#b0a89d',
                      lineHeight: 1.7,
                      margin: 0,
                      padding: '0 1.75rem 1.5rem',
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Have more questions CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#8c8278', marginBottom: '1rem' }}>
            Have a question specific to your celebration?
          </p>
          <Link
            href="/contact/"
            style={{
              color: '#c9a96e',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '1px solid #c9a96e',
              paddingBottom: '2px',
            }}
          >
            Speak With An Event Director &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
