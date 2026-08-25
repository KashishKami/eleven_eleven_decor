import { generateHTML } from '@tiptap/html'
import { JSONContent } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { FaqBlock } from '../extensions/FaqBlock'
import { TableOfContents } from '../extensions/TableOfContents'

export function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function extractHeadings(doc: JSONContent): Array<{ level: number; text: string; slug: string }> {
  const headings: Array<{ level: number; text: string; slug: string }> = []

  function walk(node: JSONContent | undefined) {
    if (!node) return
    if (node.type === 'heading') {
      const text =
        node.content
          ?.map((c: JSONContent) => c.text || '')
          .join('')
          .trim() || ''
      if (text) {
        headings.push({
          level: (node.attrs?.level as number) || 2,
          text,
          slug: slugifyText(text),
        })
      }
    }
    if (Array.isArray(node.content)) {
      node.content.forEach(walk)
    }
  }

  walk(doc)
  return headings
}

export function serializeToHtml(doc: JSONContent): string {
  if (!doc) return ''

  const extensions = [
    StarterKit.configure({
      heading: false,
      horizontalRule: false,
    }),
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    Image,
    HorizontalRule,
    FaqBlock,
    TableOfContents,
  ]

  let rawHtml = generateHTML(doc, extensions)

  // Attach id attribute to headings for jump link anchors
  rawHtml = rawHtml.replace(/<h([1-6])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    if (attrs.includes('id=')) {
      return match
    }
    const plainText = text.replace(/<[^>]+>/g, '').trim()
    const slug = slugifyText(plainText)
    return `<h${level} id="${slug}"${attrs}>${text}</h${level}>`
  })

  // If document contains tableOfContents, populate it with the extracted headings
  const headings = extractHeadings(doc)
  if (rawHtml.includes('class="toc"') && headings.length > 0) {
    const tocItems = headings
      .map(
        (h) =>
          `<li class="toc-item toc-level-${h.level}"><a href="#${h.slug}">${h.text}</a></li>`
      )
      .join('')

    const fullTocHtml = `<nav class="toc"><div class="toc-header">Table of Contents</div><ul class="toc-list">${tocItems}</ul></nav>`
    rawHtml = rawHtml.replace(/<nav[^>]*class="toc"[^>]*>[\s\S]*?<\/nav>/i, fullTocHtml)
  }

  return rawHtml
}
