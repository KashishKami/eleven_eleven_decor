'use client'

import { useState, useEffect } from 'react'
import type { BlogPost } from '@/types/blog'
import { BLOG_DATA } from '@/data/blog'

export interface FetchBlogPostResult {
  post: BlogPost | null
  error: string | null
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

/**
 * Direct async fetcher for a single blog post by slug
 */
export async function fetchBlogPost(slug: string): Promise<FetchBlogPostResult> {
  try {
    const response = await fetch(`${API_BASE}/api/blog-post.php?slug=${encodeURIComponent(slug)}`)
    if (!response.ok) {
      return { post: null, error: 'Post not found' }
    }
    const data = await response.json()
    if (data && typeof data === 'object' && !data.error) {
      return { post: data, error: null }
    }
    return { post: null, error: data?.error || 'Post not found' }
  } catch {
    return { post: null, error: 'Failed to load post' }
  }
}

/**
 * React hook to fetch a single blog post with fallback to seed data
 */
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError('Invalid slug')
      return
    }

    let isMounted = true
    setLoading(true)

    fetchBlogPost(slug)
      .then((res) => {
        if (!isMounted) return
        if (res.post) {
          setPost(res.post)
          setError(null)
        } else {
          // Fallback to static seed data
          const found = BLOG_DATA.find((p) => p.slug === slug)
          if (found) {
            setPost(found)
            setError(null)
          } else {
            setPost(null)
            setError('Post not found')
          }
        }
      })
      .catch(() => {
        if (!isMounted) return
        const found = BLOG_DATA.find((p) => p.slug === slug)
        if (found) {
          setPost(found)
          setError(null)
        } else {
          setPost(null)
          setError('Post not found')
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [slug])

  return { post, loading, error }
}
