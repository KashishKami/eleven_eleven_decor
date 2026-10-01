import { describe, it, expect } from 'vitest'
import { analyzeSeo } from '@/admin-editor/lib/seoAnalyzer'

describe('W-902 — Dedicated Meta Title & Meta Description in SEO Analyzer', () => {
  it('passes meta description checks when custom metaDescription is 120-160 chars even if on-page excerpt is 350+ chars', () => {
    const longExcerpt =
      'This is a comprehensive overview of luxury wedding decor services provided across Dehradun, Mussoorie, and Rishikesh. We specialize in bespoke mandap architecture, floral aisle styling, ambient banquet illumination, and luxury hospitality coordination for destination celebrations and royal weddings with end-to-end bespoke management.'
    expect(longExcerpt.length).toBeGreaterThan(300)

    const customMetaDescription =
      'Luxury wedding decor in Dehradun by 11:11 Decor. Bespoke floral mandaps, ambient stage lighting, and royal styling across Uttarakhand. Book consultation.'
    expect(customMetaDescription.length).toBeGreaterThanOrEqual(120)
    expect(customMetaDescription.length).toBeLessThanOrEqual(160)

    const result = analyzeSeo({
      focusKeywords: ['wedding decor'],
      title: 'Complete Luxury Wedding Decor Framework in Dehradun',
      slug: 'luxury-wedding-decor-dehradun',
      excerpt: longExcerpt,
      metaDescription: customMetaDescription,
      content: '<p>wedding decor planning...</p>',
      wordCount: 650,
      images: [{ alt: 'wedding decor mandap', url: '/test.jpg' }],
      internalLinks: 1,
      externalLinks: 1,
    })

    expect(result.checks.metaDescriptionPresent).toBe(true)
    expect(result.checks.metaDescriptionLength).toBe(true)
    expect(result.checks.keywordInMetaDescription).toBe(true)
    expect(result.diagnostics.metaDescriptionLength).toContain('Optimal length')
  })

  it('evaluates custom metaTitle for title checks when provided', () => {
    // Editorial H1 is 85 chars long, but SERP Meta Title is 55 chars
    const h1Title = 'The Definitive Architectural Blueprint to Sacred Mandap Staging & Royal Wedding Decor'
    const serpMetaTitle = 'Sacred Mandap Staging & Royal Wedding Decor | 11:11'

    expect(h1Title.length).toBeGreaterThan(60)
    expect(serpMetaTitle.length).toBeGreaterThanOrEqual(50)
    expect(serpMetaTitle.length).toBeLessThanOrEqual(60)

    const result = analyzeSeo({
      focusKeywords: ['wedding decor'],
      title: h1Title,
      metaTitle: serpMetaTitle,
      slug: 'royal-wedding-decor-staging',
      metaDescription: 'Luxury wedding decor styling and mandap architecture for royal celebrations.',
      content: '<p>wedding decor advice</p>',
      wordCount: 600,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.titleLengthOk).toBe(true)
    expect(result.checks.keywordInTitle).toBe(true)
    expect(result.diagnostics.titleLengthOk).toContain('Optimal length')
  })
})
