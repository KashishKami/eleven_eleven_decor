import { describe, it, expect } from 'vitest'
import {
  CONTACT_INFO,
  EVENT_TYPE_OPTIONS,
  validateContactForm,
  type ContactFormData,
} from '@/data/contact'

describe('Contact Page Data & Validation (W-801)', () => {
  it('exports complete brand contact details', () => {
    expect(CONTACT_INFO.brandName).toBe('11:11 Decor')
    expect(CONTACT_INFO.address.street).toContain('Doon Express Business Park Rd')
    expect(CONTACT_INFO.address.city).toBe('Dehradun')
    expect(CONTACT_INFO.address.state).toBe('Uttarakhand')
    expect(CONTACT_INFO.phone.display).toBe('+91 98765 43210')
    expect(CONTACT_INFO.phone.href).toBe('tel:+919876543210')
    expect(CONTACT_INFO.whatsapp.href).toContain('wa.me/919876543210')
    expect(CONTACT_INFO.email.display).toBe('1111decorjd@gmail.com')
    expect(CONTACT_INFO.hours).toContain('10:00 AM')
    expect(CONTACT_INFO.mapEmbedUrl).toBeDefined()
  })

  it('exports standard event type options matching Section 14 spec', () => {
    expect(EVENT_TYPE_OPTIONS).toContain('Wedding')
    expect(EVENT_TYPE_OPTIONS).toContain('Corporate')
    expect(EVENT_TYPE_OPTIONS).toContain('Birthday')
    expect(EVENT_TYPE_OPTIONS).toContain('Engagement')
    expect(EVENT_TYPE_OPTIONS).toContain('Theme Party')
    expect(EVENT_TYPE_OPTIONS).toContain('Private Dinner')
    expect(EVENT_TYPE_OPTIONS).toContain('Other')
    expect(EVENT_TYPE_OPTIONS.length).toBeGreaterThanOrEqual(7)
  })

  it('validates a complete, valid contact form submission', () => {
    const validData: ContactFormData = {
      name: 'Priya Verma',
      phone: '+91 98765 43210',
      email: 'priya@example.com',
      eventType: 'Wedding',
      eventDate: '2026-12-15',
      guestCount: '200',
      budget: '₹5,00,000 - ₹10,00,000',
      message: 'Need full wedding and floral styling in Dehradun.',
    }

    const result = validateContactForm(validData)
    expect(result.isValid).toBe(true)
    expect(Object.keys(result.errors)).toHaveLength(0)
  })

  it('flags missing required fields and invalid formats', () => {
    const invalidData: Partial<ContactFormData> = {
      name: '',
      phone: '123',
      email: 'invalid-email',
      eventType: '',
      eventDate: '',
      guestCount: '-5',
      message: '',
    }

    const result = validateContactForm(invalidData)
    expect(result.isValid).toBe(false)
    expect(result.errors.name).toBeDefined()
    expect(result.errors.phone).toBeDefined()
    expect(result.errors.email).toBeDefined()
    expect(result.errors.eventType).toBeDefined()
    expect(result.errors.eventDate).toBeDefined()
    expect(result.errors.guestCount).toBeDefined()
    expect(result.errors.message).toBeDefined()
  })

  it('permits optional budget field to be omitted or empty', () => {
    const dataWithoutBudget: ContactFormData = {
      name: 'Rohan Gupta',
      phone: '9876543210',
      email: 'rohan@example.com',
      eventType: 'Corporate',
      eventDate: '2026-11-20',
      guestCount: '100',
      budget: '',
      message: 'Annual corporate celebration setup needed.',
    }

    const result = validateContactForm(dataWithoutBudget)
    expect(result.isValid).toBe(true)
    expect(result.errors.budget).toBeUndefined()
  })
})
