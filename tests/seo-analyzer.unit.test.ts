import { describe, it, expect } from 'vitest'
import { analyzeSeo } from '@/admin-editor/lib/seoAnalyzer'

describe('W-752: Rank Math SEO Score Analyzer', () => {
  it('computes high score and passing checks when all criteria are satisfied', () => {
    const input = {
      focusKeyword: 'wedding decoration',
      title: 'Wedding Decoration Ideas 2026 | Luxury Event Styling',
      slug: 'wedding-decoration-ideas-2026',
      metaDescription:
        'Discover top luxury wedding decoration ideas for 2026 from 1111 Decor studio in Dehradun with bespoke floral stages & mandaps.',
      content:
        '<h1>Wedding Decoration Trends</h1><h2>Wedding Decoration Elements</h2><p>Wedding decoration is key for an unforgettable luxury experience across all celebrations.</p>' +
        ' <p>word</p>'.repeat(600),
      wordCount: 615,
      images: [{ alt: 'wedding decoration setup' }],
      internalLinks: 2,
      externalLinks: 1,
    }

    const result = analyzeSeo(input)
    expect(result.score).toBeGreaterThanOrEqual(70)
    expect(result.scoreColor).toBe('green')
    expect(result.checks.keywordInTitle).toBe(true)
    expect(result.checks.keywordInMetaDescription).toBe(true)
    expect(result.checks.keywordInFirstParagraph).toBe(true)
    expect(result.checks.keywordInUrl).toBe(true)
    expect(result.checks.keywordInSubheadings).toBe(true)
    expect(result.checks.contentLength).toBe(true)
    expect(result.checks.metaDescriptionPresent).toBe(true)
    expect(result.checks.metaDescriptionLength).toBe(true)
    expect(result.checks.hasInternalLinks).toBe(true)
    expect(result.checks.hasExternalLinks).toBe(true)
    expect(result.checks.imageAltContainsKeyword).toBe(true)
    expect(result.checks.imageAltPresent).toBe(true)
    expect(result.checks.h1Present).toBe(true)
    expect(result.checks.titleLengthOk).toBe(true)
    expect(result.checks.focusKeywordSet).toBe(true)
  })

  it('marks keywordInTitle false when title lacks focus keyword', () => {
    const result = analyzeSeo({
      focusKeyword: 'event planning',
      title: 'Modern Celebration Concepts for Luxury Weddings',
      slug: 'modern-celebration-concepts',
      metaDescription: 'Event planning tips.',
      content: '<p>event planning content</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.keywordInTitle).toBe(false)
  })

  it('fails contentLength check when wordCount is below 600', () => {
    const result = analyzeSeo({
      focusKeyword: 'wedding',
      title: 'Wedding Guide',
      slug: 'wedding-guide',
      metaDescription: 'Wedding meta',
      content: '<p>wedding</p>',
      wordCount: 150,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.contentLength).toBe(false)
  })

  it('fails metaDescriptionPresent and keywordInMetaDescription when metaDescription is empty', () => {
    const result = analyzeSeo({
      focusKeyword: 'wedding',
      title: 'Wedding Guide',
      slug: 'wedding-guide',
      metaDescription: '',
      content: '<p>wedding</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.metaDescriptionPresent).toBe(false)
    expect(result.checks.keywordInMetaDescription).toBe(false)
  })

  it('fails metaDescriptionLength when length exceeds 160 characters', () => {
    const result = analyzeSeo({
      focusKeyword: 'wedding',
      title: 'Wedding Guide',
      slug: 'wedding-guide',
      metaDescription: 'A'.repeat(161),
      content: '<p>wedding</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.metaDescriptionLength).toBe(false)
  })

  it('fails imageAltContainsKeyword when image alt is empty or lacks keyword', () => {
    const result = analyzeSeo({
      focusKeyword: 'wedding decoration',
      title: 'Wedding Title',
      slug: 'wedding-title',
      metaDescription: 'wedding decoration desc',
      content: '<p>wedding decoration</p>',
      wordCount: 100,
      images: [{ alt: '' }, { alt: 'unrelated venue' }],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.imageAltContainsKeyword).toBe(false)
    expect(result.checks.imageAltPresent).toBe(false)
  })

  it('verifies keyword in URL slug', () => {
    const result = analyzeSeo({
      focusKeyword: 'wedding decoration',
      title: 'Wedding Decoration Ideas 2026',
      slug: 'wedding-decoration-ideas-2026',
      metaDescription: 'desc',
      content: '<p>wedding decoration</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.keywordInUrl).toBe(true)
  })

  it('fails hasInternalLinks when internalLinks count is 0', () => {
    const result = analyzeSeo({
      focusKeyword: 'wedding',
      title: 'Wedding Guide',
      slug: 'wedding-guide',
      metaDescription: 'desc',
      content: '<p>wedding</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.hasInternalLinks).toBe(false)
  })

  it('detects keyword in subheadings (h2/h3)', () => {
    const result = analyzeSeo({
      focusKeyword: 'wedding decoration',
      title: 'Wedding Decoration Guide',
      slug: 'wedding-decoration-guide',
      metaDescription: 'desc',
      content: '<h2>Luxury Wedding Decoration Secrets</h2><p>Content</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.keywordInSubheadings).toBe(true)
  })

  it('flags keyword density when it exceeds 4% over-optimization threshold', () => {
    const content = ('<p>' + 'wedding decoration '.repeat(8) + 'other words '.repeat(10) + '</p>').repeat(1)
    const result = analyzeSeo({
      focusKeyword: 'wedding decoration',
      title: 'Wedding Decoration',
      slug: 'wedding-decoration',
      metaDescription: 'desc',
      content: content,
      wordCount: 50,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(result.checks.keywordDensityOk).toBe(false)
  })
})
