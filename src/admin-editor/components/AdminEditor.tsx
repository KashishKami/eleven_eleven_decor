import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { FaqBlock } from '../extensions/FaqBlock'
import { TableOfContents } from '../extensions/TableOfContents'
import { SLASH_COMMANDS, SlashCommandItem } from '../lib/slashCommands'
import { serializeToHtml } from '../lib/serializer'
import { buildImageAlt } from '../lib/imageHelpers'

interface AdminEditorProps {
  initialContent: string
  contentInputId: string
  onUpdateCallback?: (editor: Editor) => void
}

export const AdminEditor: React.FC<AdminEditorProps> = ({
  initialContent,
  contentInputId,
  onUpdateCallback,
}) => {
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashQuery, setSlashQuery] = useState('')
  const [slashIndex, setSlashIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [imageAltInput, setImageAltInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleEditorUpdate = useCallback(
    (ed: Editor) => {
      const json = ed.getJSON()
      const html = serializeToHtml(json)
      const inputEl = document.getElementById(contentInputId) as HTMLInputElement | HTMLTextAreaElement
      if (inputEl) {
        inputEl.value = html
      }
      if (onUpdateCallback) {
        onUpdateCallback(ed)
      }
    },
    [contentInputId, onUpdateCallback]
  )

  const filteredCommands = SLASH_COMMANDS.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(slashQuery.toLowerCase()) ||
      cmd.name.toLowerCase().includes(slashQuery.toLowerCase())
  )

  const showSlashMenuRef = useRef(showSlashMenu)
  showSlashMenuRef.current = showSlashMenu
  const slashIndexRef = useRef(slashIndex)
  slashIndexRef.current = slashIndex
  const filteredCommandsRef = useRef(filteredCommands)
  filteredCommandsRef.current = filteredCommands

  const editorRef = useRef<Editor | null>(null)

  const executeCommand = useCallback((cmd: SlashCommandItem) => {
    const ed = editorRef.current
    if (!ed) return
    // Delete the slash trigger text
    const { from } = ed.state.selection
    const textBefore = ed.state.doc.textBetween(Math.max(0, from - 20), from, '\n', '')
    const slashMatch = textBefore.match(/\/([a-zA-Z0-9-]*)$/)
    if (slashMatch) {
      const matchLen = slashMatch[0].length
      ed.chain().focus().deleteRange({ from: from - matchLen, to: from }).run()
    }

    if (cmd.name === 'image') {
      const kwInput = document.getElementById('focus-keyword-input') as HTMLInputElement
      const kw = kwInput ? kwInput.value : ''
      setImageAltInput(kw ? `${kw} - photo` : '')
      setShowImageModal(true)
    } else {
      cmd.command(ed)
    }
    setShowSlashMenu(false)
  }, [])

  const executeCommandRef = useRef(executeCommand)
  executeCommandRef.current = executeCommand

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        horizontalRule: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      HorizontalRule,
      FaqBlock,
      TableOfContents,
    ],
    content: initialContent,
    editorProps: {
      handleKeyDown: (view, event) => {
        if (!showSlashMenuRef.current || filteredCommandsRef.current.length === 0) {
          return false
        }

        if (event.key === 'ArrowDown') {
          event.preventDefault()
          setSlashIndex((prev) => {
            const next = (prev + 1) % filteredCommandsRef.current.length
            const el = document.querySelector(`.slash-item[data-index="${next}"]`)
            el?.scrollIntoView({ block: 'nearest' })
            return next
          })
          return true
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault()
          setSlashIndex((prev) => {
            const next = (prev - 1 + filteredCommandsRef.current.length) % filteredCommandsRef.current.length
            const el = document.querySelector(`.slash-item[data-index="${next}"]`)
            el?.scrollIntoView({ block: 'nearest' })
            return next
          })
          return true
        }

        if (event.key === 'Enter') {
          const selected = filteredCommandsRef.current[slashIndexRef.current]
          if (selected) {
            event.preventDefault()
            executeCommandRef.current(selected)
            return true
          }
        }

        if (event.key === 'Escape') {
          event.preventDefault()
          setShowSlashMenu(false)
          return true
        }

        return false
      },
    },
    onUpdate: ({ editor: ed }) => {
      handleEditorUpdate(ed)

      // Check slash command trigger
      const { from } = ed.state.selection
      const textBefore = ed.state.doc.textBetween(Math.max(0, from - 20), from, '\n', '')
      const slashMatch = textBefore.match(/\/([a-zA-Z0-9-]*)$/)
      if (slashMatch) {
        setSlashQuery(slashMatch[1] || '')
        setShowSlashMenu(true)
        setSlashIndex(0)
      } else {
        setShowSlashMenu(false)
      }
    },
  })

  editorRef.current = editor

  useEffect(() => {
    if (editor) {
      handleEditorUpdate(editor)
    }
  }, [editor, handleEditorUpdate])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file) return
    const kwInput = document.getElementById('focus-keyword-input') as HTMLInputElement
    const kw = kwInput ? kwInput.value : ''
    const defaultAlt = buildImageAlt(kw, file.name)
    setImageAltInput(defaultAlt)

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload-image.php', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url && editor) {
        editor
          .chain()
          .focus()
          .setImage({ src: data.url, alt: defaultAlt })
          .run()
        setShowImageModal(false)
        setImageUrlInput('')
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch {
      alert('Error uploading image to server')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleInsertByUrl = () => {
    if (!imageUrlInput.trim() || !editor) return
    editor
      .chain()
      .focus()
      .setImage({ src: imageUrlInput.trim(), alt: imageAltInput.trim() || 'Blog illustration' })
      .run()
    setShowImageModal(false)
    setImageUrlInput('')
  }

  if (!editor) return null

  return (
    <div className="admin-editor-wrapper">
      {/* Format Toolbar */}
      <div className="editor-toolbar">
        <button
          type="button"
          className={`tb-btn ${editor.isActive('bold') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className={`tb-btn ${editor.isActive('italic') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <span className="tb-divider" />
        <button
          type="button"
          className={`tb-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </button>
        <button
          type="button"
          className={`tb-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          className={`tb-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <span className="tb-divider" />
        <button
          type="button"
          className="tb-btn"
          onClick={() => {
            const kwInput = document.getElementById('focus-keyword-input') as HTMLInputElement
            const kw = kwInput ? kwInput.value : ''
            setImageAltInput(kw ? `${kw} - photo` : '')
            setShowImageModal(true)
          }}
          title="Insert Image"
        >
          🖼️ Image
        </button>
        <button
          type="button"
          className="tb-btn"
          onClick={() =>
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
          }
          title="Insert FAQ Accordion"
        >
          ❓ FAQ
        </button>
        <button
          type="button"
          className="tb-btn"
          onClick={() => editor.chain().focus().insertContent({ type: 'tableOfContents' }).run()}
          title="Insert Table of Contents"
        >
          📑 TOC
        </button>
        <button
          type="button"
          className="tb-btn"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Divider Line"
        >
          ➖
        </button>
      </div>

      {/* Tiptap Editable Area */}
      <div className="editor-content-area">
        <EditorContent editor={editor} />

        {/* Slash Command Palette Dropdown */}
        {showSlashMenu && (
          <div className="slash-menu">
            <div className="slash-menu-header">Insert Block (Type to filter)</div>
            <div className="slash-menu-list">
              {filteredCommands.map((cmd, idx) => (
                <div
                  key={cmd.name}
                  data-index={idx}
                  className={`slash-item ${idx === slashIndex ? 'selected' : ''}`}
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSlashIndex(idx)}
                >
                  <span className="slash-icon">{cmd.icon}</span>
                  <div className="slash-info">
                    <div className="slash-title">{cmd.title}</div>
                    <div className="slash-desc">{cmd.description}</div>
                  </div>
                </div>
              ))}
              {filteredCommands.length === 0 && (
                <div className="slash-empty">No matching blocks found</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Upload / URL Modal */}
      {showImageModal && (
        <div className="image-modal-backdrop" onClick={() => setShowImageModal(false)}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Insert Article Image</h3>

            <div className="modal-section">
              <label className="modal-label">Upload File (JPG, PNG, WebP ≤ 5MB):</label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                disabled={uploadingImage}
                style={{ color: '#fff' }}
              />
              {uploadingImage && <p style={{ color: '#c9a96e', marginTop: '0.5rem' }}>Uploading...</p>}
            </div>

            <div className="modal-divider">OR</div>

            <div className="modal-section">
              <label className="modal-label">Image URL:</label>
              <input
                type="text"
                className="modal-input"
                placeholder="https://images.unsplash.com/..."
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
              />
            </div>

            <div className="modal-section">
              <label className="modal-label">SEO Alt Text (Recommended for Rank Math 100%):</label>
              <input
                type="text"
                className="modal-input"
                placeholder="e.g. luxury wedding mandap decoration"
                value={imageAltInput}
                onChange={(e) => setImageAltInput(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={handleInsertByUrl}
                disabled={!imageUrlInput.trim()}
              >
                Insert Image
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowImageModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
