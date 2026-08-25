import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { TableOfContentsView } from '../components/TableOfContentsView'

export interface TableOfContentsOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableOfContents: {
      setTableOfContents: () => ReturnType
    }
  }
}

export const TableOfContents = Node.create<TableOfContentsOptions>({
  name: 'tableOfContents',
  group: 'block',
  inline: false,
  atom: true,
  draggable: true,
  selectable: true,

  addNodeView() {
    return ReactNodeViewRenderer(TableOfContentsView)
  },

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'toc',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'nav.toc',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'nav',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ['div', { class: 'toc-header' }, 'Table of Contents'],
      ['ul', { class: 'toc-list' }],
    ]
  },

  addCommands() {
    return {
      setTableOfContents:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          })
        },
    }
  },
})
