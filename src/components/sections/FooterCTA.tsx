'use client'

import React from 'react'
import Link from 'next/link'

export function FooterCTA() {
  return (
    <section
      id="footer-cta"
      className="section-padding"
      style={{
        backgroundColor: '#121212',
        backgroundImage:
          'radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.12) 0%, rgba(18, 18, 18, 1) 70%)',
        borderTop: '1px solid rgba(201, 169, 110, 0.2)',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
          Reserve Your Date
        </span>
        <h2 className="heading-xl" style={{ marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
          Unforgettable Catering For Any Occasion!
        </h2>
        <p className="body-lg" style={{ marginBottom: '2.5rem', color: '#d0c8b8' }}>
          Let our creative team transform your next gala, wedding, or VIP summit into a masterwork of design and gastronomy.
        </p>
        <Link
          href="/contact"
          style={{
            display: 'inline-block',
            padding: '1.125rem 2.75rem',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '4px',
            boxShadow: '0 10px 30px rgba(201, 169, 110, 0.3)',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
          }}
        >
          Reserve Now
        </Link>
      </div>
    </section>
  )
}
