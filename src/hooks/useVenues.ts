'use client'

import { useState, useEffect } from 'react'
import type { VenueItem } from '@/data/venues'

export interface FetchVenuesResult {
  venues: VenueItem[]
  error: string | null
}

export async function fetchVenues(spaceType?: string): Promise<FetchVenuesResult> {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  const baseUrl = isLocal ? 'http://127.0.0.1:8080' : ''
  const endpoint = isLocal ? '/api/venues.php' : '/php-admin/api/venues.php'
  const url = `${baseUrl}${endpoint}${spaceType ? `?spaceType=${encodeURIComponent(spaceType)}` : ''}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      return { venues: [], error: `Failed to fetch: ${res.statusText}` }
    }
    const data = await res.json()
    if (Array.isArray(data)) {
      return { venues: data, error: null }
    }
    return { venues: [], error: 'Invalid response format' }
  } catch (err) {
    return { venues: [], error: err instanceof Error ? err.message : 'Network error' }
  }
}

export function useVenues(initialVenues: VenueItem[] = [], spaceType?: string) {
  const [venues, setVenues] = useState<VenueItem[]>(initialVenues)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetchVenues(spaceType)
      .then((res) => {
        if (!isMounted) return
        if (res.venues && res.venues.length > 0) {
          setVenues(res.venues)
        }
        setError(res.error)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Failed to load venues')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [spaceType])

  return { venues, loading, error }
}
