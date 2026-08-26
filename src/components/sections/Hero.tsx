'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          subtextRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.2'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        marginTop: '-80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage:
          'linear-gradient(rgba(20, 20, 20, 0.65), rgba(20, 20, 20, 0.85)), url("/hero-banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--color-secondary)',
        paddingTop: '80px',
      }}
    >
      <div className="container" style={{ textAlign: 'center', zIndex: 2, paddingBlock: '4rem' }}>
        <span
          ref={labelRef}
          className="label"
          style={{
            display: 'inline-block',
            marginBottom: '1.5rem',
            padding: '0.5rem 1.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(201, 169, 110, 0.6)',
            borderRadius: '40px',
            color: 'var(--color-accent)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}
        >
          11:11 Decor — Event Management & Décor Studio
        </span>

        <div style={{ maxWidth: '1000px', marginInline: 'auto', marginBottom: '1.5rem' }}>
          <WindRevealHeading
            as="h1"
            className="heading-xl"
            style={{
              color: '#ffffff',
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.85)',
            }}
          >
            Celebrations planned with intention, decorated with detail.
          </WindRevealHeading>
        </div>

        <p
          ref={subtextRef}
          className="body-lg"
          style={{
            maxWidth: '680px',
            marginInline: 'auto',
            marginBottom: '2.5rem',
            color: '#f5f0e8',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.85)',
          }}
        >
          11:11 Decor designs and manages weddings, celebrations, and corporate events — from the first concept conversation to the last flower placed.
        </p>

        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/contact/"
            style={{
              padding: '1rem 2.25rem',
              backgroundColor: '#c9a96e',
              color: '#111111',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(201, 169, 110, 0.45)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
            }}
          >
             Plan Your Event
          </Link>

          <Link
            href="/portfolio/"
            style={{
              padding: '1rem 2.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1.5px solid #ffffff',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
          >
             View Our Work
          </Link>
        </div>
      </div>

      {/* Bouncing Scroll Indicator Arrow */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: 'var(--color-accent)',
          animation: 'bounce 2s infinite',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>↓</span>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translate(-50%, 0);
          }
          40% {
            transform: translate(-50%, -10px);
          }
          60% {
            transform: translate(-50%, -5px);
          }
        }
      `}</style>
    </section>
  )
}
