import { describe, it, expect } from 'vitest'
import { serializeToHtml } from '@/admin-editor/lib/serializer'
import { SLASH_COMMANDS } from '@/admin-editor/lib/slashCommands'

describe('W-751: Block Editor Core & Serializer', () => {
  it('serializes heading and paragraph JSON nodes to valid HTML', () => {
    const doc = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Test Heading' }],
        },
        {
          type: 'paragraph',
          content: [],
        },
      ],
    }

    const html = serializeToHtml(doc)
    expect(html).toContain('<h2 id="test-heading">Test Heading</h2>')
    expect(html).toContain('<p></p>')
  })

  it('serializes faqBlock JSON node to <details><summary> structure', () => {
    const doc = {
      type: 'doc',
      content: [
        {
          type: 'faqBlock',
          attrs: {
            question: 'What is 1111 Decor?',
            answer: 'A premier luxury event styling studio.',
          },
        },
      ],
    }

    const html = serializeToHtml(doc)
    expect(html).toContain('<details')
    expect(html).toContain('<summary>What is 1111 Decor?</summary>')
    expect(html).toContain('A premier luxury event styling studio.')
    expect(html).toContain('</details>')
  })

  it('serializes tableOfContents node and generates anchors matching headings in document', () => {
    const doc = {
      type: 'doc',
      content: [
        {
          type: 'tableOfContents',
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Overview & Concept' }],
        },
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Decoration Elements' }],
        },
      ],
    }

    const html = serializeToHtml(doc)
    expect(html).toContain('<nav class="toc">')
    expect(html).toContain('href="#overview-concept"')
    expect(html).toContain('href="#decoration-elements"')
  })

  it('exports valid SLASH_COMMANDS palette definitions for all required block types', () => {
    expect(Array.isArray(SLASH_COMMANDS)).toBe(true)

    const requiredKeys = [
      'heading-1',
      'heading-2',
      'heading-3',
      'heading-4',
      'heading-5',
      'heading-6',
      'image',
      'faq-block',
      'table-of-contents',
      'divider',
    ]

    const names = SLASH_COMMANDS.map((cmd) => cmd.name)
    requiredKeys.forEach((key) => {
      expect(names).toContain(key)
    })

    SLASH_COMMANDS.forEach((cmd) => {
      expect(cmd.name).toBeTruthy()
      expect(cmd.description).toBeTruthy()
      expect(cmd.icon).toBeTruthy()
      expect(typeof cmd.command).toBe('function')
    })
  })
})
