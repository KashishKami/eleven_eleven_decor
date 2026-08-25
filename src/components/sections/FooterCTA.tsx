'use client'

import React from 'react'
import Link from 'next/link'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { CONTACT_INFO } from '@/data/contact'

export function FooterCTA() {
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
          START THE CONVERSATION
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
            Let&apos;s create something unforgettable.
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
          Tell us about your event — date, guest count, venue, and vision. We&apos;ll follow up with availability and a custom quote.
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
      </div>
    </section>
  )
}
