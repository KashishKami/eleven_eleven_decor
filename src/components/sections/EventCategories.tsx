'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CATEGORIES } from '@/data/categories'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function EventCategories() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const bgTrackRef = useRef<HTMLDivElement>(null)
  const circleTrackRef = useRef<HTMLDivElement>(null)
  const circleWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const totalSlides = CATEGORIES.length

    const ctx = gsap.context(() => {
      const buildTimeline = () => {
        if (!circleWindowRef.current || !sectionRef.current) return

        const cRect = circleWindowRef.current.getBoundingClientRect()
        const sRect = sectionRef.current.getBoundingClientRect()

        const H = sRect.height || window.innerHeight || 900
        const circleBottom = cRect.bottom - sRect.top
        const circleTop = cRect.top - sRect.top
        const circleD = cRect.height || 340

        // Sub-pixel accurate enter & exit progress ratios:
        const enterRatio = Math.max(0, Math.min(1, 1 - circleBottom / H))
        const exitRatio = Math.max(0, Math.min(1, 1 - circleTop / H))
        const circleDuration = exitRatio - enterRatio

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=400%',
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const idx = Math.min(
                totalSlides - 1,
                Math.floor(self.progress * totalSlides)
              )
              setActiveIndex(idx)
            },
          },
        })

        for (let i = 1; i < totalSlides; i++) {
          const slideStartTime = i - 1
          const targetBgY = -(i / totalSlides) * 100
          const targetCircleY = -i * circleD
          const circleStartTime = slideStartTime + enterRatio

          // 1. Background image track moves linearly across slide step i
          tl.to(
            bgTrackRef.current,
            {
              yPercent: targetBgY,
              ease: 'none',
              duration: 1.0,
            },
            slideStartTime
          )

          // 2. Card circle track starts moving at the EXACT instant bg seam touches circle bottom,
          // and moves at the exact same pixel velocity as the bg seam!
          if (circleTrackRef.current) {
            tl.to(
              circleTrackRef.current,
              {
                y: targetCircleY,
                ease: 'none',
                duration: circleDuration,
              },
              circleStartTime
            )
          }
        }
      }

      buildTimeline()

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const currentCategory = CATEGORIES[activeIndex] ?? CATEGORIES[0] ?? {
    id: 'corporate',
    name: 'CORPORATE',
    title: 'CORPORATE GALAS',
    description:
      'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    bgImage: '',
    cardImage: '',
  }

  return (
    <section
      id="event-categories"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#111111',
      }}
    >
      {/* Background Images Vertical Sliding Track */}
      <div
        ref={bgTrackRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${CATEGORIES.length * 100}vh`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          willChange: 'transform',
        }}
      >
        {CATEGORIES.map((cat, idx) => (
          <div
            key={`bg-${cat.id}`}
            style={{
              position: 'relative',
              height: '100vh',
              width: '100vw',
              flexShrink: 0,
            }}
          >
            <Image
              src={cat.bgImage}
              alt={cat.name}
              fill
              priority={idx === 0}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 15, 15, 0.5)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Large Background Watermark Text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 14vw, 15rem)',
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.12)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        EVENTS CATER
      </div>

      {/* Centered Translucent Frosted Glass Card (Enlarged & Prominent) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          width: 'clamp(360px, 90vw, 460px)',
          backgroundColor: 'rgba(45, 38, 30, 0.75)',
          backdropFilter: 'blur(24px)',
          borderRadius: '28px',
          padding: '3rem 2.25rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 35px 70px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Inner Circular Photo Window with Sub-Pixel Seam Alignment */}
        <div
          ref={circleWindowRef}
          style={{
            position: 'relative',
            width: '340px',
            height: '340px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 1.75rem',
            border: '4px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
          }}
        >
          <div
            ref={circleTrackRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '340px',
              height: `${CATEGORIES.length * 340}px`,
              display: 'flex',
              flexDirection: 'column',
              willChange: 'transform',
            }}
          >
            {CATEGORIES.map((cat, idx) => (
              <div
                key={`circle-${cat.id}`}
                style={{
                  position: 'relative',
                  width: '340px',
                  height: '340px',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={cat.cardImage}
                  alt={cat.name}
                  fill
                  priority={idx === 0}
                  sizes="340px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Category Content (Title & Description) */}
        <div>
          <h3
            className="heading-md"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#ffffff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              transition: 'opacity 0.3s ease',
            }}
          >
            {currentCategory.name}
          </h3>

          <p
            className="body-sm"
            style={{
              color: '#e8e0d4',
              fontSize: '0.875rem',
              lineHeight: 1.55,
              maxWidth: '360px',
              marginInline: 'auto',
            }}
          >
            {currentCategory.description}
          </p>
        </div>
      </div>
    </section>
  )
}
