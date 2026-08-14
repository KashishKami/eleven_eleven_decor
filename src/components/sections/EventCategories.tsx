'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Category {
  id: string
  name: string
  title: string
  description: string
  image: string
}

const CATEGORIES: Category[] = [
  {
    id: 'corporate',
    name: 'CORPORATE',
    title: 'CORPORATE GALAS',
    description: 'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'social',
    name: 'SOCIAL EVENT',
    title: 'SOCIAL RECEPTIONS',
    description: 'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'weddings',
    name: 'WEDDINGS',
    title: 'WEDDING BANQUETS',
    description: 'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'parties',
    name: 'PARTIES',
    title: 'PRIVATE SOIRÉES',
    description: 'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
  },
]

export function EventCategories() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgTrackRef = useRef<HTMLDivElement>(null)
  const circleTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const totalSlides = CATEGORIES.length

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 0.3, // Fast, low-latency scroll reaction
          onUpdate: (self) => {
            const idx = Math.min(
              totalSlides - 1,
              Math.floor(self.progress * totalSlides)
            )
            setActiveIndex(idx)
          },
        },
      })

      // Synchronized vertical swipe for background and circle photo tracks
      for (let i = 1; i < totalSlides; i++) {
        const targetY = -(i / totalSlides) * 100

        if (bgTrackRef.current) {
          tl.to(
            bgTrackRef.current,
            {
              yPercent: targetY,
              duration: 0.8,
              ease: 'expo.inOut', // Rapid swipe during middle scroll, smooth settling
            },
            `slide-${i}`
          )
        }

        if (circleTrackRef.current) {
          tl.to(
            circleTrackRef.current,
            {
              yPercent: targetY,
              duration: 0.8,
              ease: 'expo.inOut',
            },
            `slide-${i}`
          )
        }
      }

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
    description: 'Professional Elementor adjustment with better compatibility, higher stability, and improved visual consistency.',
    image: '',
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
              src={cat.image}
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
                backgroundColor: 'rgba(15, 15, 15, 0.45)',
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
          width: 'clamp(300px, 90vw, 400px)',
          backgroundColor: 'rgba(110, 95, 80, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Inner Circular Photo Window with Pixel-Aligned Vertical Sliding Track */}
        <div
          style={{
            position: 'relative',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 1.5rem',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          }}
        >
          <div
            ref={circleTrackRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${CATEGORIES.length * 260}px`,
              display: 'flex',
              flexDirection: 'column',
              willChange: 'transform',
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={`circle-${cat.id}`}
                style={{
                  position: 'relative',
                  width: '260px',
                  height: '260px',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="260px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Category Title */}
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

        {/* Category Description */}
        <p
          className="body-sm"
          style={{
            color: '#e8e0d4',
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            maxWidth: '320px',
            marginInline: 'auto',
          }}
        >
          {currentCategory.description}
        </p>
      </div>
    </section>
  )
}
