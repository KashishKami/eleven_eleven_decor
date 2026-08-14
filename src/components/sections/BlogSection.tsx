'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BLOG_POSTS } from '@/data/blog'
import { BlogCard } from '@/components/ui/BlogCard'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="blog-section"
      ref={sectionRef}
      style={{
        backgroundColor: '#faf6f0',
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
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
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
            INSIGHTS & INSPIRATION
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: '#1a1a1a',
              letterSpacing: '0.04em',
              fontWeight: 500,
              maxWidth: '800px',
              margin: '0 auto 1.25rem',
              lineHeight: 1.2,
            }}
          >
            The 1111 Decor Journal
          </h2>
          <p
            style={{
              color: '#4a443c',
              fontSize: '1.05rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Explore expert advice, luxury event styling trends, and backstage stories from our master creators.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
