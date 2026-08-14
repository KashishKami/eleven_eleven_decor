'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/data/blog'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  if (!post) return null

  return (
    <article
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            color: '#c9a96e',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            border: '1px solid rgba(201, 169, 110, 0.3)',
          }}
        >
          {post.category}
        </div>
      </div>

      <div
        style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            color: '#8a8275',
            fontSize: '0.8rem',
            marginBottom: '0.75rem',
          }}
        >
          {post.date} &bull; {post.readTime}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            color: '#1a1a1a',
            marginBottom: '0.75rem',
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            color: '#5a544c',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            flexGrow: 1,
          }}
        >
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          style={{
            color: '#c9a96e',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          Read Article &rarr;
        </Link>
      </div>
    </article>
  )
}
