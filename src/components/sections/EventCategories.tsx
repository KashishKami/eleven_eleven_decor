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
  const circleWindowRef = useRef<HTMLDivElement>(null)
  const bgSlideRefs = useRef<(HTMLDivElement | null)[]>([])
  const circleSlideRefs = useRef<(HTMLDivElement | null)[]>([])

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

        // Progress Mapping:
        // tStep 0.0 -> 0.5: reveals 35% (Y: 1.0H -> 0.65H) - initial smooth reveal
        // tStep 0.5 -> 1.0: reveals remaining 65% (Y: 0.65H -> 0) - VELOCITY INCREASES & WIPE COMPLETES 100%!

        const getYProgress = (Y: number): number => {
          const yRatio = Y / H
          if (yRatio > 0.65) {
            return ((1 - yRatio) / 0.35) * 0.5
          }
          return 0.5 + ((0.65 - yRatio) / 0.65) * 0.5
        }

        const getBgY = (tStep: number): number => {
          if (tStep <= 0.5) {
            return H * (1 - (tStep / 0.5) * 0.35)
          } else if (tStep <= 1.0) {
            return H * (0.65 - ((tStep - 0.5) / 0.5) * 0.65)
          } else {
            return 0
          }
        }

        const stepDuration = 1.0 // 1.0s active wipe (0..0.5 normal, 0.5..1.0 accelerated complete)
        const totalDuration = (totalSlides - 1) * stepDuration

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=160%', // Exactly calibrated so unpin happens immediately when final slide completes!
            pin: true,
            scrub: 0.3,
            onUpdate: (self) => {
              const currentT = self.progress * totalDuration
              const idx = Math.min(
                totalSlides - 1,
                Math.floor(currentT / stepDuration)
              )
              setActiveIndex(idx)
            },
          },
        })

        // For slide i (1 to totalSlides - 1):
        for (let i = 1; i < totalSlides; i++) {
          const slideStartTime = (i - 1) * stepDuration
          const tMid = slideStartTime + 0.5
          const tDone = slideStartTime + 1.0

          const bgEl = bgSlideRefs.current[i]
          const circleEl = circleSlideRefs.current[i]

          if (bgEl) {
            // 1. Background Wipe Reveal (Speed increases past 50% and completes wipe 100% at tDone)
            tl.fromTo(
              bgEl,
              { clipPath: 'inset(100% 0% 0% 0%)' },
              {
                clipPath: 'inset(65% 0% 0% 0%)',
                ease: 'none',
                duration: 0.5,
              },
              slideStartTime
            ).to(
              bgEl,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'none',
                duration: 0.5,
              },
              tMid
            )
          }

          if (circleEl) {
            // 2. Circle Photo Window Wipe Reveal (derived dynamically for 100% sub-pixel lockstep alignment)
            const enterOffset = getYProgress(circleBottom)
            const exitOffset = getYProgress(circleTop)

            const circleStartTime = slideStartTime + enterOffset
            const circleEndTime = slideStartTime + exitOffset

            const points: { t: number; insetPercent: number }[] = [
              { t: circleStartTime, insetPercent: 100 },
            ]

            if (circleStartTime < tMid && circleEndTime > tMid) {
              const yMid = getBgY(0.5)
              const insetMid = Math.max(
                0,
                Math.min(100, ((yMid - circleTop) / circleD) * 100)
              )
              points.push({ t: tMid, insetPercent: insetMid })
            }

            points.push({ t: Math.min(circleEndTime, tDone), insetPercent: 0 })

            // Build piecewise linear timeline for circleEl
            for (let k = 0; k < points.length - 1; k++) {
              const pStart = points[k]
              const pEnd = points[k + 1]
              if (!pStart || !pEnd) continue

              const dur = pEnd.t - pStart.t
              if (dur > 0.001) {
                if (k === 0) {
                  tl.fromTo(
                    circleEl,
                    { clipPath: `inset(${pStart.insetPercent}% 0% 0% 0%)` },
                    {
                      clipPath: `inset(${pEnd.insetPercent}% 0% 0% 0%)`,
                      ease: 'none',
                      duration: dur,
                    },
                    pStart.t
                  )
                } else {
                  tl.to(
                    circleEl,
                    {
                      clipPath: `inset(${pEnd.insetPercent}% 0% 0% 0%)`,
                      ease: 'none',
                      duration: dur,
                    },
                    pStart.t
                  )
                }
              }
            }
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

      {/* Centered Translucent Frosted Glass Card (Responsive & Centered on Mobile) */}
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
        {/* Inner Circular Photo Window with Synchronized Stacked Wipe Reveal */}
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

        {/* Dynamic Category Content */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.15rem)',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
              transition: 'opacity 0.3s ease',
            }}
          >
            {currentCategory.name}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#f3ece1',
              fontSize: 'clamp(0.875rem, 2.2vw, 1rem)',
              fontWeight: 400,
              lineHeight: 1.55,
              maxWidth: '340px',
              marginInline: 'auto',
            }}
          >
            {currentCategory.description}
          </p>
        </div>
      </div>
    </section>
  </div>
  )
}
