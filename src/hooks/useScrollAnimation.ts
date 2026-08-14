'use client'

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface UseScrollAnimationOptions {
  animation: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline
  start?: string
  end?: string
  scrub?: boolean | number
  once?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions
): RefObject<T> {
  const elementRef = useRef<T>(null!)

  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return

    const el = elementRef.current
    const tween = options.animation(el)

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: options.start || 'top 85%',
      end: options.end || 'bottom 15%',
      scrub: options.scrub ?? false,
      once: options.once ?? true,
      animation: tween,
    })

    return () => {
      trigger.kill()
      tween.kill()
    }
  }, [options])

  return elementRef
}
