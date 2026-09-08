'use client'

import { useState, useEffect } from 'react'
import type { PageVisibility } from '@/types/page-visibility'

const STORAGE_KEY = '1111_page_visibility'
const SYNC_EVENT = '1111_page_visibility_updated'

const DEFAULT_VISIBILITY: PageVisibility = {
  blog: false,
  gallery: false,
  portfolio: false,
  venues: false,
}

function getStoredVisibility(fallback?: PageVisibility): PageVisibility {
  if (typeof window === 'undefined') {
    return fallback || DEFAULT_VISIBILITY
  }
  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      return {
        blog: Boolean(parsed.blog),
        gallery: Boolean(parsed.gallery),
        portfolio: Boolean(parsed.portfolio),
        venues: Boolean(parsed.venues),
      }
    }
  } catch {
    // Ignore JSON/Storage errors
  }
  return fallback || DEFAULT_VISIBILITY
}

function applyHtmlAttributes(v: PageVisibility) {
  if (typeof document === 'undefined') return
  const doc = document.documentElement
  ;(['blog', 'gallery', 'portfolio', 'venues'] as const).forEach((key) => {
    doc.setAttribute(`data-visibility-${key}`, v[key] ? 'true' : 'false')
  })
}

let activeFetchPromise: Promise<PageVisibility | null> | null = null

async function fetchPageVisibilityApi(): Promise<PageVisibility | null> {
  if (typeof window === 'undefined') return null
  try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    const url = isLocal ? 'http://127.0.0.1:8080/api/page-visibility.php' : '/php-admin/api/page-visibility.php'
    const res = await fetch(url, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (data && typeof data === 'object') {
        return {
          blog: Boolean(data.blog),
          gallery: Boolean(data.gallery),
          portfolio: Boolean(data.portfolio),
          venues: Boolean(data.venues),
        }
      }
    }
  } catch {
    // Network failure
  }
  return null
}

export function usePageVisibility(initialFallback?: PageVisibility) {
  const [visibility, setVisibility] = useState<PageVisibility>(() => {
    const initial = getStoredVisibility(initialFallback)
    applyHtmlAttributes(initial)
    return initial
  })

  useEffect(() => {
    let isMounted = true

    // Listen for sync updates from other components
    const handleSync = (e: CustomEvent<PageVisibility>) => {
      if (isMounted && e.detail) {
        setVisibility(e.detail)
        applyHtmlAttributes(e.detail)
      }
    }

    window.addEventListener(SYNC_EVENT as unknown as string, handleSync as EventListener)

    // Deduplicated API fetch
    if (!activeFetchPromise) {
      activeFetchPromise = fetchPageVisibilityApi()
    }

    activeFetchPromise.then((fresh) => {
      activeFetchPromise = null
      if (fresh && isMounted) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
        } catch {
          // ignore
        }
        applyHtmlAttributes(fresh)
        setVisibility(fresh)
        window.dispatchEvent(new CustomEvent<PageVisibility>(SYNC_EVENT, { detail: fresh }))
      }
    })

    return () => {
      isMounted = false
      window.removeEventListener(SYNC_EVENT as unknown as string, handleSync as EventListener)
    }
  }, [])

  return visibility
}
