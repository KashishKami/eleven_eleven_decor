'use client'

import React from 'react'
import Link from 'next/link'
import { TESTIMONIALS } from '@/data/testimonials'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function HomeTestimonials() {
  const featuredTestimonials = TESTIMONIALS.slice(0, 3)

  return (
    <section
      id="testimonials-overview"
      style={{
        backgroundColor: '#111111',
        color: '#f5f0e8',
        paddingBlock: 'clamp(5rem, 8vw, 7.5rem)',
        borderTop: '1px solid rgba(201, 169, 110, 0.15)',
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
              color: '#c9a96e',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            CLIENT REVIEWS
          </span>
          <div style={{ maxWidth: '860px', marginInline: 'auto', marginBottom: '1.25rem' }}>
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
              Client Words & Celebrations
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
            What hosts and couples say about working with 11:11 Decor.
          </p>
        </div>

        {/* 3 Testimonials Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          {featuredTestimonials.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: 'rgba(26, 26, 26, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div>
                <div style={{ color: '#c9a96e', fontSize: '1.2rem', marginBottom: '1rem', letterSpacing: '0.15em' }}>
                  {'★'.repeat(t.rating)}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    lineHeight: 1.65,
                    color: '#f0e8dc',
                    fontStyle: 'italic',
                    marginBottom: '1.75rem',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 0.25rem 0',
                  }}
                >
                  {t.clientName}
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', color: '#c9a96e', margin: '0 0 0.15rem 0' }}>
                  {t.eventType}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#7a7168', margin: 0 }}>
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Stories CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/testimonials/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.95rem 2.5rem',
              backgroundColor: '#c9a96e',
              color: '#111111',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(201, 169, 110, 0.35)',
              transition: 'background-color 0.25s ease, transform 0.2s ease',
            }}
          >
            <span>Read More Client Stories</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
