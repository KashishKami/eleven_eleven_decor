import { Editor } from '@tiptap/core'

export interface SlashCommandItem {
  name: string
  title: string
  description: string
  icon: string
  command: (editor: Editor) => void
}

export const SLASH_COMMANDS: SlashCommandItem[] = [
  {
    name: 'heading-1',
    title: 'Heading 1',
    description: 'Main article heading / title block',
    icon: 'H1',
    command: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
  },
  {
    name: 'heading-2',
    title: 'Heading 2',
    description: 'Major section heading',
    icon: 'H2',
    command: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    },
  },
  {
    name: 'heading-3',
    title: 'Heading 3',
    description: 'Subsection heading',
    icon: 'H3',
    command: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    },
  },
  {
    name: 'heading-4',
    title: 'Heading 4',
    description: 'Minor subsection heading',
    icon: 'H4',
    command: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 4 }).run()
    },
  },
  {
    name: 'heading-5',
    title: 'Heading 5',
    description: 'Small group heading',
    icon: 'H5',
    command: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 5 }).run()
    },
  },
  {
    name: 'heading-6',
    title: 'Heading 6',
    description: 'Smallest heading level',
    icon: 'H6',
    command: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 6 }).run()
    },
  },
  {
    name: 'image',
    title: 'Image',
    description: 'Insert responsive photo with SEO alt text',
    icon: '🖼️',
    command: (editor: Editor) => {
      const url = window.prompt('Enter Image URL:')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },
  {
    name: 'faq-block',
    title: 'FAQ Block',
    description: 'Interactive expandable accordion item',
    icon: '❓',
    command: (editor: Editor) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'faqBlock',
          attrs: {
            question: 'Frequently Asked Question?',
            answer: 'Detailed response and explanation here...',
          },
        })
        .run()
    },
  },
  {
    name: 'table-of-contents',
    title: 'Table of Contents',
    description: 'Auto-generated jump links based on headings',
    icon: '📑',
    command: (editor: Editor) => {
      editor.chain().focus().insertContent({ type: 'tableOfContents' }).run()
    },
  },
  {
    name: 'divider',
    title: 'Divider Line',
    description: 'Horizontal separator line',
    icon: '➖',
    command: (editor: Editor) => {
      editor.chain().focus().setHorizontalRule().run()
    },
  },
]
