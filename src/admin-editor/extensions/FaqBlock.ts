import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { FaqBlockView } from '../components/FaqBlockView'

export interface FaqBlockOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    faqBlock: {
      setFaqBlock: (attrs?: { question?: string; answer?: string }) => ReturnType
    }
  }
}

export const FaqBlock = Node.create<FaqBlockOptions>({
  name: 'faqBlock',
  group: 'block',
  inline: false,
  atom: true,
  draggable: true,
  selectable: true,

  addNodeView() {
    return ReactNodeViewRenderer(FaqBlockView)
  },

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'faq-item',
      },
    }
  },

  addAttributes() {
    return {
      question: {
        default: '',
      },
      answer: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'details',
        getAttrs: (element) => {
          if (typeof element === 'string') return false
          const details = element as HTMLDetailsElement
          const summary = details.querySelector('summary')
          const question = summary ? summary.textContent?.trim() || '' : ''
          const clone = details.cloneNode(true) as HTMLElement
          const s = clone.querySelector('summary')
          if (s) s.remove()
          const answer = clone.textContent?.trim() || ''

          return {
            question,
            answer,
          }
        },
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'details',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ['summary', {}, node.attrs.question || 'Frequently Asked Question?'],
      ['div', { class: 'faq-answer' }, node.attrs.answer || 'Detailed answer...'],
    ]
  },

  addCommands() {
    return {
      setFaqBlock:
        (attrs = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          })
        },
    }
  },
})
