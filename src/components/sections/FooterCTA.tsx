'use client'

import React from 'react'
import Link from 'next/link'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function FooterCTA() {
  return (
    <section
      id="footer-cta"
      style={{
        backgroundColor: '#121212',
        backgroundImage:
          'radial-gradient(ellipse at 50% 30%, rgba(201, 169, 110, 0.16) 0%, rgba(18, 18, 18, 1) 75%)',
        borderTop: '1px solid rgba(201, 169, 110, 0.25)',
        padding: '7rem 1.5rem',
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
          RESERVE YOUR CELEBRATION
        </span>

        <div style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
          <WindRevealHeading
            as="h2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              color: '#f5f0e8',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '0.02em',
            }}
          >
            Unforgettable Decor & Staging For Any Occasion
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
          Let our master creators transform your next wedding, milestone celebration, or executive gala into a bespoke work of architectural elegance.
        </p>

        <Link
          href="/contact"
          style={{
            display: 'inline-block',
            padding: '1.15rem 3rem',
            backgroundColor: '#c9a96e',
            color: '#111111',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '40px',
            boxShadow: '0 12px 35px rgba(201, 169, 110, 0.35)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Reserve Now &rarr;
        </Link>
      </div>
    </section>
  )
}
