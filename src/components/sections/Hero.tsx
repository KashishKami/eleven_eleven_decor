'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 }
      )
        .fromTo(
          subtextRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
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
          'linear-gradient(rgba(20, 20, 20, 0.65), rgba(20, 20, 20, 0.85)), url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--color-secondary)',
        paddingTop: '80px',
      }}
    >
      <div className="container" style={{ textAlign: 'center', zIndex: 2, paddingBlock: '4rem' }}>
        <span
          className="label"
          style={{
            display: 'inline-block',
            marginBottom: '1.5rem',
            padding: '0.375rem 1.25rem',
            backgroundColor: 'rgba(201, 169, 110, 0.15)',
            border: '1px solid rgba(201, 169, 110, 0.4)',
            borderRadius: '40px',
          }}
        >
          Luxury Event Styling & Catering
        </span>

        <h1
          ref={titleRef}
          className="heading-xl"
          style={{
            maxWidth: '1000px',
            marginInline: 'auto',
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          The Best Events Start Here
        </h1>

        <p
          ref={subtextRef}
          className="body-lg"
          style={{
            maxWidth: '680px',
            marginInline: 'auto',
            marginBottom: '2.5rem',
            color: '#d0c8b8',
          }}
        >
          1111 Decor crafts breathtaking bespoke atmospheres, luxury floral architecture, and high-end gastronomy for unforgettable galas and weddings.
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
            href="/contact"
            style={{
              padding: '1rem 2.25rem',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              boxShadow: '0 10px 30px rgba(201, 169, 110, 0.3)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
            }}
          >
            Contact Us Now
          </Link>

          <Link
            href="/about-us"
            style={{
              padding: '1rem 2.25rem',
              border: '1px solid var(--color-secondary)',
              color: 'var(--color-secondary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
          >
            Learn More
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
