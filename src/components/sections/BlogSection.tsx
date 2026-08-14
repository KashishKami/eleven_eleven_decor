'use client'

import React from 'react'
import { BLOG_DATA } from '@/data/blog'
import { BlogCard } from '@/components/ui/BlogCard'

export function BlogSection() {
  return (
    <section id="blog" className="section-padding" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>
            Latest Journal
          </span>
          <h2 className="heading-lg">News & Luxury Event Insights</h2>
        </div>

        <div className="grid-responsive-3">
          {BLOG_DATA.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
