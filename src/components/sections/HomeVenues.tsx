'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useVenues } from '@/hooks/useVenues'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function HomeVenues() {
  const { venues } = useVenues()
  const displayVenues = venues.slice(0, 3)

  if (displayVenues.length === 0) {
    return null
  }

  return (
    <section
      id="venues-teaser"
      style={{
        backgroundColor: '#121212',
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
            CURATED SETTINGS
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
              Finding the Right Setting for Your Event
            </WindRevealHeading>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: '#b0a89d',
              maxWidth: '680px',
              marginInline: 'auto',
              lineHeight: 1.65,
            }}
          >
            Whether a venue is already booked or still being chosen, 11:11 Decor helps plan the layout and décor to suit the space — indoor, outdoor, or a mix of both.
          </p>
        </div>

        {/* Real Venues Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          {displayVenues.map((venue) => (
            <Link
              key={venue.slug}
              href={`/venues/${venue.slug}/`}
              style={{
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                <Image
                  src={venue.heroImage}
                  alt={venue.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(17, 17, 17, 0.85)',
                    color: '#c9a96e',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(201, 169, 110, 0.3)',
                  }}
                >
                  {venue.spaceType}
                </span>
              </div>
              <div style={{ padding: '2rem 1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: '#ffffff',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {venue.name}
                  </h3>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: '#c9a96e', marginBottom: '0.75rem', fontWeight: 600 }}>
                    {venue.location} {venue.capacity ? `• Up to ${venue.capacity} Guests` : ''}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: '#9e968c',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {venue.summary || venue.tagline}
                  </p>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c9a96e', fontSize: '0.825rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <span>Explore Venue Staging</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/venues/"
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
            <span>Explore Venues Directory</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
