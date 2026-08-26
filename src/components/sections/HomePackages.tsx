'use client'

import React from 'react'
import Link from 'next/link'
import { PACKAGES } from '@/data/packages'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function HomePackages() {
  return (
    <section
      id="packages-overview"
      style={{
        backgroundColor: '#ede5d8',
        color: '#1a1a1a',
        paddingBlock: 'clamp(5rem, 8vw, 7.5rem)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', marginInline: 'auto', paddingInline: '1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              letterSpacing: '0.22em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#a8834a',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            SERVICE TIERS
          </span>
          <div style={{ maxWidth: '860px', marginInline: 'auto', marginBottom: '1.25rem' }}>
            <WindRevealHeading
              as="h2"
              className="heading-lg"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                color: '#1a1a1a',
                lineHeight: 1.2,
                fontWeight: 500,
                letterSpacing: '0.03em',
              }}
            >
              Planning Built Around Your Event
            </WindRevealHeading>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: '#5a544c',
              maxWidth: '680px',
              marginInline: 'auto',
              lineHeight: 1.65,
            }}
          >
            Every quote depends on event type, guest count, venue, décor scope, and production needs — the packages below are a starting point, not a fixed price.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem',
            alignItems: 'stretch',
          }}
        >
          {PACKAGES.map((tier) => (
            <div
              key={tier.id}
              style={{
                backgroundColor: tier.popular ? '#1a1a1a' : '#ffffff',
                color: tier.popular ? '#ffffff' : '#1a1a1a',
                borderRadius: '16px',
                padding: '2.75rem 2rem',
                border: tier.popular ? '2px solid #c9a96e' : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: tier.popular
                  ? '0 20px 50px rgba(0, 0, 0, 0.2)'
                  : '0 10px 30px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transform: tier.popular ? 'translateY(-8px)' : 'none',
              }}
            >
              {tier.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#c9a96e',
                    color: '#111111',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.35rem 1rem',
                    borderRadius: '20px',
                    boxShadow: '0 4px 12px rgba(201, 169, 110, 0.4)',
                  }}
                >
                  Most Requested
                </span>
              )}

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: tier.popular ? '#ffffff' : '#1a1a1a',
                    marginBottom: '0.25rem',
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: tier.popular ? '#c9a96e' : '#8c8278',
                    fontWeight: 600,
                    marginBottom: '1.25rem',
                  }}
                >
                  {tier.tagline}
                </p>

                <div
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: tier.popular ? 'rgba(201, 169, 110, 0.12)' : '#ede5d8',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: tier.popular ? '#c9a96e' : '#a8834a',
                    }}
                  >
                    {tier.priceLabel}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: tier.popular ? '#d0c8be' : '#5a544c',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem',
                  }}
                >
                  {tier.description}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {tier.features.slice(0, 4).map((f, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.85rem', lineHeight: 1.5, color: tier.popular ? '#d0c8be' : '#5a544c' }}>
                      <span style={{ color: '#c9a96e', fontWeight: 700 }}>✔</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={tier.ctaHref}
                style={{
                  marginTop: '2.25rem',
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem 1.5rem',
                  backgroundColor: tier.popular ? '#c9a96e' : '#1a1a1a',
                  color: tier.popular ? '#111111' : '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  boxShadow: tier.popular ? '0 4px 18px rgba(201, 169, 110, 0.4)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                {tier.ctaText}
              </Link>
            </div>
          ))}
        </div>

        {/* View All Packages CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/packages/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.95rem 2.5rem',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              textDecoration: 'none',
              border: '1px solid rgba(201, 169, 110, 0.4)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.25s ease',
            }}
          >
            <span>Compare All Packages & Tiers</span>
            <span style={{ color: '#c9a96e' }}>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
