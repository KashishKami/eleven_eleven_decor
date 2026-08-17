'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface WindRevealHeadingProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  style?: React.CSSProperties
}

export function WindRevealHeading({
  children,
  as: Component = 'h2',
  className = '',
  style = {},
}: WindRevealHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    let ctx: gsap.Context | undefined

    const timer = setTimeout(() => {
      if (!containerRef.current) return
      const chars = containerRef.current.querySelectorAll('.wind-char')
      if (!chars.length) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            x: 100, // Starts 100px to the RIGHT
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            x: 0, // Sweeps leftwards into final position
            filter: 'blur(0px)',
            duration: 0.75,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            },
          }
        )
      }, containerRef)
    }, 20)

    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [children])

  // Split text into words and individual characters
  const words = children.split(' ')

  const headingContent = words.map((word, wordIdx) => (
    <span
      key={`word-${wordIdx}-${word}`}
      style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        marginRight: wordIdx < words.length - 1 ? '0.3em' : '0',
      }}
    >
      {Array.from(word).map((char, charIdx) => (
        <span
          key={`char-${wordIdx}-${charIdx}-${char}`}
          className="wind-char"
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter',
          }}
        >
          {char}
        </span>
      ))}
      {wordIdx < words.length - 1 && ' '}
    </span>
  ))

  return React.createElement(
    Component,
    {
      ref: containerRef,
      className,
      style: {
        display: 'inline-block',
        ...style,
      },
    },
    headingContent
  )
}
