'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/data/blog'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div
      className="card-base"
      style={{
        backgroundColor: '#1b1b1b',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ position: 'relative', height: '240px', width: '100%' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <span
          className="label"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: 'rgba(26, 26, 26, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '0.25rem 0.875rem',
            borderRadius: '40px',
            fontSize: '0.75rem',
          }}
        >
          {post.category}
        </span>
      </div>

      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
          {post.date} • {post.readTime}
        </div>
        <h3 className="heading-sm" style={{ marginBottom: '0.75rem', color: 'var(--color-secondary)', lineHeight: 1.3 }}>
          {post.title}
        </h3>
        <p className="body-sm" style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          style={{
            color: 'var(--color-accent)',
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          Read More →
        </Link>
      </div>
    </div>
  )
}
