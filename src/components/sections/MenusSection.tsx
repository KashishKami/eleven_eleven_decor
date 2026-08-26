'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MENUS } from '@/data/menus'
import { MenuCard } from '@/components/ui/MenuCard'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const CATEGORIES = ['All', 'Gala Dinner', 'Cocktail', 'Wedding', 'Buffet']

export function MenusSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredMenus =
    selectedCategory === 'All'
      ? MENUS
      : MENUS.filter((m) => m.category === selectedCategory)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [selectedCategory])

  return (
    <section
      id="menus-section"
      ref={sectionRef}
      style={{
        backgroundColor: '#ede5d8',
        padding: '7rem 1.5rem',
        color: '#1a1a1a',
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
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
            SAVOR EXTRAORDINARY FLAVORS
          </p>
          <div style={{ maxWidth: '800px', margin: '0 auto 1.25rem' }}>
            <WindRevealHeading
              as="h2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                color: '#1a1a1a',
                letterSpacing: '0.04em',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Bespoke Catering & Dining Menus
            </WindRevealHeading>
          </div>
          <p
            style={{
              color: '#4a443c',
              fontSize: '1.05rem',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Curated by Michelin-trained executive chefs, using local organic ingredients to deliver multi-course culinary artistry.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3.5rem',
          }}
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  backgroundColor: isActive ? '#c9a96e' : '#ffffff',
                  color: isActive ? '#ffffff' : '#4a443c',
                  border: isActive
                    ? '1px solid #c9a96e'
                    : '1px solid rgba(0, 0, 0, 0.12)',
                  borderRadius: '30px',
                  padding: '0.6rem 1.4rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 6px 20px rgba(201, 169, 110, 0.3)' : 'none',
                }}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Menu Cards Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredMenus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      </div>
    </section>
  )
}
