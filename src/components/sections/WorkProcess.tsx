'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROCESS_STEPS } from '@/data/process'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WorkProcess() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  const step1 = PROCESS_STEPS[0]
  const step2 = PROCESS_STEPS[1]
  const step3 = PROCESS_STEPS[2]
  const step4 = PROCESS_STEPS[3]

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Desktop Viewports (min-width: 992px): Enable 3-column sticky pinning & floating scrub
        '(min-width: 992px)': () => {
          if (leftColRef.current && rightColRef.current && pinContainerRef.current) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pinContainerRef.current,
                start: 'top 12%',
                end: '+=180%',
                pin: true,
                scrub: 0.6,
              },
            })

            tl.fromTo(
              leftColRef.current,
              { y: 550 },
              { y: -700, ease: 'none' },
              0
            )

            tl.fromTo(
              rightColRef.current,
              { y: 800 },
              { y: -450, ease: 'none' },
              0
            )
          }
        },
        // Mobile & Tablet (< 992px): Reset inline transforms completely
        '(max-width: 991px)': () => {
          if (leftColRef.current) gsap.set(leftColRef.current, { clearProps: 'all' })
          if (rightColRef.current) gsap.set(rightColRef.current, { clearProps: 'all' })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const renderCard = (step: typeof step1) => {
    if (!step) return null
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '220px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 18px 40px rgba(44, 34, 30, 0.14)',
          }}
        >
          <Image
            src={step.image}
            alt={step.title}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '0.75rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-display)',
              fontSize: '3.25rem',
              fontWeight: 400,
              color: '#ffffff',
              textShadow: '0 4px 18px rgba(0, 0, 0, 0.65)',
              lineHeight: 1,
            }}
          >
            {step.number}
          </span>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            color: '#2c221e',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginTop: '0.85rem',
            marginBottom: '0.35rem',
            fontWeight: 600,
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            color: '#6b5e54',
            fontSize: '0.875rem',
            lineHeight: 1.55,
            maxWidth: '280px',
            margin: '0 auto',
          }}
        >
          {step.description}
        </p>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <section
        id="work-process"
        ref={sectionRef}
        style={{
          backgroundColor: '#ede5d8',
          color: '#2c221e',
          position: 'relative',
          padding: '5rem 1.25rem 6rem',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          {/* Section Header */}
          <div className="work-process-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span
              className="label"
              style={{
                color: '#3c3127',
                fontSize: '0.8125rem',
                letterSpacing: '0.2em',
                display: 'inline-block',
                marginBottom: '0.5rem',
              }}
            >
              ◇ OUR WORK PROCESS
            </span>
            <div style={{ maxWidth: '850px', marginInline: 'auto' }}>
              <WindRevealHeading
                as="h2"
                className="heading-lg"
                style={{
                  color: '#2c221e',
                  fontSize: 'clamp(1.75rem, 3.8vw, 3.15rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  lineHeight: 1.15,
                }}
              >
                STEPS TO PLAN A SUCCESSFUL EVENT
              </WindRevealHeading>
            </div>
          </div>

          {/* DESKTOP VIEW (≥ 992px): 3-Column Sticky Pinning Interactive Layout */}
          <div className="work-process-desktop-layout">
            <div
              ref={pinContainerRef}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                paddingBlock: '1rem',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(240px, 320px) minmax(380px, 540px) minmax(240px, 320px)',
                  justifyContent: 'center',
                  gap: '3.5rem',
                  alignItems: 'center',
                  position: 'relative',
                  width: '100%',
                }}
              >
                {/* Left Column: Step 01 & Step 03 Floating Cards */}
                <div
                  ref={leftColRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4.5rem',
                    willChange: 'transform',
                  }}
                >
                  {renderCard(step1)}
                  {renderCard(step3)}
                </div>

                {/* Center Column: Prominent Pinned Central Showcase Photo */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '620px',
                      borderRadius: '28px',
                      overflow: 'hidden',
                      boxShadow: '0 30px 70px rgba(44, 34, 30, 0.22)',
                    }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1400&auto=format&fit=crop"
                      alt="1111 Decor Work Process Showcase"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 540px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(20, 20, 20, 0.15)',
                      }}
                    />

                    {/* Vertical Watermark Text Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '1.75rem',
                        bottom: '2.5rem',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                        fontWeight: 400,
                        color: 'rgba(255, 255, 255, 0.45)',
                        letterSpacing: '0.08em',
                        textTransform: 'lowercase',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                    >
                      1111 decor
                    </div>
                  </div>
                </div>

                {/* Right Column: Step 02 & Step 04 Floating Cards */}
                <div
                  ref={rightColRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4.5rem',
                    willChange: 'transform',
                  }}
                >
                  {renderCard(step2)}
                  {renderCard(step4)}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE VIEW (< 992px): Sequential Unpinned Vertical Flow */}
          <div className="work-process-mobile-layout">
            {/* Mobile Feature Banner */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '280px',
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '2rem',
                boxShadow: '0 15px 35px rgba(44, 34, 30, 0.16)',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop"
                alt="1111 Decor Work Process Showcase"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(20, 20, 20, 0.15)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '1.25rem',
                  bottom: '1.25rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.25rem',
                  color: 'rgba(255, 255, 255, 0.65)',
                  letterSpacing: '0.08em',
                  textTransform: 'lowercase',
                }}
              >
                1111 decor
              </div>
            </div>

            {/* Sequential Steps List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              {PROCESS_STEPS.map((step) => (
                <div key={step.number}>{renderCard(step)}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Layout Toggle Styles */}
      <style jsx global>{`
        @media (min-width: 992px) {
          .work-process-desktop-layout {
            display: block !important;
          }
          .work-process-mobile-layout {
            display: none !important;
          }
        }

        @media (max-width: 991px) {
          #work-process {
            padding: 3.5rem 1.25rem 4.5rem !important;
          }
          .work-process-header {
            margin-bottom: 1.75rem !important;
          }
          .work-process-desktop-layout {
            display: none !important;
          }
          .work-process-mobile-layout {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
