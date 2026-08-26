'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FEATURES = [
  {
    number: '01',
    title: 'CREATIVE CONCEPTS',
    description:
      'Every event begins with a bespoke vision. We craft original décor concepts, mood boards, and 3D spatial plans tailored precisely to your celebration.',
  },
  {
    number: '02',
    title: 'PERSONALISED DÉCOR',
    description:
      'From custom mandap architecture to bespoke floral installations and hand-selected furnishings — no two 11:11 events ever look the same.',
  },
  {
    number: '03',
    title: 'DETAILED PLANNING',
    description:
      'Comprehensive master timelines, vendor briefings, and production schedules ensure every detail is mapped, assigned, and executed without compromise.',
  },
  {
    number: '04',
    title: 'PROFESSIONAL COORDINATION',
    description:
      'A single point of contact for all vendors — caterers, photographers, sound, lighting — so you never have to chase a call or manage a conflict.',
  },
  {
    number: '05',
    title: 'SEAMLESS EXECUTION',
    description:
      'Our on-site production directors manage live event flow, handle the unexpected, and keep everything running on schedule from setup to farewell.',
  },
  {
    number: '06',
    title: 'CLIENT-FOCUSED APPROACH',
    description:
      'We listen first. Your vision, priorities, and comfort shape every decision — we are partners in your celebration, not just service providers.',
  },
]

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      style={{
        backgroundColor: '#ede5d8',
        padding: 'clamp(5rem, 8vw, 7.5rem) 1.5rem',
        color: '#1a1a1a',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Section Header with Wind Reveal Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <p
            style={{
              color: '#a8834a',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              fontWeight: 700,
            }}
          >
            THE 1111 DECOR STANDARD
          </p>
          <div style={{ maxWidth: '860px', margin: '0 auto 1.25rem' }}>
            <WindRevealHeading
              as="h2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                color: '#1a1a1a',
                letterSpacing: '0.03em',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Why Discerning Clients Choose Us
            </WindRevealHeading>
          </div>
          <p
            style={{
              color: '#5a544c',
              fontSize: '1.05rem',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Six reasons our clients come back — and why their guests remember the night for years.
          </p>
        </div>

        {/* Feature Grid (Light theme cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.number}
              ref={(el) => {
                cardsRef.current[idx] = el
              }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(201, 169, 110, 0.3)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s ease',
              }}
              className="why-card-hover"
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  color: '#a8834a',
                  fontWeight: 500,
                  marginBottom: '1.25rem',
                }}
              >
                {feature.number}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  color: '#1a1a1a',
                  letterSpacing: '0.04em',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: '#554a42',
                  fontSize: '0.925rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .why-card-hover:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 40px rgba(201, 169, 110, 0.2) !important;
          border-color: #c9a96e !important;
        }
      `}</style>
    </section>
  )
}
