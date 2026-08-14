'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-padding"
      style={{
        backgroundColor: '#faf6f0',
        color: '#2c221e',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header Label & Wind Reveal Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            className="label"
            style={{
              color: '#3c3127',
              fontSize: '0.8125rem',
              letterSpacing: '0.2em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            ◇ WHO WE ARE
          </span>
          <div style={{ maxWidth: '900px', marginInline: 'auto' }}>
            <WindRevealHeading
              as="h2"
              className="heading-lg"
              style={{
                color: '#2c221e',
                fontSize: 'clamp(2.125rem, 4.5vw, 3.85rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                lineHeight: 1.15,
              }}
            >
              PROFESSIONAL CATERING TEAMS IN 1111 DECOR
            </WindRevealHeading>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid-responsive-2" style={{ alignItems: 'flex-start', gap: '3.5rem' }}>
          {/* Left Column: Narrative & Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3
              className="heading-md"
              style={{
                color: '#2c221e',
                textTransform: 'uppercase',
                lineHeight: 1.25,
                fontWeight: 400,
              }}
            >
              EVERY EVENT IS A UNIQUE OPPORTUNITY TO CRAFT A CULINARY EXPERIENCE AS EXTRAORDINARY AS DELICIOUS.
            </h3>

            <p className="body-md" style={{ color: '#554a42', lineHeight: 1.65 }}>
              A meeting or celebration is a unique and unforgettable event!! In 1111 Decor we have a team of event planners, we take care of the design, creative and innovative work, planning, coordination and organization of all kinds of social and corporate events.
            </p>

            {/* Stat Callout Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: '120px',
                  height: '80px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop"
                  alt="1111 Decor Catering Staff"
                  fill
                  sizes="120px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.75rem',
                    fontWeight: 400,
                    lineHeight: 1,
                    color: '#2c221e',
                  }}
                >
                  4.9K<sup>+</sup>
                </div>
                <span className="body-sm" style={{ color: '#6b5e54', fontWeight: 500 }}>
                  events each year
                </span>
              </div>
            </div>

            {/* Dark Brown Pill Button */}
            <div>
              <Link
                href="/about-us"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  backgroundColor: '#3c3127',
                  color: '#ffffff',
                  padding: '0.875rem 2.25rem',
                  borderRadius: '40px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: '0 6px 20px rgba(60, 49, 39, 0.25)',
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                }}
              >
                LEARN ABOUT US →
              </Link>
            </div>
          </div>

          {/* Right Column: Tall Rounded Venue Image */}
          <div
            style={{
              position: 'relative',
              height: '520px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(44, 34, 30, 0.15)',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
              alt="1111 Decor Luxury Garden Wedding Setting"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
