'use client'

import { useState, useEffect } from 'react'
import type { GalleryItem } from '@/data/gallery'

export interface FetchGalleryResult {
  items: GalleryItem[]
  error: string | null
}

export async function fetchGalleryItems(category?: string): Promise<FetchGalleryResult> {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  const baseUrl = isLocal ? 'http://127.0.0.1:8080' : ''
  const url = `${baseUrl}/api/gallery.php${category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      return { items: [], error: `Failed to fetch: ${res.statusText}` }
    }
    const data = await res.json()
    if (Array.isArray(data)) {
      return { items: data, error: null }
    }
    return { items: [], error: 'Invalid response format' }
  } catch (err) {
    return { items: [], error: err instanceof Error ? err.message : 'Network error' }
  }
}

export function useGallery(initialItems: GalleryItem[] = [], category?: string) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetchGalleryItems(category)
      .then((res) => {
        if (!isMounted) return
        setItems(res.items)
        setError(res.error)
      })
      .catch((err) => {
        if (!isMounted) return
        setItems([])
        setError(err instanceof Error ? err.message : 'Failed to load gallery')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [category])

  return { items, loading, error }
}
