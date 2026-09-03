'use client'

import { useState, useEffect } from 'react'
import type { BlogPost } from '@/types/blog'
import { BLOG_DATA } from '@/data/blog'

export interface FetchBlogPostResult {
  post: BlogPost | null
  error: string | null
}

export async function fetchBlogPost(slug: string): Promise<FetchBlogPostResult> {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  const baseUrl = isLocal ? 'http://127.0.0.1:8080' : ''
  const apiPath = isLocal ? '/api/blog-post.php' : '/php-admin/api/blog-post.php'
  const url = `${baseUrl}${apiPath}?slug=${encodeURIComponent(slug)}`

  try {
    const response = await fetch(url)
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
