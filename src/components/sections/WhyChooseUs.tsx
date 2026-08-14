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
    title: 'CUISINE EXCELLENCE',
    description:
      'Michelin-trained executive chefs crafting bespoke culinary journeys with farm-to-table organic ingredients.',
  },
  {
    number: '02',
    title: 'SPATIAL ARTISTRY',
    description:
      'Architectural floral installations and custom lighting design transforming venues into immersive dreamscapes.',
  },
  {
    number: '03',
    title: 'WHITE-GLOVE SERVICE',
    description:
      'Discreet, impeccable hospitality directors ensuring every guest experiences warmth and royal care.',
  },
  {
    number: '04',
    title: 'TAILORED PERFECTION',
    description:
      'Uncompromising attention to detail from custom table linens to curated multi-sensory entertainment.',
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
        backgroundColor: '#111111',
        padding: '7rem 1.5rem',
        color: '#ffffff',
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
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <p
            style={{
              color: '#c9a96e',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              fontWeight: 600,
            }}
          >
            THE 1111 DECOR STANDARD
          </p>
          <div style={{ maxWidth: '800px', margin: '0 auto 1.25rem' }}>
            <WindRevealHeading
              as="h2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                color: '#ffffff',
                letterSpacing: '0.04em',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Why Discerning Clients Choose Us
            </WindRevealHeading>
          </div>
          <p
            style={{
              color: '#e0d8cc',
              fontSize: '1.05rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            We merge culinary mastery with spatial design, transforming extraordinary visions into unforgettable luxury celebrations.
          </p>
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  color: '#c9a96e',
                  fontWeight: 400,
                  marginBottom: '1.25rem',
                }}
              >
                {feature.number}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  letterSpacing: '0.06em',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: '#cccccc',
                  fontSize: '0.925rem',
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
