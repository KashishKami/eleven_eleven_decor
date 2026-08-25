import React from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'

export const FaqBlockView: React.FC<NodeViewProps> = ({ node, updateAttributes }) => {
  const question = node.attrs.question || 'Frequently Asked Question?'
  const answer = node.attrs.answer || 'Answer details...'

  return (
    <NodeViewWrapper className="faq-nodeview">
      <details className="faq-details" open>
        <summary className="faq-summary">
          <input
            type="text"
            className="faq-input-question"
            value={question}
            onChange={(e) => updateAttributes({ question: e.target.value })}
            placeholder="Question title..."
          />
        </summary>
        <div className="faq-answer-body">
          <textarea
            className="faq-input-answer"
            rows={3}
            value={answer}
            onChange={(e) => updateAttributes({ answer: e.target.value })}
            placeholder="Detailed answer..."
          />
        </div>
      </details>
    </NodeViewWrapper>
  )
}
