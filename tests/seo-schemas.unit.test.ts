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
      category: 'weddings',
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

  describe('Comprehensive Linked Graph Schemas (W-706)', () => {
    it('generates a full multi-entity @graph for Homepage with all 9 requested schemas', async () => {
      const { generateHomePageSchemaGraph } = await import('@/lib/schemaGenerators')
      const graphObj = generateHomePageSchemaGraph()
      expect(graphObj['@context']).toBe('https://schema.org')
      expect(graphObj['@graph']).toBeInstanceOf(Array)

      const graph = graphObj['@graph'] as Record<string, any>[]
      const types = graph.map((item) => item['@type'])

      // 1. Organization
      expect(types).toContain('Organization')
      const org = graph.find((item) => item['@type'] === 'Organization')
      expect(org).toBeDefined()
      expect(org?.['name']).toBe('11:11 Decor')
      expect(org?.['sameAs']).toBeInstanceOf(Array)
      expect(org?.['sameAs'].length).toBeGreaterThanOrEqual(3)
      expect(org?.['contactPoint'].areaServed).toBeDefined()

      // 2. LocalBusiness
      expect(types).toContain('LocalBusiness')
      const biz = graph.find((item) => item['@type'] === 'LocalBusiness')
      expect(biz).toBeDefined()
      expect(biz?.['telephone']).toBe('+917466854475')
      expect(biz?.['address']).toBeDefined()
      expect(biz?.['geo'].latitude).toBeDefined()
      expect(biz?.['openingHoursSpecification']).toBeInstanceOf(Array)
      expect(biz?.['areaServed']).toBeDefined()

      // 3. WebSite
      expect(types).toContain('WebSite')
      const webSite = graph.find((item) => item['@type'] === 'WebSite')
      expect(webSite).toBeDefined()
      expect(webSite?.['url']).toBe('https://1111decor.com/')
      expect(webSite?.['potentialAction']).toBeDefined()

      // 4. WebPage
      expect(types).toContain('WebPage')
      const webPage = graph.find((item) => item['@type'] === 'WebPage')
      expect(webPage).toBeDefined()
      expect(webPage?.['url']).toBe('https://1111decor.com/')

      // 5. BreadcrumbList
      expect(types).toContain('BreadcrumbList')

      // 6. Service relationships / OfferCatalog
      expect(types).toContain('Service')
      const service = graph.find((item) => item['@type'] === 'Service')
      expect(service).toBeDefined()
      expect(service?.['hasOfferCatalog']).toBeDefined()
      expect(service?.['hasOfferCatalog'].itemListElement.length).toBeGreaterThanOrEqual(10)

      // 7. FAQPage
      expect(types).toContain('FAQPage')
      const faq = graph.find((item) => item['@type'] === 'FAQPage')
      expect(faq).toBeDefined()
      expect(faq?.['mainEntity'].length).toBeGreaterThanOrEqual(5)
    })

    it('generates valid About, Contact, Menu, and Team schema graphs', async () => {
      const {
        generateAboutPageSchemaGraph,
        generateContactPageSchemaGraph,
        generateMenuPageSchemaGraph,
        generateTeamPageSchemaGraph,
      } = await import('@/lib/schemaGenerators')

      const aboutGraph = generateAboutPageSchemaGraph()
      const aboutTypes = (aboutGraph['@graph'] as Record<string, any>[]).map((i) => i['@type'])
      expect(aboutTypes).toEqual(expect.arrayContaining(['AboutPage', 'Organization', 'BreadcrumbList']))

      const contactGraph = generateContactPageSchemaGraph()
      const contactTypes = (contactGraph['@graph'] as Record<string, any>[]).map((i) => i['@type'])
      expect(contactTypes).toEqual(expect.arrayContaining(['ContactPage', 'LocalBusiness', 'BreadcrumbList']))

      const menuGraph = generateMenuPageSchemaGraph()
      const menuTypes = (menuGraph['@graph'] as Record<string, any>[]).map((i) => i['@type'])
      expect(menuTypes).toEqual(expect.arrayContaining(['FoodService', 'BreadcrumbList']))

      const teamGraph = generateTeamPageSchemaGraph()
      const teamTypes = (teamGraph['@graph'] as Record<string, any>[]).map((i) => i['@type'])
      expect(teamTypes).toEqual(expect.arrayContaining(['AboutPage', 'ItemList', 'BreadcrumbList']))
    })
  })
})
