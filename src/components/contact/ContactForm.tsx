'use client'

import React, { useState } from 'react'
import {
  EVENT_TYPE_OPTIONS,
  validateContactForm,
  type ContactFormData,
} from '@/data/contact'

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const validation = validateContactForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)

    try {
      // NEXT_PUBLIC_CONTACT_API_URL is the full URL to the PHP endpoint.
      //
      // Local dev  → http://127.0.0.1:8080/api/contact.php
      //   (PHP server root = php-admin/, so path starts at /api/)
      //
      // GoDaddy    → https://yourdomain.com/php-admin/api/contact.php
      //   (Set NEXT_PUBLIC_CONTACT_API_URL in .env.production before building)
      const contactApiUrl =
        process.env.NEXT_PUBLIC_CONTACT_API_URL ||
        'http://127.0.0.1:8080/api/contact.php'

      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // Honeypot field — always empty from real users; bots fill it in
          website: '',
        }),
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        // Server-side validation errors (422) — map back to field errors
        if (json.errors && typeof json.errors === 'object') {
          setErrors(json.errors as Partial<Record<keyof ContactFormData, string>>)
        } else {
          setSubmitError(
            json.error ||
              'Something went wrong. Please try again or contact us directly by phone.'
          )
        }
        return
      }

      // ── SUCCESS ──────────────────────────────────────────────────────────────
      setIsSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        message: '',
      })
      setErrors({})
    } catch {
      setSubmitError(
        'Unable to reach our server. Please check your connection and try again, or call us directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#161616',
        padding: 'clamp(2rem, 4vw, 3rem)',
        borderRadius: '12px',
        border: '1px solid rgba(201, 169, 110, 0.25)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <span
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent, #c9a96e)',
            fontWeight: 600,
            display: 'block',
            marginBottom: '0.35rem',
          }}
        >
          Direct Reservation Inquiry
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display, Cormorant Garamond, serif)',
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            color: '#ffffff',
            fontWeight: 400,
            margin: 0,
          }}
        >
          Share Your Celebration Details
        </h3>
      </div>

      {isSubmitted && (
        <div
          data-testid="contact-success-toast"
          style={{
            marginBottom: '2rem',
            padding: '1.25rem 1.5rem',
            backgroundColor: 'rgba(201, 169, 110, 0.15)',
            border: '1px solid var(--color-accent, #c9a96e)',
            borderRadius: '6px',
            color: '#f5f0e8',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '1.5rem', color: 'var(--color-accent, #c9a96e)', lineHeight: 1 }}>
            ✓
          </span>
          <div>
            <h4
              style={{
                margin: '0 0 0.25rem 0',
                color: 'var(--color-accent, #c9a96e)',
                fontFamily: 'var(--font-display, serif)',
                fontSize: '1.25rem',
              }}
            >
              Thank You! Your Inquiry Has Been Received.
            </h4>
            <p style={{ margin: 0, fontSize: '0.925rem', color: '#ded6ca', lineHeight: 1.5 }}>
              Our executive planning and styling team will review your requirements and get in touch with you shortly.
            </p>
          </div>
        </div>
      )}

      {submitError && (
        <div
          data-testid="contact-error-toast"
          style={{
            marginBottom: '2rem',
            padding: '1.25rem 1.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '6px',
            color: '#f5f0e8',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '1.5rem', color: '#ef4444', lineHeight: 1 }}>⚠</span>
          <div>
            <h4
              style={{
                margin: '0 0 0.25rem 0',
                color: '#ef4444',
                fontFamily: 'var(--font-display, serif)',
                fontSize: '1.1rem',
              }}
            >
              Submission Failed
            </h4>
            <p style={{ margin: 0, fontSize: '0.925rem', color: '#ded6ca', lineHeight: 1.5 }}>
              {submitError}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* 1. Full Name */}
          <div>
            <label
              htmlFor="contact-name"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#b0a89d',
                fontWeight: 600,
              }}
            >
              Full Name *
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Victoria Sterling"
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                backgroundColor: '#202020',
                border: errors.name
                  ? '1px solid #ef4444'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                outline: 'none',
                transition: 'border-color 0.25s ease',
              }}
            />
            {errors.name && (
              <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
                {errors.name}
              </span>
            )}
          </div>

          {/* 2. Phone */}
          <div>
            <label
              htmlFor="contact-phone"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#b0a89d',
                fontWeight: 600,
              }}
            >
              Phone Number *
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                backgroundColor: '#202020',
                border: errors.phone
                  ? '1px solid #ef4444'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                outline: 'none',
                transition: 'border-color 0.25s ease',
              }}
            />
            {errors.phone && (
              <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
                {errors.phone}
              </span>
            )}
          </div>

          {/* 3. Email */}
          <div>
            <label
              htmlFor="contact-email"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#b0a89d',
                fontWeight: 600,
              }}
            >
              Email Address *
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="victoria@example.com"
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                backgroundColor: '#202020',
                border: errors.email
                  ? '1px solid #ef4444'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                outline: 'none',
                transition: 'border-color 0.25s ease',
              }}
            />
            {errors.email && (
              <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* 4. Event Type */}
          <div>
            <label
              htmlFor="contact-event-type"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#b0a89d',
                fontWeight: 600,
              }}
            >
              Event Type *
            </label>
            <select
              id="contact-event-type"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                backgroundColor: '#202020',
                border: errors.eventType
                  ? '1px solid #ef4444'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                color: formData.eventType ? '#ffffff' : '#888888',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                outline: 'none',
                transition: 'border-color 0.25s ease',
                cursor: 'pointer',
              }}
            >
              <option value="" disabled>
                Select Celebration Type...
              </option>
              {EVENT_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt} style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.eventType && (
              <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
                {errors.eventType}
              </span>
            )}
          </div>

          {/* 5. Event Date */}
          <div>
            <label
              htmlFor="contact-event-date"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#b0a89d',
                fontWeight: 600,
              }}
            >
              Event Date *
            </label>
            <input
              id="contact-event-date"
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                backgroundColor: '#202020',
                border: errors.eventDate
                  ? '1px solid #ef4444'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                outline: 'none',
                transition: 'border-color 0.25s ease',
              }}
            />
            {errors.eventDate && (
              <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
                {errors.eventDate}
              </span>
            )}
          </div>

          {/* 6. Guest Count */}
          <div>
            <label
              htmlFor="contact-guest-count"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#b0a89d',
                fontWeight: 600,
              }}
            >
              Estimated Guest Count *
            </label>
            <input
              id="contact-guest-count"
              type="number"
              min="1"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="e.g. 250"
              style={{
                width: '100%',
                padding: '0.9rem 1.15rem',
                backgroundColor: '#202020',
                border: errors.guestCount
                  ? '1px solid #ef4444'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body, DM Sans, sans-serif)',
                outline: 'none',
                transition: 'border-color 0.25s ease',
              }}
            />
            {errors.guestCount && (
              <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
                {errors.guestCount}
              </span>
            )}
          </div>
        </div>

        {/* 7. Budget Range (Optional) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="contact-budget"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#b0a89d',
              fontWeight: 600,
            }}
          >
            Budget Range (Optional)
          </label>
          <input
            id="contact-budget"
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. ₹5,00,000 – ₹10,00,000 / Flexible"
            style={{
              width: '100%',
              padding: '0.9rem 1.15rem',
              backgroundColor: '#202020',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-body, DM Sans, sans-serif)',
              outline: 'none',
              transition: 'border-color 0.25s ease',
            }}
          />
        </div>

        {/* 8. Message */}
        <div style={{ marginBottom: '2rem' }}>
          <label
            htmlFor="contact-message"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#b0a89d',
              fontWeight: 600,
            }}
          >
            Tell Us About Your Vision *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe venue location, decor aesthetic, floral themes, production needs, or any specific inspirations..."
            style={{
              width: '100%',
              padding: '0.9rem 1.15rem',
              backgroundColor: '#202020',
              border: errors.message
                ? '1px solid #ef4444'
                : '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-body, DM Sans, sans-serif)',
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 0.25s ease',
            }}
          />
          {errors.message && (
            <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '1.15rem 2rem',
            backgroundColor: 'var(--color-accent, #c9a96e)',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '6px',
            fontFamily: 'var(--font-body, DM Sans, sans-serif)',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: '0 4px 15px rgba(201, 169, 110, 0.3)',
          }}
        >
          {isSubmitting ? 'Sending Reservation Request...' : 'Send Message / Plan Your Event'}
        </button>
      </form>
    </div>
  )
}
