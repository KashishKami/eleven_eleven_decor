'use client'

import React from 'react'
import Link from 'next/link'
import { SERVICES_DATA } from '@/data/services'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function HomeServices() {
  return (
    <section
      id="services-overview"
      style={{
        backgroundColor: '#141414',
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
            OUR CAPABILITIES
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
              Event Planning, Management & Décor Services
            </WindRevealHeading>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: '#b0a89d',
              maxWidth: '660px',
              marginInline: 'auto',
              lineHeight: 1.65,
            }}
          >
            Choose a single specialized service, or combine multiple capabilities into a seamlessly coordinated master plan.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3.5rem',
          }}
        >
          {SERVICES_DATA.map((service, idx) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              style={{
                backgroundColor: 'rgba(26, 26, 26, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '2rem 1.75rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              className="service-card-hover"
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      color: '#c9a96e',
                      fontWeight: 600,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    style={{
                      color: '#c9a96e',
                      fontSize: '1rem',
                      opacity: 0.7,
                    }}
                  >
                    ✦
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    color: '#ffffff',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
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
                  {service.shortDescription}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1.5rem',
                  fontSize: '0.825rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  color: '#c9a96e',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                <span>Learn More</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Services CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/services/"
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
            <span>View All 10 Services</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .service-card-hover:hover {
          background-color: rgba(36, 36, 36, 0.95) !important;
          border-color: rgba(201, 169, 110, 0.35) !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;
        }
      `}</style>
    </section>
  )
}
