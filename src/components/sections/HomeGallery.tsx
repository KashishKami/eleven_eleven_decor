'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGallery } from '@/hooks/useGallery'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function HomeGallery() {
  const { items } = useGallery()
  const previewItems = items.slice(0, 6)

  if (previewItems.length === 0) {
    return null
  }

  return (
    <section
      id="gallery-overview"
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
            VISUAL ARCHIVE
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
              Moments We&apos;ve Helped Create
            </WindRevealHeading>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: '#5a544c',
              maxWidth: '640px',
              marginInline: 'auto',
              lineHeight: 1.65,
            }}
          >
            A visual archive capturing the elegance, floral craftsmanship, and surgical precision behind our events.
          </p>
        </div>

        {/* 6 Images Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {previewItems.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              }}
              className="gallery-preview-card"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                className="gallery-preview-img"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.85) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#c9a96e',
                  }}
                >
                  {item.category}
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    color: '#ffffff',
                    fontWeight: 600,
                    margin: '0.2rem 0 0 0',
                  }}
                >
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/gallery/"
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
            <span>View Full Gallery</span>
            <span style={{ color: '#c9a96e' }}>&rarr;</span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .gallery-preview-card:hover .gallery-preview-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  )
}
