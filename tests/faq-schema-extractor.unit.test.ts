import { describe, it, expect } from 'vitest'
import { extractFaqsFromHtml } from '@/lib/faqExtractor'
import { generateArticleSchemaGraph } from '@/lib/schemaGenerators'

describe('W-901 — FAQ Schema Extractor & Multi-Layer Structured Data', () => {
  describe('extractFaqsFromHtml', () => {
    it('extracts FAQ items from details.faq-item elements in HTML', () => {
      const html = `
        <h2>Frequently Asked Questions</h2>
        <details class="faq-item">
          <summary>What is 11:11 Decor?</summary>
          <div class="faq-answer">11:11 Decor is a luxury event design and planning studio based in Dehradun.</div>
        </details>
        <details class="faq-item">
          <summary>Do you manage destination weddings?</summary>
          <div class="faq-answer">Yes, we cover Mussoorie, Rishikesh, Jim Corbett, and beyond.</div>
        </details>
      `

      const faqs = extractFaqsFromHtml(html)
      expect(faqs).toHaveLength(2)
      expect(faqs[0]).toEqual({
        question: 'What is 11:11 Decor?',
        answer: '11:11 Decor is a luxury event design and planning studio based in Dehradun.',
      })
      expect(faqs[1]).toEqual({
        question: 'Do you manage destination weddings?',
        answer: 'Yes, we cover Mussoorie, Rishikesh, Jim Corbett, and beyond.',
      })
    })

    it('handles details elements without class or with nested paragraph answers', () => {
      const html = `
        <details>
          <summary>What is your cancellation policy?</summary>
          <p>Please refer to our agreement terms for details.</p>
        </details>
      `

      const faqs = extractFaqsFromHtml(html)
      expect(faqs).toHaveLength(1)
      expect(faqs[0]?.question).toBe('What is your cancellation policy?')
      expect(faqs[0]?.answer).toBe('Please refer to our agreement terms for details.')
    })

    it('returns an empty array when no FAQ blocks are in HTML', () => {
      const html = '<p>This is a standard blog post without any FAQ blocks.</p>'
      expect(extractFaqsFromHtml(html)).toEqual([])
      expect(extractFaqsFromHtml('')).toEqual([])
      expect(extractFaqsFromHtml(undefined as unknown as string)).toEqual([])
    })
  })

  describe('generateArticleSchemaGraph', () => {
    it('generates unified @graph containing BlogPosting, BreadcrumbList, and FAQPage when FAQs are present', () => {
      const post = {
        title: 'Complete Wedding Decor Guide',
        description: 'Comprehensive styling guide for luxury weddings.',
        slug: 'complete-wedding-decor-guide',
        category: 'weddings',
        categoryName: 'Weddings',
        datePublished: '2026-08-10',
        author: '11:11 Decor Design Studio',
        image: '/hero-banner.jpg',
        faqs: [
          {
            question: 'When should we finalize our wedding concept?',
            answer: 'We recommend finalizing 4 to 6 months prior.',
          },
        ],
      }

      const graph = generateArticleSchemaGraph(post)
      expect(graph['@context']).toBe('https://schema.org')
      expect(graph['@graph']).toBeInstanceOf(Array)

      const articleEntity = graph['@graph'].find((e: Record<string, unknown>) => e['@type'] === 'BlogPosting')
      const breadcrumbEntity = graph['@graph'].find((e: Record<string, unknown>) => e['@type'] === 'BreadcrumbList')
      const faqEntity = graph['@graph'].find((e: Record<string, unknown>) => e['@type'] === 'FAQPage')

      expect(articleEntity).toBeDefined()
      expect(articleEntity?.headline).toBe('Complete Wedding Decor Guide')

      expect(breadcrumbEntity).toBeDefined()

      expect(faqEntity).toBeDefined()
      const mainEntities = (faqEntity as { mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }> })?.mainEntity || []
      expect(mainEntities).toHaveLength(1)
      expect(mainEntities[0]?.name).toBe('When should we finalize our wedding concept?')
      expect(mainEntities[0]?.acceptedAnswer.text).toBe('We recommend finalizing 4 to 6 months prior.')
    })

    it('omits FAQPage entity from @graph when no FAQs exist', () => {
      const post = {
        title: 'Couture Tablescape Ideas',
        description: 'Atmospheric dining decor.',
        slug: 'couture-tablescape-ideas',
        category: 'event-decoration',
        datePublished: '2026-08-18',
        faqs: [],
      }

      const graph = generateArticleSchemaGraph(post)
      const faqEntity = graph['@graph'].find((e: Record<string, unknown>) => e['@type'] === 'FAQPage')
      expect(faqEntity).toBeUndefined()
    })
  })
})
