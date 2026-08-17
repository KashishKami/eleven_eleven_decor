'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CATEGORIES } from '@/data/categories'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function EventCategories() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const circleWindowRef = useRef<HTMLDivElement>(null)
  const textWindowRef = useRef<HTMLDivElement>(null)

  const bgSlideRefs = useRef<(HTMLDivElement | null)[]>([])
  const circleSlideRefs = useRef<(HTMLDivElement | null)[]>([])
  const textSlideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const totalSlides = CATEGORIES.length

    const ctx = gsap.context(() => {
      const buildTimeline = () => {
        if (!sectionRef.current || !circleWindowRef.current || !textWindowRef.current) return

        const sRect = sectionRef.current.getBoundingClientRect()
        const cRect = circleWindowRef.current.getBoundingClientRect()
        const tRect = textWindowRef.current.getBoundingClientRect()

        const H = sRect.height || window.innerHeight || 900

        // Exact Y coordinates relative to top of section
        const circleTop = cRect.top - sRect.top
        const circleBottom = cRect.bottom - sRect.top
        const textBottom = tRect.bottom - sRect.top

        // Seam progress keypoints: Y_seam(p) = H * (1 - p)
        const pCircleEnter = Math.max(0, Math.min(1, 1 - circleBottom / H))
        const pCircleExit = Math.max(0, Math.min(1, 1 - circleTop / H))
        const pTextEnter = Math.max(0, Math.min(1, 1 - textBottom / H))

        const stepDuration = 1.0

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${(totalSlides - 1) * 60}%`,
            pin: true,
            scrub: 0.2,
          },
        })

        // Build 100% continuous seam animations for slides 1 to totalSlides - 1
        for (let i = 1; i < totalSlides; i++) {
          const slideStartTime = (i - 1) * stepDuration

          const bgEl = bgSlideRefs.current[i]
          const circleEl = circleSlideRefs.current[i]
          const textEl = textSlideRefs.current[i]
          const prevTextEl = textSlideRefs.current[i - 1]

          // 1. Full-Bleed Background Image Wipe
          if (bgEl) {
            tl.fromTo(
              bgEl,
              { clipPath: 'inset(100% 0% 0% 0%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'none',
                duration: stepDuration,
              },
              slideStartTime
            )
          }

          // 2. Circle Photo Window Wipe (100% Seam Alignment with Background Photo)
          if (circleEl) {
            const tCircleStart = slideStartTime + pCircleEnter * stepDuration
            const tCircleEnd = slideStartTime + pCircleExit * stepDuration
            const circleDur = tCircleEnd - tCircleStart

            if (circleDur > 0) {
              tl.fromTo(
                circleEl,
                { clipPath: 'inset(100% 0% 0% 0%)' },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  ease: 'none',
                  duration: circleDur,
                },
                tCircleStart
              )
            }
          }

          // 3. Elegant Text & Button Crossfade (Fade out previous text, Fade in current text)
          const tTextStart = slideStartTime + pTextEnter * stepDuration

          if (prevTextEl) {
            tl.to(
              prevTextEl,
              {
                opacity: 0,
                y: -10,
                ease: 'none',
                duration: 0.2 * stepDuration,
              },
              tTextStart
            )
          }

          if (textEl) {
            tl.fromTo(
              textEl,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                ease: 'none',
                duration: 0.25 * stepDuration,
              },
              tTextStart + 0.1 * stepDuration
            )
          }
        }
      }

      buildTimeline()

      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

      return () => {
        clearTimeout(timer)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%' }}>
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
        {/* Stacked Full-Bleed Background Slides for Curtain Wipe Reveal */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        >
          {CATEGORIES.map((cat, idx) => (
            <div
              key={`bg-${cat.id}`}
              ref={(el) => {
                bgSlideRefs.current[idx] = el
              }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: idx + 1,
                clipPath: idx === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                willChange: 'clip-path',
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

        {/* Centered Translucent Frosted Glass Card */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            width: 'clamp(280px, 86vw, 420px)',
            maxWidth: 'calc(100vw - 2rem)',
            backgroundColor: 'rgba(45, 38, 30, 0.78)',
            backdropFilter: 'blur(24px)',
            borderRadius: '24px',
            padding: 'clamp(1.5rem, 5vw, 2.75rem) clamp(1.25rem, 4vw, 2.25rem)',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Inner Circular Photo Window with 100% Sub-Pixel Synchronized Seam Reveal */}
          <div
            ref={circleWindowRef}
            style={{
              position: 'relative',
              width: 'clamp(200px, 58vw, 290px)',
              height: 'clamp(200px, 58vw, 290px)',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto 1.5rem',
              border: '3.5px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
            }}
          >
            {CATEGORIES.map((cat, idx) => (
              <div
                key={`circle-${cat.id}`}
                ref={(el) => {
                  circleSlideRefs.current[idx] = el
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: idx + 1,
                  clipPath: idx === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                  willChange: 'clip-path',
                }}
              >
                <Image
                  src={cat.cardImage}
                  alt={cat.name}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 58vw, 290px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {/* Stacked Synchronized Category Content Blocks */}
          <div ref={textWindowRef} style={{ position: 'relative', minHeight: '175px' }}>
            {CATEGORIES.map((cat, idx) => (
              <div
                key={`text-${cat.id}`}
                ref={(el) => {
                  textSlideRefs.current[idx] = el
                }}
                style={{
                  position: idx === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  zIndex: idx + 1,
                  opacity: idx === 0 ? 1 : 0,
                  willChange: 'opacity, transform',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.4rem, 3.2vw, 2rem)',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  {cat.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#f3ece1',
                    fontSize: 'clamp(0.85rem, 2vw, 0.98rem)',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    maxWidth: '340px',
                    marginInline: 'auto',
                    marginBottom: '1.25rem',
                  }}
                >
                  {cat.description}
                </p>

                <Link
                  href={cat.link}
                  style={{
                    display: 'inline-block',
                    padding: '0.625rem 1.35rem',
                    backgroundColor: '#c9a96e',
                    color: '#111111',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(201, 169, 110, 0.4)',
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                  }}
                >
                  Explore Category &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
