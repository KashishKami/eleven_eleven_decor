'use client'

import React, { useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/data/gallery'

interface LightboxProps {
  item: GalleryItem | null
  items: GalleryItem[]
  onClose: () => void
  onNavigate: (newItem: GalleryItem) => void
}

export function Lightbox({ item, items, onClose, onNavigate }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!item) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        const currentIndex = items.findIndex((i) => i.id === item.id)
        if (currentIndex !== -1 && currentIndex < items.length - 1) {
          const nextItem = items[currentIndex + 1]
          if (nextItem) onNavigate(nextItem)
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = items.findIndex((i) => i.id === item.id)
        if (currentIndex > 0) {
          const prevItem = items[currentIndex - 1]
          if (prevItem) onNavigate(prevItem)
        }
      }
    },
    [item, items, onClose, onNavigate]
  )

  useEffect(() => {
    if (item) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [item, handleKeyDown])

  if (!item) return null

  const currentIndex = items.findIndex((i) => i.id === item.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1

  return (
    <div
      id="lightbox-modal"
      data-testid="lightbox-modal"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 10, 10, 0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '2rem',
          background: 'none',
          border: 'none',
          color: '#ffffff',
          fontSize: '2.5rem',
          cursor: 'pointer',
          lineHeight: 1,
          zIndex: 10000,
        }}
      >
        &times;
      </button>

      {/* Main Image View */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '80vh',
          width: '1000px',
          height: '650px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(201, 169, 110, 0.3)',
        }}
      >
        <Image src={item.src} alt={item.title} fill sizes="90vw" style={{ objectFit: 'contain' }} priority />
      </div>

      {/* Image Caption & Category */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '1.25rem',
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#c9a96e',
            marginBottom: '0.25rem',
          }}
        >
          {item.category}
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', margin: 0 }}>{item.title}</h3>
      </div>

      {/* Navigation Arrow Controls */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            const prevItem = items[currentIndex - 1]
            if (prevItem) onNavigate(prevItem)
          }}
          aria-label="Previous Image"
          style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(201, 169, 110, 0.4)',
            color: '#ffffff',
            fontSize: '1.75rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
        >
          &#8249;
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            const nextItem = items[currentIndex + 1]
            if (nextItem) onNavigate(nextItem)
          }}
          aria-label="Next Image"
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(201, 169, 110, 0.4)',
            color: '#ffffff',
            fontSize: '1.75rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
        >
          &#8250;
        </button>
      )}
    </div>
  )
}
