'use client'

import { useState, useEffect } from 'react'
import type { BlogPost } from '@/types/blog'

export interface FetchBlogPostsResult {
  posts: BlogPost[]
  error: string | null
}

export async function fetchBlogPosts(category?: string): Promise<FetchBlogPostsResult> {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  const baseUrl = isLocal ? 'http://127.0.0.1:8080' : ''
  const apiPath = isLocal ? '/api/blogs.php' : '/php-admin/api/blogs.php'
  const endpoint = category && category !== 'All' ? `${apiPath}?category=${encodeURIComponent(category)}` : apiPath
  const url = `${baseUrl}${endpoint}`

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
 * React hook to fetch blog posts on mount with fallback to seed data
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
        if (res.posts) {
          setPosts(res.posts)
          setError(res.error)
        } else {
          setPosts([])
          setError(res.error || null)
        }
      })
      .catch((err) => {
        if (!isMounted) return
        setPosts([])
        setError(err instanceof Error ? err.message : 'Failed to load posts')
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
