export interface ContactInfo {
  brandName: string
  headline: string
  subtitle: string
  address: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
    formatted: string
  }
  phone: {
    display: string
    href: string
  }
  whatsapp: {
    display: string
    href: string
  }
  email: {
    display: string
    href: string
  }
  hours: string
  mapEmbedUrl: string
}

export const CONTACT_INFO: ContactInfo = {
  brandName: '11:11 Decor',
  headline: "Let's Plan Your Event",
  subtitle:
    'Whether you are envisioning a grand palace wedding, a refined corporate gala, or an intimate private gathering, our team in Dehradun is dedicated to orchestrating every nuance with impeccable artistry.',
  address: {
    street: '123 Rajpur Road',
    city: 'Dehradun',
    state: 'Uttarakhand',
    postalCode: '248001',
    country: 'India',
    formatted: '123 Rajpur Road, Dehradun, Uttarakhand 248001, India',
  },
  phone: {
    display: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  whatsapp: {
    display: '+91 98765 43210',
    href: 'https://wa.me/919876543210?text=Hello%2011:11%20Decor,%20I%20would%20like%20to%20inquire%20about%20event%20planning%20and%20decor%20services.',
  },
  email: {
    display: 'contact@1111decor.com',
    href: 'mailto:contact@1111decor.com',
  },
  hours: 'Monday – Sunday: 9:00 AM – 8:00 PM IST',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110204.74637233604!2d77.962884!3d30.3164945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x4c35b5638b4f7e0!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
}

export const EVENT_TYPE_OPTIONS = [
  'Wedding',
  'Corporate',
  'Birthday',
  'Engagement',
  'Theme Party',
  'Private Dinner',
  'Other',
] as const

export type EventType = (typeof EVENT_TYPE_OPTIONS)[number]

export interface ContactFormData {
  name: string
  phone: string
  email: string
  eventType: string
  eventDate: string
  guestCount: string
  budget?: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: Partial<Record<keyof ContactFormData, string>>
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {}

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Full name is required'
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.phone = 'Phone number is required'
  } else {
    const digitsOnly = data.phone.replace(/\D/g, '')
    if (digitsOnly.length < 7) {
      errors.phone = 'Please enter a valid phone number'
    }
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email address is required'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }
  }

  if (!data.eventType || data.eventType.trim().length === 0) {
    errors.eventType = 'Please select an event type'
  }

  if (!data.eventDate || data.eventDate.trim().length === 0) {
    errors.eventDate = 'Event date is required'
  }

  if (!data.guestCount || data.guestCount.trim().length === 0) {
    errors.guestCount = 'Estimated guest count is required'
  } else {
    const num = Number(data.guestCount)
    if (isNaN(num) || num <= 0) {
      errors.guestCount = 'Guest count must be greater than 0'
    }
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Please provide details about your event vision'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
