'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CATEGORIES } from '@/data/categories'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export function EventCategories() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const circleWindowRef = useRef<HTMLDivElement>(null)
  const textWindowRef = useRef<HTMLDivElement>(null)

  const bgSlideRefs = useRef<(HTMLDivElement | null)[]>([])
  const bgImageRefs = useRef<(HTMLDivElement | null)[]>([])
  const circleSlideRefs = useRef<(HTMLDivElement | null)[]>([])
  const textSlideRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const lastWidthRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    lastWidthRef.current = window.innerWidth
    const totalSlides = CATEGORIES.length

    const ctx = gsap.context(() => {
      const buildTimeline = () => {
        if (!sectionRef.current || !circleWindowRef.current || !textWindowRef.current) return

        if (timelineRef.current) {
          timelineRef.current.scrollTrigger?.kill(true)
          timelineRef.current.kill()
          timelineRef.current = null
        }

        const sRect = sectionRef.current.getBoundingClientRect()
        const cRect = circleWindowRef.current.getBoundingClientRect()
        const tRect = textWindowRef.current.getBoundingClientRect()

        const H = sRect.height || window.innerHeight || 900

        const circleTop = cRect.top - sRect.top
        const circleBottom = cRect.bottom - sRect.top
        const textTop = tRect.top - sRect.top
        const textBottom = tRect.bottom - sRect.top

        const pCircleEnter = Math.max(0, Math.min(1, 1 - circleBottom / H))
        const pCircleExit = Math.max(0, Math.min(1, 1 - circleTop / H))
        const pTextEnter = Math.max(0, Math.min(1, 1 - textBottom / H))
        const pTextExit = Math.max(0, Math.min(1, 1 - textTop / H))

        const isMobile = window.innerWidth < 768
        const stepDuration = 1.0
        const endPercent = isMobile ? 85 : 60

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${(totalSlides - 1) * endPercent}%`,
            pin: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        timelineRef.current = tl

        for (let i = 1; i < totalSlides; i++) {
          const slideStartTime = (i - 1) * stepDuration

          const bgEl = bgSlideRefs.current[i]
          const incomingBgImg = bgImageRefs.current[i]
          const outgoingBgImg = bgImageRefs.current[i - 1]
          const circleEl = circleSlideRefs.current[i]
          const textEl = textSlideRefs.current[i]
          const prevTextEl = textSlideRefs.current[i - 1]

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

          if (!isMobile && incomingBgImg) {
            tl.fromTo(
              incomingBgImg,
              { scale: 1.05 },
              {
                scale: 1.0,
                ease: 'none',
                duration: stepDuration,
              },
              slideStartTime
            )
          }

          if (!isMobile && outgoingBgImg) {
            tl.fromTo(
              outgoingBgImg,
              { scale: 1.0 },
              {
                scale: 0.96,
                ease: 'none',
                duration: stepDuration,
              },
              slideStartTime
            )
          }

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

          const tTextStart = slideStartTime + pTextEnter * stepDuration
          const tTextEnd = slideStartTime + pTextExit * stepDuration
          const textDur = tTextEnd - tTextStart

          if (textDur > 0) {
            const halfDur = textDur * 0.5
            if (prevTextEl) {
              tl.fromTo(
                prevTextEl,
                { opacity: 1, y: 0 },
                {
                  opacity: 0,
                  y: -12,
                  ease: 'power1.out',
                  duration: halfDur,
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
                  ease: 'power1.out',
                  duration: halfDur,
                },
                tTextStart + halfDur
              )
            }

            const tSwitch = tTextStart + halfDur
            if (prevTextEl) {
              tl.set(prevTextEl, { pointerEvents: 'none' }, tSwitch)
            }
            if (textEl) {
              tl.set(textEl, { pointerEvents: 'auto' }, tSwitch)
            }
          }
        }
      }

      buildTimeline()

      const handleResize = () => {
        if (typeof window === 'undefined') return
        const newWidth = window.innerWidth
        if (newWidth === lastWidthRef.current) return
        lastWidthRef.current = newWidth

        buildTimeline()
        ScrollTrigger.refresh()
      }

      window.addEventListener('resize', handleResize)

      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150)

      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(timer)
        if (timelineRef.current) {
          timelineRef.current.scrollTrigger?.kill(true)
          timelineRef.current.kill()
          timelineRef.current = null
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger?.kill(true)
        timelineRef.current.kill()
        timelineRef.current = null
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', backgroundColor: '#111111' }}>
      <section
        id="event-categories"
        ref={sectionRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#111111',
          touchAction: 'pan-y',
        }}
      >
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
                overflow: 'hidden',
              }}
            >
              <div
                ref={(el) => {
                  bgImageRefs.current[idx] = el
                }}
                style={{
                  position: 'absolute',
                  inset: '-1%',
                  willChange: 'transform',
                  transformOrigin: 'center center',
                  filter: 'blur(3.5px)',
                }}
              >
                <Image
                  src={cat.bgImage}
                  alt={cat.name}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: cat.bgPosition || 'center center',
                  }}
                />
              </div>
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


        {/* Centered Translucent Card Perfectly Matched to Reference Proportions */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            width: 'clamp(300px, 86vw, 420px)',
            height: 'clamp(520px, 80vh, 700px)',
            maxWidth: 'calc(100% - 1.5rem)',
            maxHeight: 'calc(100vh - 2rem)',
            background:
              'linear-gradient(180deg, rgba(208, 201, 190, 0.82) 0%, rgba(198, 191, 180, 0.85) 50%, rgba(190, 183, 172, 0.88) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: 'clamp(2.5rem, 5vh, 4rem) 1.25rem clamp(2rem, 3.5vh, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.28)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.38)',
            boxSizing: 'border-box',
          }}
        >
          {/* Inner Oval Photo Window with 100% Sub-Pixel Synchronized Seam Reveal */}
          <div
            ref={circleWindowRef}
            style={{
              position: 'relative',
              width: 'clamp(215px, 17.5vw, 265px)',
              height: 'clamp(255px, 30vh, 315px)',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto',
              flexShrink: 0,
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
                  sizes="(max-width: 768px) 50vw, 300px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {/* Stacked Synchronized Category Content Blocks */}
          <div
            ref={textWindowRef}
            style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 'clamp(1.25rem, 2.5vh, 1.85rem)',
            }}
          >
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={`text-${cat.id}`}
                href={cat.link}
                ref={(el) => {
                  textSlideRefs.current[idx] = el
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: idx + 1,
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'translateY(0px)' : 'translateY(12px)',
                  pointerEvents: idx === 0 ? 'auto' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  willChange: 'opacity, transform',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.65rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.75rem, 2.1vw, 2.35rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      lineHeight: 1.15,
                      margin: 0,
                    }}
                  >
                    {cat.name}
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: 'clamp(0.84rem, 0.9vw, 0.94rem)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: '300px',
                    marginInline: 'auto',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {cat.description}
                </p>

                <div
                  style={{
                    marginTop: 'clamp(0.85rem, 1.8vh, 1.35rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#111111',
                      backgroundColor: '#c9a96e',
                      padding: '0.55rem 1.4rem',
                      borderRadius: '30px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      boxShadow: '0 4px 18px rgba(201, 169, 110, 0.45)',
                      transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease',
                    }}
                  >
                    <span>Explore Event</span>
                    <span style={{ fontSize: '0.9rem' }}>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
