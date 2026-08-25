'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

const VENUE_HIGHLIGHTS = [
  {
    title: 'Luxury Indoor Ballrooms',
    desc: 'Controlled acoustic environments, ceiling rigging for grand chandeliers, and expansive floor plates for royal banquets.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Hill Resort Lawns',
    desc: 'Panoramic Himalayan views in Mussoorie and Dehradun foothills, framed by open-air mandaps and weather-proof canopy structures.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Riverfront & Scenic Settings',
    desc: 'Tranquil Ganga riverbanks in Rishikesh offering spiritual serenity, ambient lantern pathways, and riverside dining pavilions.',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop',
  },
]

export function HomeVenues() {
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

        {/* 3 Venue Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          {VENUE_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem 1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: '#ffffff',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: '#9e968c',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
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
