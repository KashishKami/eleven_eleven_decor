import React from 'react'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'

export const TableOfContentsView: React.FC<NodeViewProps> = ({ editor }) => {
  const headings: Array<{ text: string; level: number; id: string }> = []

  if (editor && editor.state && editor.state.doc) {
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'heading') {
        const text = node.textContent.trim()
        if (text) {
          const level = (node.attrs.level as number) || 2
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
          headings.push({ text, level, id })
        }
      }
    })
  }

  return (
    <NodeViewWrapper className="toc-nodeview">
      <nav className="toc-preview-box">
        <div className="toc-header">
          <span className="toc-icon">📑</span>
          <strong>TABLE OF CONTENTS</strong>
          <span className="toc-badge">
            {headings.length} {headings.length === 1 ? 'Section' : 'Sections'}
          </span>
        </div>
        {headings.length > 0 ? (
          <ul className="toc-items-list">
            {headings.map((h, i) => (
              <li
                key={i}
                className={`toc-item-preview level-${h.level}`}
                style={{ paddingLeft: `${Math.max(0, (h.level - 1) * 14)}px` }}
              >
                <span className="toc-tag">H{h.level}</span>
                <span className="toc-title">{h.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="toc-empty-hint">
            <span>ℹ️ Automatically tracks all article headings. Add H1, H2, or H3 sections below to see your outline here!</span>
          </div>
        )}
      </nav>
    </NodeViewWrapper>
  )
}
