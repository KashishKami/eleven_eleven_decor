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
        '<h2>Wedding Decoration Elements</h2><p>Wedding decoration is key for an unforgettable luxury experience across all celebrations.</p>' +
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

  it('returns score 0 and ALL checks false when input is completely empty (no false green ticks)', () => {
    const emptyResult = analyzeSeo({
      focusKeyword: '',
      title: '',
      slug: '',
      metaDescription: '',
      content: '',
      wordCount: 0,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(emptyResult.score).toBe(0)
    expect(emptyResult.scoreColor).toBe('red')
    expect(emptyResult.checks.focusKeywordSet).toBe(false)
    expect(emptyResult.checks.keywordInTitle).toBe(false)
    expect(emptyResult.checks.titleLengthOk).toBe(false)
    expect(emptyResult.checks.keywordInUrl).toBe(false)
    expect(emptyResult.checks.keywordInFirstParagraph).toBe(false)
    expect(emptyResult.checks.keywordInSubheadings).toBe(false)
    expect(emptyResult.checks.contentLength).toBe(false)
    expect(emptyResult.checks.h1Present).toBe(false)
    expect(emptyResult.checks.metaDescriptionPresent).toBe(false)
    expect(emptyResult.checks.metaDescriptionLength).toBe(false)
    expect(emptyResult.checks.keywordInMetaDescription).toBe(false)
    expect(emptyResult.checks.imageAltContainsKeyword).toBe(false)
    expect(emptyResult.checks.imageAltPresent).toBe(false)
    expect(emptyResult.checks.keywordDensityOk).toBe(false)
    expect(emptyResult.checks.hasInternalLinks).toBe(false)
    expect(emptyResult.checks.hasExternalLinks).toBe(false)
  })

  it('recognizes article title as the primary H1 tag for the page', () => {
    // Case 1: Title provided, no duplicate H1 in body -> exactly 1 H1 (passed)
    const resWithTitle = analyzeSeo({
      focusKeyword: 'wedding decoration',
      title: 'Top Wedding Decoration Ideas for Luxury Events in 2026',
      slug: 'wedding-decoration-ideas',
      metaDescription: 'Meta description',
      content: '<h2>Subheading</h2><p>Body content without any H1 tag</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })
    expect(resWithTitle.checks.h1Present).toBe(true)

    // Case 2: Title provided AND body has an H1 (duplicate H1 -> 2 H1s -> fails)
    const resWithDuplicateH1 = analyzeSeo({
      focusKeyword: 'wedding decoration',
      title: 'Top Wedding Decoration Ideas for Luxury Events in 2026',
      slug: 'wedding-decoration-ideas',
      metaDescription: 'Meta description',
      content: '<h1>Another H1 in body</h1><p>Body content</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })
    expect(resWithDuplicateH1.checks.h1Present).toBe(false)
  })

  it('supports multiple independent focus keywords (array or comma-separated)', () => {
    const multiKwResult = analyzeSeo({
      focusKeywords: ['wedding decoration', 'floral mandap', 'luxury tablescapes'],
      title: 'Wedding Decoration & Floral Mandap Styling Guide 2026',
      slug: 'wedding-decoration-floral-mandap',
      metaDescription: 'Bespoke wedding decoration with floral mandap design and luxury tablescapes.',
      content:
        '<h2>Floral Mandap Concepts</h2><p>Our wedding decoration approach blends floral mandap artistry with luxury tablescapes.</p>' +
        ' <p>text</p>'.repeat(600),
      wordCount: 615,
      images: [{ alt: 'wedding decoration and floral mandap' }],
      internalLinks: 2,
      externalLinks: 1,
    })

    expect(multiKwResult.checks.focusKeywordSet).toBe(true)
    expect(multiKwResult.checks.keywordInTitle).toBe(true)
    expect(multiKwResult.checks.keywordInMetaDescription).toBe(true)
    expect(multiKwResult.checks.keywordInFirstParagraph).toBe(true)
    expect(multiKwResult.checks.keywordInSubheadings).toBe(true)
    expect(multiKwResult.checks.imageAltContainsKeyword).toBe(true)
  })

  it('detects keyword in the first non-empty content paragraph even when preceded by TOC, empty paragraphs, or headings', () => {
    const res = analyzeSeo({
      focusKeyword: 'wedding decoration',
      title: 'Top Wedding Decoration Ideas for Luxury Events in 2026',
      slug: 'wedding-decoration-ideas-2026',
      metaDescription: 'Meta description with wedding decoration ideas.',
      content:
        '<nav class="toc">...</nav>' +
        '<p></p>' +
        '<h2>Overview</h2>' +
        '<p>Wedding decoration is the essential foundation for luxury ceremonies.</p>',
      wordCount: 100,
      images: [],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(res.checks.keywordInFirstParagraph).toBe(true)
  })

  it('provides detailed reality vs expectation diagnostics for every check', () => {
    const res = analyzeSeo({
      focusKeyword: 'wedding decoration',
      title: 'Short Title', // 11 chars (target: 50-60)
      slug: 'my-custom-post', // missing keyword
      metaDescription: 'Too short', // 9 chars (target: 120-160)
      content: '<h2>Heading</h2><p>Short paragraph with wedding decoration.</p>',
      wordCount: 142, // target >= 600
      images: [{ alt: 'wedding decoration arch' }, { alt: '' }],
      internalLinks: 0,
      externalLinks: 0,
    })

    expect(res.diagnostics).toBeDefined()
    expect(res.diagnostics.contentLength).toContain('142 / 600 words')
    expect(res.diagnostics.titleLengthOk).toContain('11 / 50–60 chars')
    expect(res.diagnostics.metaDescriptionLength).toContain('9 / 120–160 chars')
    expect(res.diagnostics.imageAltPresent).toContain('1 of 2 images missing alt text')
    expect(res.diagnostics.hasInternalLinks).toContain('0 internal links found')
    expect(res.diagnostics.hasExternalLinks).toContain('0 external reference links found')
  })
})
