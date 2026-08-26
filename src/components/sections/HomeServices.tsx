'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES_DATA } from '@/data/services'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function HomeServices() {
  const featuredServices = SERVICES_DATA.slice(0, 3)

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

        {/* Featured 3 Services Grid with Editorial Images */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3.75rem',
          }}
        >
          {featuredServices.map((service, idx) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              style={{
                backgroundColor: 'rgba(22, 22, 22, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              className="service-card-hover group"
            >
              {/* Image Container with Hover Zoom & Floating Badge */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  overflow: 'hidden',
                  backgroundColor: '#1f1f1f',
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  className="service-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(20, 20, 20, 0.65) 100%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(17, 17, 17, 0.75)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(201, 169, 110, 0.3)',
                    color: '#c9a96e',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                  }}
                >
                  0{idx + 1}
                </span>
              </div>

              {/* Card Content Body */}
              <div
                style={{
                  padding: '2rem 1.75rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.45rem',
                      color: '#ffffff',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      marginBottom: '0.85rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.925rem',
                      color: '#a8a095',
                      lineHeight: 1.65,
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
                    marginTop: '1.75rem',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    color: '#c9a96e',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>Learn More</span>
                  <span
                    style={{
                      display: 'inline-block',
                      transition: 'transform 0.3s ease',
                    }}
                    className="arrow-shift"
                  >
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Services CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/services/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.75rem',
              backgroundColor: '#c9a96e',
              color: '#111111',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '6px',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(201, 169, 110, 0.3)',
              transition: 'all 0.25s ease',
            }}
            className="services-btn-hover"
          >
            <span>View All Services</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .service-card-hover:hover {
          background-color: rgba(30, 30, 30, 0.95) !important;
          border-color: rgba(201, 169, 110, 0.4) !important;
          transform: translateY(-6px) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45) !important;
        }
        .service-card-hover:hover .service-img {
          transform: scale(1.06) !important;
        }
        .service-card-hover:hover .arrow-shift {
          transform: translateX(4px) !important;
        }
        .services-btn-hover:hover {
          background-color: #d8b87d !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(201, 169, 110, 0.45) !important;
        }
      `}</style>
    </section>
  )
}

