'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PORTFOLIO_PROJECTS } from '@/data/portfolio'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function HomePortfolio() {
  const featured = PORTFOLIO_PROJECTS.slice(0, 4)

  return (
    <section
      id="featured-work"
      style={{
        backgroundColor: '#121212',
        color: '#f5f0e8',
        paddingBlock: 'clamp(5rem, 8vw, 7.5rem)',
        borderTop: '1px solid rgba(201, 169, 110, 0.15)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', marginInline: 'auto', paddingInline: '1.5rem' }}>
        {/* Section Header */}
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
            FEATURED PRODUCTIONS
          </span>
          <div style={{ maxWidth: '800px', marginInline: 'auto', marginBottom: '1.25rem' }}>
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
              Our Work in Action
            </WindRevealHeading>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: '#b0a89d',
              maxWidth: '620px',
              marginInline: 'auto',
              lineHeight: 1.65,
            }}
          >
            A glimpse into recent weddings, corporate galas, and milestone celebrations curated across Uttarakhand.
          </p>
        </div>

        {/* 4 Cards Grid (Dark theme) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}/`}
              style={{
                backgroundColor: 'rgba(26, 26, 26, 0.85)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              className="portfolio-dark-card-hover"
            >
              <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="portfolio-dark-card-img"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(14, 14, 14, 0.9)',
                    backdropFilter: 'blur(8px)',
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
                  {project.category}
                </span>
              </div>

              <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: '#8c8278',
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {project.location}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: '#ffffff',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      marginBottom: '0.65rem',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: '#b0a89d',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {project.summary}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#c9a96e',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>View Case Study</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Portfolio CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/portfolio/"
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
              transition: 'all 0.25s ease',
            }}
          >
            <span>View Full Portfolio</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .portfolio-dark-card-hover:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(201, 169, 110, 0.4) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6) !important;
        }
        .portfolio-dark-card-hover:hover .portfolio-dark-card-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}
