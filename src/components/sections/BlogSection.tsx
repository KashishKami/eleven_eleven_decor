'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import type { BlogPost } from '@/types/blog'
import { BlogCard } from '@/components/ui/BlogCard'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const { posts } = useBlogPosts()

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
  }, [posts])

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        backgroundColor: '#0a0a0a',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              letterSpacing: '0.22em',
              color: '#c9a96e',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            Insights &amp; Inspiration
          </span>
          <WindRevealHeading
            as="h2"
            className="heading-lg"
            style={{ color: '#ffffff', marginBottom: '1.25rem' }}
          >
            Latest Editorial Stories
          </WindRevealHeading>
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
          {posts.slice(0, 3).map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
