'use client'

import React, { useEffect, useRef } from 'react'
import { STATS_DATA } from '@/data/stats'
import { counterAnimation } from '@/lib/animations'

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const animatedRef = useRef<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true
            STATS_DATA.forEach((stat) => {
              const el = document.getElementById(`stat-number-${stat.id}`)
              if (el) {
                counterAnimation(el, stat.value)
              }
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundColor: '#0f0f0f',
        borderBlock: '1px solid rgba(201, 169, 110, 0.2)',
      }}
    >
      <div className="container">
        <div className="grid-responsive-4" style={{ textAlign: 'center' }}>
          {STATS_DATA.map((stat) => (
            <div key={stat.id} style={{ padding: '1rem' }}>
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                }}
              >
                <span id={`stat-number-${stat.id}`}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p
                className="body-md"
                style={{
                  color: 'var(--color-secondary)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontSize: '0.875rem',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
