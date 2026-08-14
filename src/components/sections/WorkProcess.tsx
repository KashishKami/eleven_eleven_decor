'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROCESS_STEPS } from '@/data/process'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WorkProcess() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
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
      id="work-process"
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
            OUR SEAMLESS METHODOLOGY
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
              How We Craft Your Event
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
            A refined four-step journey from initial creative vision to flawless event execution.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              ref={(el) => {
                stepsRef.current[idx] = el
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.75rem',
                  color: '#c9a96e',
                  fontWeight: 400,
                  marginBottom: '1rem',
                  lineHeight: 1,
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: '#cccccc',
                  fontSize: '0.925rem',
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
