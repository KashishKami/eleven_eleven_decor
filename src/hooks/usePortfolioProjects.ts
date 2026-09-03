'use client'

import { useState, useEffect } from 'react'
import type { PortfolioProject } from '@/data/portfolio'

export interface FetchProjectsResult {
  projects: PortfolioProject[]
  error: string | null
}

export async function fetchPortfolioProjects(category?: string): Promise<FetchProjectsResult> {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  const baseUrl = isLocal ? 'http://127.0.0.1:8080' : ''
  const endpoint = isLocal ? '/api/portfolio.php' : '/php-admin/api/portfolio.php'
  const url = `${baseUrl}${endpoint}${category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      return { projects: [], error: `Failed to fetch: ${res.statusText}` }
    }
    const data = await res.json()
    if (Array.isArray(data)) {
      return { projects: data, error: null }
    }
    return { projects: [], error: 'Invalid response format' }
  } catch (err) {
    return { projects: [], error: err instanceof Error ? err.message : 'Network error' }
  }
}

export function usePortfolioProjects(initialProjects: PortfolioProject[] = [], category?: string) {
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetchPortfolioProjects(category)
      .then((res) => {
        if (!isMounted) return
        if (res.projects && res.projects.length > 0) {
          setProjects(res.projects)
        }
        setError(res.error)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [category])

  return { projects, loading, error }
}
