'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export function SocialFloatingSpeedDial() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const whatsappRef = useRef<HTMLDivElement>(null)
  const instaRef = useRef<HTMLDivElement>(null)
  const bounceTimeline = useRef<gsap.core.Timeline | null>(null)

  const whatsappUrl =
    'https://wa.me/917466854475?text=Hello%2011%3A11%20Decor%2C%20I%20would%20like%20to%20inquire%20about%20event%20planning%20and%20decor%20services.'
  const instagramUrl =
    'https://www.instagram.com/_11.11decor_?stkn=MXZsM3ZoOHg5dmp3Yg%3D%3D&utm_source=qr'

  // 1. GSAP Perpetual Bouncing Ball Motion (No energy loss, continuous rhythm, no deformation)
  useEffect(() => {
    if (!triggerRef.current) return

    // Continuous perpetual gravity bounce: decelerates up (power2.out), accelerates down (power2.in)
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(triggerRef.current, {
      y: -20,
      duration: 0.44,
      ease: 'power2.out',
    }).to(triggerRef.current, {
      y: 0,
      duration: 0.44,
      ease: 'power2.in',
    })

    bounceTimeline.current = tl

    return () => {
      tl.kill()
    }
  }, [])

  // 2. GSAP Expand / Collapse Staggered Animation
  useEffect(() => {
    if (!menuRef.current || !whatsappRef.current || !instaRef.current || !iconRef.current) return

    if (isOpen) {
      // Pause idle bounce while menu is open and reset Y position cleanly
      bounceTimeline.current?.pause()
      gsap.to(triggerRef.current, { y: 0, duration: 0.2, ease: 'power1.out' })

      // Rotate icon to 'close' X state
      gsap.to(iconRef.current, {
        rotate: 135,
        duration: 0.35,
        ease: 'back.out(1.8)',
      })

      // Pop-out items with spring ease
      gsap.fromTo(
        [whatsappRef.current, instaRef.current],
        { y: 25, opacity: 0, scale: 0.7 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: 'back.out(2)',
          clearProps: 'none',
        }
      )
    } else {
      // Rotate icon back to normal
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Collapse items
      gsap.to([instaRef.current, whatsappRef.current], {
        y: 15,
        opacity: 0,
        scale: 0.7,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: () => {
          // Resume perpetual bouncing seamlessly
          bounceTimeline.current?.play()
        },
      })
    }
  }, [isOpen])

  // 3. Close on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <aside
      ref={containerRef}
      aria-label="Quick Connect Menu"
      style={{
        position: 'fixed',
        bottom: 'clamp(20px, 4vw, 32px)',
        right: 'clamp(20px, 4vw, 32px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
        userSelect: 'none',
      }}
    >
      {/* ── Pop-out Sub-Buttons (Animated via GSAP) ── */}
      <div
        ref={menuRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* Instagram Option */}
        <div
          ref={instaRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          <span
            className="speed-dial-tooltip"
            style={{
              padding: '5px 12px',
              backgroundColor: 'rgba(15, 15, 15, 0.94)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '6px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              whiteSpace: 'nowrap',
            }}
          >
            Explore Instagram
          </span>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore 11:11 Decor on Instagram"
            className="speed-dial-sub-btn insta-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#ffffff',
              boxShadow: '0 8px 20px rgba(220, 39, 67, 0.5), 0 2px 8px rgba(0,0,0,0.3)',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="23"
              height="23"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
          </a>
        </div>

        {/* WhatsApp Option */}
        <div
          ref={whatsappRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          <span
            className="speed-dial-tooltip"
            style={{
              padding: '5px 12px',
              backgroundColor: 'rgba(15, 15, 15, 0.94)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '6px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              whiteSpace: 'nowrap',
            }}
          >
            Chat on WhatsApp
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with 11:11 Decor on WhatsApp"
            className="speed-dial-sub-btn whatsapp-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#25D366',
              color: '#ffffff',
              boxShadow: '0 8px 20px rgba(37, 211, 102, 0.5), 0 2px 8px rgba(0,0,0,0.3)',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="25"
              height="25"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Main Speed Dial Trigger Button with Sparkle Crest Icon ── */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close contact menu' : 'Connect with 11:11 Decor'}
        aria-expanded={isOpen}
        className="speed-dial-main-trigger"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #dfc691 0%, #c9a96e 50%, #9e7e3e 100%)',
          color: '#111111',
          border: '2px solid rgba(255, 255, 255, 0.45)',
          boxShadow: '0 8px 25px rgba(201, 169, 110, 0.5), 0 4px 14px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          padding: 0,
          outline: 'none',
          position: 'relative',
        }}
      >
        <span
          ref={iconRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform',
          }}
        >
          {isOpen ? (
            /* Close Plus/X Icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="none"
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          ) : (
            /* Luxury Message Bubble with Celestial Starburst & Stardust */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="33"
              height="33"
              fill="none"
              aria-hidden="true"
            >
              {/* Smooth Luxury Chat Bubble */}
              <path
                d="M17.5 12.5c0 3.04-2.9 5.5-6.5 5.5-1.05 0-2.03-.21-2.9-.58L4 18.5l1.23-2.7C4.47 14.83 4 13.72 4 12.5 4 9.46 6.9 7 10.5 7c3.6 0 6.5 2.46 6.5 5.5z"
                fill="#111111"
              />
              {/* Interior Champagne Gold Conversation Dots */}
              <circle cx="8" cy="12.5" r="0.9" fill="#dfc691" />
              <circle cx="10.5" cy="12.5" r="0.9" fill="#dfc691" />
              <circle cx="13" cy="12.5" r="0.9" fill="#dfc691" />

              {/* Celestial Starburst Sparkle */}
              <path
                d="M19.5 2L20.4 5.2L23.6 6.1L20.4 7L19.5 10.2L18.6 7L15.4 6.1L18.6 5.2L19.5 2Z"
                fill="#111111"
              />
              {/* Stardust Accent Dots */}
              <circle cx="22.5" cy="11.5" r="1.1" fill="#111111" />
              <circle cx="15" cy="2.5" r="0.8" fill="#111111" />
            </svg>
          )}
        </span>
      </button>

      {/* ── Hover Styles ── */}
      <style jsx>{`
        .speed-dial-main-trigger {
          transition: box-shadow 0.3s ease, filter 0.2s ease;
        }

        .speed-dial-main-trigger:hover {
          filter: brightness(1.08);
          box-shadow: 0 12px 30px rgba(201, 169, 110, 0.7), 0 6px 18px rgba(0, 0, 0, 0.5) !important;
        }

        .speed-dial-sub-btn:hover {
          transform: scale(1.12) !important;
        }

        .insta-btn:hover {
          box-shadow: 0 10px 24px rgba(220, 39, 67, 0.7), 0 4px 14px rgba(0, 0, 0, 0.45) !important;
        }

        .whatsapp-btn:hover {
          box-shadow: 0 10px 24px rgba(37, 211, 102, 0.7), 0 4px 14px rgba(0, 0, 0, 0.45) !important;
        }

        @media (max-width: 640px) {
          .speed-dial-tooltip {
            font-size: 0.72rem !important;
            padding: 4px 8px !important;
          }
        }
      `}</style>
    </aside>
  )
}
