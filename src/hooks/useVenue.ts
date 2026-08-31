'use client'

import { useState, useEffect } from 'react'
import type { VenueItem } from '@/data/venues'
import { VENUES_DATA } from '@/data/venues'

export interface FetchVenueResult {
  venue: VenueItem | null
  error: string | null
}

/**
 * Direct async fetcher for a single venue by slug
 */
export async function fetchVenue(slug: string): Promise<FetchVenueResult> {
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  const baseUrl = isLocal ? 'http://127.0.0.1:8080' : ''
  const url = `${baseUrl}/api/venues.php?slug=${encodeURIComponent(slug)}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      const fallback = VENUES_DATA.find((v) => v.slug === slug)
      if (fallback) {
        return { venue: fallback, error: null }
      }
      return { venue: null, error: `Venue not found` }
    }
    const data = await res.json()
    if (data && typeof data === 'object' && !data.error) {
      return { venue: data as VenueItem, error: null }
    }
    return { venue: null, error: data?.error || 'Venue not found' }
  } catch (err) {
    const fallback = VENUES_DATA.find((v) => v.slug === slug)
    if (fallback) {
      return { venue: fallback, error: null }
    }
    return { venue: null, error: err instanceof Error ? err.message : 'Network error' }
  }
}

/**
 * React hook to fetch a single venue with loading and error state
 */
export function useVenue(slug: string, initialVenue?: VenueItem | null) {
  const [venue, setVenue] = useState<VenueItem | null>(initialVenue || null)
  const [loading, setLoading] = useState<boolean>(!initialVenue)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError('Invalid slug')
      return
    }

    let isMounted = true

    fetchVenue(slug)
      .then((res) => {
        if (!isMounted) return
        if (res.venue) {
          setVenue(res.venue)
          setError(null)
        } else {
          setVenue(null)
          setError(res.error || 'Venue not found')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        setVenue(null)
        setError(err instanceof Error ? err.message : 'Failed to load venue')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [slug])

  return { venue, loading, error }
}
