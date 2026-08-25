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
import { buildImageAlt, normalizeImageUrl } from '../lib/imageHelpers'

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
  const [slashPosition, setSlashPosition] = useState<{ top: number; left: number } | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [imageAltInput, setImageAltInput] = useState('')
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string>('')
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
    const slashMatch = textBefore.match(/(?:^|\s)\/([a-zA-Z0-9-]*)$/)
    if (slashMatch) {
      const matchLen = slashMatch[0].trim().length
      ed.chain().focus().deleteRange({ from: from - matchLen, to: from }).run()
    }

    if (cmd.name === 'image') {
      const kwInput = document.getElementById('focus-keyword-input') as HTMLInputElement
      const kw = kwInput ? kwInput.value.split(',')[0]?.trim() || '' : ''
      setImageAltInput(kw ? `${kw} - photo` : '')
      setUploadSuccessMsg('')
      setShowImageModal(true)
    } else {
      cmd.command(ed)
    }
    setShowSlashMenu(false)
  }, [])

  const executeCommandRef = useRef(executeCommand)
  executeCommandRef.current = executeCommand

  const updateSlashMenuState = useCallback((ed: Editor) => {
    const { from } = ed.state.selection
    const textBefore = ed.state.doc.textBetween(Math.max(0, from - 20), from, '\n', '')
    const slashMatch = textBefore.match(/(?:^|\s)\/([a-zA-Z0-9-]*)$/)
    if (slashMatch) {
      setSlashQuery(slashMatch[1] || '')
      try {
        const coords = ed.view.coordsAtPos(from)
        const contentArea = ed.view.dom.closest('.editor-content-area') as HTMLElement | null
        if (coords && contentArea) {
          const areaRect = contentArea.getBoundingClientRect()
          const top = coords.bottom - areaRect.top + 4
          const left = Math.min(
            Math.max(0, coords.left - areaRect.left),
            Math.max(0, areaRect.width - 290)
          )
          setSlashPosition({ top, left })
        }
      } catch {
        setSlashPosition(null)
      }
      setShowSlashMenu(true)
      setSlashIndex(0)
    } else {
      setShowSlashMenu(false)
    }
  }, [])

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
        HTMLAttributes: {
          referrerpolicy: 'no-referrer',
          loading: 'lazy',
        },
      }),
      HorizontalRule,
      FaqBlock,
      TableOfContents,
    ],
    content: initialContent,
    editorProps: {
      handleClickOn: (view, pos, node) => {
        if (node.type.name === 'image') {
          setImageUrlInput(node.attrs.src || '')
          setImageAltInput(node.attrs.alt || '')
          setUploadSuccessMsg('✓ Editing existing image — update the Alt Text or URL below')
          setShowImageModal(true)
          return true
        }
        return false
      },
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
      updateSlashMenuState(ed)
    },
    onSelectionUpdate: ({ editor: ed }) => {
      updateSlashMenuState(ed)
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
    const kw = kwInput ? kwInput.value.split(',')[0]?.trim() || '' : ''
    const defaultAlt = buildImageAlt(kw, file.name)

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload-image.php', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setImageUrlInput(data.url)
        setImageAltInput(defaultAlt)
        setUploadSuccessMsg(`✓ Uploaded "${file.name}"! You can now customize the Alt Text below before inserting.`)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch {
      alert('Error uploading image to server')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleInsertImage = () => {
    const rawUrl = normalizeImageUrl(imageUrlInput)
    if (!rawUrl || !editor) return

    editor
      .chain()
      .focus()
      .setImage({
        src: rawUrl,
        alt: imageAltInput.trim() || 'Blog illustration',
      })
      .run()
    setShowImageModal(false)
    setImageUrlInput('')
    setImageAltInput('')
    setUploadSuccessMsg('')
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
            const kw = kwInput ? kwInput.value.split(',')[0]?.trim() || '' : ''
            setImageAltInput(kw ? `${kw} - photo` : '')
            setUploadSuccessMsg('')
            setShowImageModal(true)
          }}
        >
          🖼️ Image
        </button>
        <button
          type="button"
          className="tb-btn"
          onClick={() => editor.chain().focus().insertContent({ type: 'faqBlock', attrs: { question: '', answer: '' } }).run()}
        >
          ❓ FAQ
        </button>
        <button
          type="button"
          className="tb-btn"
          onClick={() => editor.chain().focus().insertContent({ type: 'tableOfContents' }).run()}
        >
          📑 TOC
        </button>
        <button
          type="button"
          className="tb-btn"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          —
        </button>
      </div>

      {/* Tiptap Editable Area */}
      <div className="editor-content-area">
        <EditorContent editor={editor} />

        {/* Slash Command Palette Dropdown */}
        {showSlashMenu && (
          <div
            className="slash-menu"
            style={
              slashPosition
                ? {
                    top: `${slashPosition.top}px`,
                    left: `${slashPosition.left}px`,
                  }
                : undefined
            }
          >
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

            {uploadSuccessMsg && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#86efac',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                }}
              >
                {uploadSuccessMsg}
              </div>
            )}

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
              {uploadingImage && <p style={{ color: '#c9a96e', marginTop: '0.5rem' }}>Uploading to server...</p>}
            </div>

            <div className="modal-divider">OR</div>

            <div className="modal-section">
              <label className="modal-label">Image URL (Direct link or Unsplash page link):</label>
              <input
                type="text"
                className="modal-input"
                placeholder="Paste any photo URL or Unsplash link (e.g. https://unsplash.com/photos/...)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                onBlur={(e) => setImageUrlInput(normalizeImageUrl(e.target.value))}
              />
            </div>

            {imageUrlInput.trim() && (
              <div style={{ marginBottom: '1.2rem' }}>
                <label className="modal-label">Image Preview:</label>
                <div
                  style={{
                    maxHeight: '180px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={normalizeImageUrl(imageUrlInput.trim())}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'block'
                    }}
                    style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}

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
                onClick={handleInsertImage}
                disabled={!imageUrlInput.trim()}
              >
                Insert Image into Article
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
