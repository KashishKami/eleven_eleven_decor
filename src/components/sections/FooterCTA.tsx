'use client'

import React from 'react'
import Link from 'next/link'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { CONTACT_INFO } from '@/data/contact'

export interface FooterCTAProps {
  eyebrow?: string
  headline?: string
  body?: string
}

export function FooterCTA({
  eyebrow = 'START THE CONVERSATION',
  headline = "Let's create something unforgettable.",
  body = "Tell us about your event — date, guest count, venue, and vision. We'll follow up with availability and a custom quote.",
}: FooterCTAProps = {}) {
  return (
    <section
      id="footer-cta"
      style={{
        backgroundColor: '#0f0f0f',
        backgroundImage:
          'radial-gradient(ellipse at 50% 30%, rgba(201, 169, 110, 0.18) 0%, rgba(15, 15, 15, 1) 75%)',
        borderTop: '1px solid rgba(201, 169, 110, 0.25)',
        padding: 'clamp(5.5rem, 8vw, 8rem) 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <span
          className="label"
          style={{
            display: 'inline-block',
            color: '#c9a96e',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </span>

        <div style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
          <WindRevealHeading
            as="h2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              color: '#ffffff',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '0.02em',
            }}
          >
            {headline}
          </WindRevealHeading>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.15rem',
            lineHeight: 1.75,
            color: '#d0c8b8',
            maxWidth: '680px',
            margin: '0 auto 2.75rem',
          }}
        >
          {body}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/contact/"
            style={{
              display: 'inline-block',
              padding: '1.1rem 2.75rem',
              backgroundColor: '#c9a96e',
              color: '#111111',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              boxShadow: '0 8px 25px rgba(201, 169, 110, 0.4)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Plan Your Event &rarr;
          </Link>

          <a
            href={CONTACT_INFO.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1.1rem 2.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}
          >
            <span>WhatsApp Us</span>
            <span>↗</span>
          </a>
        </div>

        {/* Check our work on Instagram */}
        <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#a0988c' }}>
            Check our work at
          </span>
          <a
            href={CONTACT_INFO.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile @_11.11decor_"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#c9a96e',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s ease',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            <span>@_11.11decor_</span>
          </a>
        </div>
      </div>
    </section>
  )
}
