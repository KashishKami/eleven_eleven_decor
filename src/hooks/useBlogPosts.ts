'use client'

import { useState, useEffect } from 'react'
import type { BlogPost } from '@/types/blog'
import { BLOG_DATA } from '@/data/blog'

export interface FetchBlogPostsResult {
  posts: BlogPost[]
  error: string | null
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

/**
 * Direct async fetcher for blog posts with optional category filter
 */
export async function fetchBlogPosts(category?: string): Promise<FetchBlogPostsResult> {
  const endpoint = category ? `/api/blogs.php?category=${encodeURIComponent(category)}` : '/api/blogs.php'
  const url = `${API_BASE}${endpoint}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return { posts: [], error: 'Failed to load posts' }
    }
    const data = await response.json()
    if (Array.isArray(data)) {
      return { posts: data, error: null }
    }
    return { posts: [], error: 'Invalid response format' }
  } catch {
    return { posts: [], error: 'Failed to load posts' }
  }
}

/**
 * React hook to fetch blog posts on mount with fallback to seed data when local API is unconfigured
 */
export function useBlogPosts(category?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetchBlogPosts(category)
      .then((res) => {
        if (!isMounted) return
        if (res.posts.length > 0) {
          setPosts(res.posts)
          setError(null)
        } else if (res.error) {
          // Fallback to static seed data filtered by category if PHP endpoint is unavailable during static dev
          const filteredSeed = category
            ? BLOG_DATA.filter((p) => p.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase() || p.category.toLowerCase() === category.toLowerCase())
            : BLOG_DATA
          setPosts(filteredSeed)
          setError(null)
        } else {
          setPosts([])
          setError(null)
        }
      })
      .catch(() => {
        if (!isMounted) return
        const filteredSeed = category
          ? BLOG_DATA.filter((p) => p.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase() || p.category.toLowerCase() === category.toLowerCase())
          : BLOG_DATA
        setPosts(filteredSeed)
        setError(null)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [category])

  return { posts, loading, error }
}
