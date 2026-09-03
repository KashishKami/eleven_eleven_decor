'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/types/blog'
import { resolveImageUrl } from '@/lib/image-url'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  if (!post) return null

  const categorySlug = post.category ? post.category.toLowerCase().replace(/\s+/g, '-') : 'general'
  const postUrl = `/blog/${categorySlug}/${post.slug}/`

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
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
          src={resolveImageUrl(post.image)}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: 'rgba(26, 26, 26, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#c9a96e',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
          }}
        >
          {post.categoryName || post.category.replace(/-/g, ' ')}
        </div>
      </div>

      <div
        style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              color: '#8a8275',
              fontSize: '0.8rem',
              fontWeight: 500,
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: '#1a1a1a',
              lineHeight: 1.3,
              marginBottom: '0.75rem',
              fontWeight: 600,
            }}
          >
            <Link
              href={postUrl}
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {post.title}
            </Link>
          </h3>

          <p
            style={{
              color: '#5a544c',
              fontSize: '0.925rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </p>
        </div>

        <Link
          href={postUrl}
          style={{
            color: '#c9a96e',
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: 'auto',
          }}
        >
          <span>Read Article</span>
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>&rarr;</span>
        </Link>
      </div>
    </article>
  )
}
