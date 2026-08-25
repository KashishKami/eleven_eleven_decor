import React from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'

export const FaqBlockView: React.FC<NodeViewProps> = ({ node, updateAttributes, deleteNode }) => {
  const question = node.attrs.question ?? ''
  const answer = node.attrs.answer ?? ''

  return (
    <NodeViewWrapper className="faq-nodeview-wrapper">
      <div className="faq-editor-card">
        <div className="faq-card-header">
          <div className="faq-card-tag">
            <span className="faq-icon">❓</span>
            <span className="faq-tag-title">FAQ Accordion (Schema Ready)</span>
          </div>
          <button
            type="button"
            className="faq-delete-btn"
            onClick={deleteNode}
            title="Delete FAQ Block"
          >
            &times; Remove
          </button>
        </div>

        <div className="faq-field-group">
          <label className="faq-field-label">FAQ Question *</label>
          <input
            type="text"
            className="faq-input-question"
            value={question}
            onChange={(e) => updateAttributes({ question: e.target.value })}
            placeholder="e.g. How far in advance should we book decor services?"
          />
        </div>

        <div className="faq-field-group">
          <label className="faq-field-label">FAQ Answer / Explanation *</label>
          <textarea
            className="faq-input-answer"
            rows={3}
            value={answer}
            onChange={(e) => updateAttributes({ answer: e.target.value })}
            placeholder="e.g. We recommend booking 3–6 months in advance for peak wedding and gala seasons..."
          />
        </div>

        <div className="faq-card-footer">
          💡 Renders as an interactive collapsible accordion on your live website with automatic SEO FAQPage Schema.
        </div>
      </div>
    </NodeViewWrapper>
  )
}
