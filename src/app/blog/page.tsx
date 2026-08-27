'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import pageVisibility from '../../../php-admin/data/page-visibility.json'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import { BlogCard } from '@/components/ui/BlogCard'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { BLOG_CATEGORIES } from '@/types/blog'

export default function BlogHubPage() {
  if (!pageVisibility.blog) {
    notFound()
  }

  const [activeCategory, setActiveCategory] = useState<string>('')
  const { posts, loading } = useBlogPosts(activeCategory || undefined)

  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ede5d8', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '6rem 1.5rem 3.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p
            style={{
              color: '#c9a96e',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            EDITORIAL JOURNAL & GUIDES
          </p>

          <div style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            <WindRevealHeading
              as="h1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                color: '#1a1a1a',
                letterSpacing: '0.03em',
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              News & Insights
            </WindRevealHeading>
          </div>

          <p
            style={{
              color: '#5a544c',
              fontSize: '1.1rem',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Curated planning wisdom, backstage production insights, and couture styling trends from the 1111 Decor creative studio.
          </p>

          {/* Category Filter Navigation Pills */}
          <nav
            aria-label="Blog categories"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '2.75rem',
            }}
          >
            <button
              onClick={() => setActiveCategory('')}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '30px',
                border: activeCategory === '' ? '1px solid #c9a96e' : '1px solid rgba(0,0,0,0.1)',
                backgroundColor: activeCategory === '' ? '#c9a96e' : '#ffffff',
                color: activeCategory === '' ? '#ffffff' : '#1a1a1a',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              All Articles
            </button>

            {BLOG_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.slug
              return (
                <Link
                  key={cat.slug}
                  href={`/blog/${cat.slug}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveCategory(cat.slug)
                  }}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '30px',
                    border: isSelected ? '1px solid #c9a96e' : '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: isSelected ? '#c9a96e' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#1a1a1a',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </section>

      {/* Blog Cards Grid Section */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4.5rem 1.5rem 6rem',
        }}
      >
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  height: '420px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  opacity: 0.6,
                  animation: 'pulse 1.5s infinite',
                }}
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontSize: '1.25rem', color: '#6b6b6b' }}>No articles found in this category.</p>
            <button
              onClick={() => setActiveCategory('')}
              style={{
                marginTop: '1rem',
                color: '#c9a96e',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                textDecoration: 'underline',
              }}
            >
              View all articles
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <FooterCTA />
    </div>
  )
}
