import { describe, it, expect } from 'vitest'
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/schemaGenerators'

describe('SEO Schema Engine (W-901)', () => {
  it('generates valid Organization schema', () => {
    const schema = generateOrganizationSchema()
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Organization')
    expect(schema.name).toBe('11:11 Decor')
    expect(schema.url).toBe('https://1111decor.com/')
    expect(schema.logo).toBeDefined()
  })

  it('generates valid LocalBusiness schema with NAP and hours', () => {
    const schema = generateLocalBusinessSchema()
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('LocalBusiness')
    expect(schema.name).toBe('11:11 Decor')
    expect(schema.telephone).toBe('+917466854475')
    expect(schema.address).toBeDefined()
    expect(schema.openingHoursSpecification).toBeInstanceOf(Array)
  })

  it('generates valid Service schema for service detail pages', () => {
    const serviceData = {
      name: 'Wedding Decoration',
      description: 'Bespoke mandap, floral stage, and luxury aisle decor in Dehradun.',
      slug: 'wedding-decoration',
    }

    const schema = generateServiceSchema(serviceData)
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Service')
    expect(schema.name).toBe('Wedding Decoration')
    expect(schema.description).toBe(serviceData.description)
    expect(schema.provider).toBeDefined()
    expect(schema.url).toContain('/services/wedding-decoration/')
  })

  it('generates valid FAQPage schema from question-answer pairs', () => {
    const faqs = [
      {
        question: 'How early should we book 11:11 Decor?',
        answer: 'We recommend booking 3 to 6 months in advance.',
      },
      {
        question: 'Do you manage destination weddings in Mussoorie?',
        answer: 'Yes, we manage luxury destination weddings across Uttarakhand.',
      },
    ]

    const schema = generateFAQSchema(faqs)
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity).toBeInstanceOf(Array)
    expect(schema.mainEntity).toHaveLength(2)

    const firstFaq = schema.mainEntity[0]
    expect(firstFaq).toBeDefined()
    if (firstFaq) {
      expect(firstFaq['@type']).toBe('Question')
      expect(firstFaq.name).toBe(faqs[0]?.question)
      expect(firstFaq.acceptedAnswer['@type']).toBe('Answer')
      expect(firstFaq.acceptedAnswer.text).toBe(faqs[0]?.answer)
    }
  })

  it('generates valid Article / BlogPosting schema', () => {
    const article = {
      title: 'Top Wedding Decor Trends in 2026',
      description: 'Explore the leading wedding aesthetics and floral staging concepts.',
      slug: 'top-wedding-decor-trends-2026',
      category: 'wedding-planning',
      datePublished: '2026-08-25',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      author: '11:11 Decor Design Studio',
    }

    const schema = generateArticleSchema(article)
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('BlogPosting')
    expect(schema.headline).toBe(article.title)
    expect(schema.description).toBe(article.description)
    expect(schema.datePublished).toBe('2026-08-25')
    expect(schema.author.name).toBe('11:11 Decor Design Studio')
  })

  it('generates valid BreadcrumbList schema', () => {
    const breadcrumbs = [
      { name: 'Home', url: 'https://1111decor.com/' },
      { name: 'Services', url: 'https://1111decor.com/services/' },
      { name: 'Wedding Decoration', url: 'https://1111decor.com/services/wedding-decoration/' },
    ]

    const schema = generateBreadcrumbSchema(breadcrumbs)
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toBeInstanceOf(Array)
    expect(schema.itemListElement).toHaveLength(3)

    const firstItem = schema.itemListElement[0]
    const thirdItem = schema.itemListElement[2]
    expect(firstItem?.position).toBe(1)
    expect(firstItem?.name).toBe('Home')
    expect(thirdItem?.position).toBe(3)
  })
})
