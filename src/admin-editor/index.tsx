import React from 'react'
import ReactDOM from 'react-dom/client'
import { AdminEditor } from './components/AdminEditor'
import { SeoScorePanel } from './components/SeoScorePanel'
import './styles/editor.css'

function initAdminEditor() {
  // 1. Mount Block Editor
  const editorRoot = document.getElementById('editor-root')
  if (editorRoot) {
    const initialContent = editorRoot.getAttribute('data-initial-content') || ''
    const contentInputId = editorRoot.getAttribute('data-input-id') || 'content-field'

    const root = ReactDOM.createRoot(editorRoot)
    root.render(
      <AdminEditor
        initialContent={initialContent}
        contentInputId={contentInputId}
      />
    )
  }

  // 2. Mount Rank Math SEO Panel
  const seoRoot = document.getElementById('seo-panel-root')
  if (seoRoot) {
    const initialKeyword = seoRoot.getAttribute('data-keyword') || ''

    const getTitle = () => {
      const el = document.getElementById('title') as HTMLInputElement
      return el ? el.value : ''
    }

    const getSlug = () => {
      const el = document.getElementById('slug') as HTMLInputElement
      return el ? el.value : ''
    }

    const getMetaDescription = () => {
      const el = document.getElementById('excerpt') as HTMLTextAreaElement
      return el ? el.value : ''
    }

    const getContentHtml = () => {
      const el = document.getElementById('content-field') as HTMLInputElement
      return el ? el.value : ''
    }

    const getWordCount = () => {
      const html = getContentHtml()
      const text = html.replace(/<[^>]+>/g, ' ').trim()
      return text ? text.split(/\s+/).length : 0
    }

    const getImages = () => {
      const html = getContentHtml()
      const imgs: Array<{ alt: string; url?: string }> = []
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi
      let match: RegExpExecArray | null
      while ((match = imgRegex.exec(html)) !== null) {
        const fullTag = match[0]
        const altMatch = fullTag.match(/alt=["']([^"']*)["']/i)
        const alt = altMatch ? altMatch[1] || '' : ''
        imgs.push({ url: match[1], alt })
      }
      return imgs
    }

    const root = ReactDOM.createRoot(seoRoot)
    root.render(
      <SeoScorePanel
        initialKeyword={initialKeyword}
        getTitle={getTitle}
        getSlug={getSlug}
        getMetaDescription={getMetaDescription}
        getContentHtml={getContentHtml}
        getWordCount={getWordCount}
        getImages={getImages}
      />
    )
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdminEditor)
} else {
  initAdminEditor()
}
