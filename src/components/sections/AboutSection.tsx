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
        backgroundColor: '#ede5d8',
        color: '#1a1a1a',
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(5rem, 8vw, 7.5rem)',
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', marginInline: 'auto' }}>
        {/* Header Label & Wind Reveal Title */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <span
            className="label"
            style={{
              color: 'var(--color-accent-dark, #a8834a)',
              fontSize: '0.8125rem',
              letterSpacing: '0.22em',
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            ABOUT 11:11 DECOR
          </span>
          <div style={{ maxWidth: '920px', marginInline: 'auto' }}>
            <WindRevealHeading
              as="h2"
              className="heading-lg"
              style={{
                color: '#1a1a1a',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                letterSpacing: '0.02em',
                lineHeight: 1.15,
                fontWeight: 400,
              }}
            >
              Creating Experiences, Not Just Events
            </WindRevealHeading>
          </div>
        </div>

        {/* Content Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Narrative & Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display, Cormorant Garamond, serif)',
                fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                color: '#1a1a1a',
                lineHeight: 1.35,
                fontWeight: 400,
                letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              11:11 Decor is an event management and décor studio built around a simple idea: the details are the experience.
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                fontSize: '1rem',
                color: '#554a42',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              We plan and design weddings, celebrations, and corporate events from the first conversation through to the final walkthrough on event day. Every event starts with listening — to what you&apos;re celebrating, who it&apos;s for, and how you want it to feel.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                fontSize: '0.95rem',
                color: '#554a42',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              From there, we shape a concept, translate it into décor and layout, and coordinate every moving part so the day runs the way it was designed to. We work closely with vendors, venues, and your own team to keep planning organized and stress-free, so the only thing you have to do on the day itself is be present in it.
            </p>

            {/* Stat Callout Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.1rem 1.75rem',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid rgba(201, 169, 110, 0.3)',
                boxShadow: '0 10px 30px rgba(44, 34, 30, 0.06)',
                width: 'fit-content',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display, Cormorant Garamond, serif)',
                    fontSize: '2.4rem',
                    fontWeight: 400,
                    lineHeight: 1,
                    color: '#1a1a1a',
                  }}
                >
                  100<span style={{ color: 'var(--color-accent, #c9a96e)' }}>%</span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                    fontSize: '0.85rem',
                    color: '#6b5e54',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Integrated Planning & Décor
                </span>
              </div>
            </div>

            {/* Luxury Pill Button */}
            <div style={{ marginTop: '0.5rem' }}>
              <Link
                href="/about-us/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  padding: '0.95rem 2.5rem',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(201, 169, 110, 0.4)',
                  boxShadow: '0 8px 24px rgba(26, 26, 26, 0.18)',
                  textDecoration: 'none',
                  transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <span>Discover 11:11 Decor</span>
                <span style={{ color: 'var(--color-accent, #c9a96e)', fontSize: '1.1rem' }}>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Imagery */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '480px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Main Editorial Photo */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                height: '520px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(201, 169, 110, 0.35)',
                boxShadow: '0 25px 60px rgba(44, 34, 30, 0.16)',
              }}
            >
              <Image
                src="/images/about/home-page-about.webp"
                alt="11:11 Decor Palace Heritage Event Setting"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />
            </div>

            {/* Luxury Brand Floating Seal */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: 'clamp(0px, 2vw, 20px)',
                backgroundColor: 'rgba(26, 26, 26, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '0.6rem 1.1rem',
                borderRadius: '30px',
                border: '1px solid rgba(201, 169, 110, 0.4)',
                color: 'var(--color-accent, #c9a96e)',
                fontFamily: 'var(--font-display, Cormorant Garamond, serif)',
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                zIndex: 2,
              }}
            >
              ✨ Bespoke Artistry
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
