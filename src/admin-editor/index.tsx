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
    const formKeywordEl = document.getElementById('focus-keyword-input') as HTMLInputElement
    const initialKeyword =
      seoRoot.getAttribute('data-keyword') || (formKeywordEl ? formKeywordEl.value : '') || ''

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
      return text ? text.split(/\s+/).filter(Boolean).length : 0
    }

    const getImages = () => {
      const imgs: Array<{ alt: string; url?: string }> = []

      // 1. Check Feature Main Image in form
      const featUrlEl = document.getElementById('image_url') as HTMLInputElement
      const featAltEl = document.getElementById('image_alt') as HTMLInputElement
      const featFileEl = document.getElementById('image_file') as HTMLInputElement
      const hasFeatFile = featFileEl && featFileEl.files && featFileEl.files.length > 0
      const featUrlVal = featUrlEl ? featUrlEl.value.trim() : ''
      const featAltVal = featAltEl ? featAltEl.value.trim() : ''

      if (featUrlVal || hasFeatFile || featAltVal) {
        imgs.push({
          url: featUrlVal || 'featured-main-image',
          alt: featAltVal,
        })
      }

      // 2. Check Inline Images inside Editor Content
      const html = getContentHtml()
      const imgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi
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
