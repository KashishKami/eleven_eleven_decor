'use client'

import { useState, useEffect } from 'react'
import type { PortfolioProject } from '@/data/portfolio'
import { PORTFOLIO_PROJECTS } from '@/data/portfolio'

export interface FetchPortfolioProjectResult {
  project: PortfolioProject | null
  error: string | null
}

/**
 * Direct async fetcher for a single portfolio project by slug
 */
export async function fetchPortfolioProject(slug: string): Promise<FetchPortfolioProjectResult> {
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  const baseUrl = isLocal ? 'http://127.0.0.1:8080' : ''
  const url = `${baseUrl}/api/portfolio.php?slug=${encodeURIComponent(slug)}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      // Check fallback to static data if present
      const fallback = PORTFOLIO_PROJECTS.find((p) => p.slug === slug)
      if (fallback) {
        return { project: fallback, error: null }
      }
      return { project: null, error: `Project not found` }
    }
    const data = await res.json()
    if (data && typeof data === 'object' && !data.error) {
      return { project: data as PortfolioProject, error: null }
    }
    return { project: null, error: data?.error || 'Project not found' }
  } catch (err) {
    // Fallback on network failure
    const fallback = PORTFOLIO_PROJECTS.find((p) => p.slug === slug)
    if (fallback) {
      return { project: fallback, error: null }
    }
    return { project: null, error: err instanceof Error ? err.message : 'Network error' }
  }
}

/**
 * React hook to fetch a single portfolio project with loading and error state
 */
export function usePortfolioProject(slug: string, initialProject?: PortfolioProject | null) {
  const [project, setProject] = useState<PortfolioProject | null>(initialProject || null)
  const [loading, setLoading] = useState<boolean>(!initialProject)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError('Invalid slug')
      return
    }

    let isMounted = true

    fetchPortfolioProject(slug)
      .then((res) => {
        if (!isMounted) return
        if (res.project) {
          setProject(res.project)
          setError(null)
        } else {
          setProject(null)
          setError(res.error || 'Project not found')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        setProject(null)
        setError(err instanceof Error ? err.message : 'Failed to load project')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [slug])

  return { project, loading, error }
}
