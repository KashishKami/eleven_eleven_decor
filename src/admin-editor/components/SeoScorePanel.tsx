import React, { useState, useEffect, useCallback } from 'react'
import { SeoResult } from '../types/seo'
import { analyzeSeo } from '../lib/seoAnalyzer'

interface SeoScorePanelProps {
  initialKeyword?: string
  getTitle: () => string
  getSlug: () => string
  getMetaDescription: () => string
  getContentHtml: () => string
  getWordCount: () => number
  getImages: () => Array<{ alt: string; url?: string }>
}

export const SeoScorePanel: React.FC<SeoScorePanelProps> = ({
  initialKeyword = '',
  getTitle,
  getSlug,
  getMetaDescription,
  getContentHtml,
  getWordCount,
  getImages,
}) => {
  // Parse initial keywords into array
  const parseKeywords = (kwStr: string): string[] => {
    return kwStr
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)
  }

  const [keywords, setKeywords] = useState<string[]>(() => parseKeywords(initialKeyword))
  const [keywordInput, setKeywordInput] = useState<string>('')
  
  const [result, setResult] = useState<SeoResult>(() =>
    analyzeSeo({
      focusKeywords: parseKeywords(initialKeyword),
      title: getTitle(),
      slug: getSlug(),
      metaDescription: getMetaDescription(),
      content: getContentHtml(),
      wordCount: getWordCount(),
      images: getImages(),
      internalLinks: 0,
      externalLinks: 0,
    })
  )

  // Synchronize keywords with the PHP form's hidden/visible input
  useEffect(() => {
    const formInput = document.getElementById('focus-keyword-input') as HTMLInputElement
    if (formInput) {
      formInput.value = keywords.join(', ')
    }
  }, [keywords])

  const runAnalysis = useCallback(() => {
    const title = getTitle()
    const slug = getSlug()
    const metaDescription = getMetaDescription()
    const content = getContentHtml()
    const wordCount = getWordCount()
    const images = getImages()

    // Detect internal and external links in content
    const linkMatches = content.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi) || []
    let internalLinks = 0
    let externalLinks = 0

    linkMatches.forEach((linkTag) => {
      const hrefMatch = linkTag.match(/href=["']([^"']+)["']/i)
      const href = hrefMatch ? hrefMatch[1]?.trim() || '' : ''
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }

      if (
        href.startsWith('/') ||
        href.startsWith('#') ||
        href.startsWith('./') ||
        href.startsWith('../') ||
        href.includes('localhost') ||
        href.includes('127.0.0.1') ||
        href.includes('1111') ||
        href.includes('elevenelevendecor')
      ) {
        internalLinks++
      } else if (href.startsWith('http://') || href.startsWith('https://')) {
        externalLinks++
      }
    })

    const res = analyzeSeo({
      focusKeywords: keywords,
      title,
      slug,
      metaDescription,
      content,
      wordCount,
      images,
      internalLinks,
      externalLinks,
    })

    setResult(res)
  }, [keywords, getTitle, getSlug, getMetaDescription, getContentHtml, getWordCount, getImages])

  useEffect(() => {
    runAnalysis()
    const interval = setInterval(runAnalysis, 400)
    return () => clearInterval(interval)
  }, [runAnalysis])

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    if ('key' in e && e.key !== 'Enter' && e.key !== ',') {
      return
    }
    e.preventDefault()
    const val = keywordInput.trim().replace(/^,+|,+$/g, '')
    if (!val) return

    const newKws = val
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0 && !keywords.includes(k))

    if (newKws.length > 0) {
      setKeywords((prev) => [...prev, ...newKws])
    }
    setKeywordInput('')
  }

  const handleRemoveKeyword = (kwToRemove: string) => {
    setKeywords((prev) => prev.filter((k) => k !== kwToRemove))
  }

  const { score, scoreColor, checks } = result
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const colorMap = {
    red: '#ef4444',
    orange: '#f59e0b',
    green: '#10b981',
  }
  const activeColor = colorMap[scoreColor]

  const checkItems: Array<{ key: keyof typeof checks; label: string; points: string }> = [
    { key: 'focusKeywordSet', label: 'Focus keyword is set', points: '20 pts' },
    { key: 'keywordInTitle', label: 'Focus keyword used in title', points: '8 pts' },
    { key: 'titleLengthOk', label: 'Title length is optimal (50–60 chars)', points: '8 pts' },
    { key: 'keywordInUrl', label: 'Focus keyword in URL slug', points: '5 pts' },
    { key: 'keywordInFirstParagraph', label: 'Keyword in first paragraph', points: '5 pts' },
    { key: 'keywordInSubheadings', label: 'Keyword in subheadings (H2/H3)', points: '3 pts' },
    { key: 'contentLength', label: 'Content is at least 600 words', points: '10 pts' },
    { key: 'h1Present', label: 'Article has exactly one H1 tag', points: '8 pts' },
    { key: 'metaDescriptionPresent', label: 'Meta description is present', points: '4 pts' },
    { key: 'metaDescriptionLength', label: 'Meta description length is 120–160 chars', points: '4 pts' },
    { key: 'keywordInMetaDescription', label: 'Keyword in meta description', points: '5 pts' },
    { key: 'imageAltContainsKeyword', label: 'Image alt text includes keyword', points: '5 pts' },
    { key: 'imageAltPresent', label: 'All images have non-empty alt text', points: '4 pts' },
    { key: 'keywordDensityOk', label: 'Keyword density is healthy (0.5%–4%)', points: '6 pts' },
    { key: 'hasInternalLinks', label: 'Contains internal website links', points: '3 pts' },
    { key: 'hasExternalLinks', label: 'Contains external reference links', points: '2 pts' },
  ]

  return (
    <div className="seo-panel">
      <div className="seo-panel-header">
        <h3 className="seo-panel-title">Rank Math SEO Score</h3>
        <span className="seo-badge" style={{ backgroundColor: `${activeColor}20`, color: activeColor }}>
          {scoreColor.toUpperCase()}
        </span>
      </div>

      <div className="seo-gauge-wrapper">
        <svg className="seo-gauge" width="100" height="100" viewBox="0 0 100 100">
          <circle
            className="seo-gauge-bg"
            cx="50"
            cy="50"
            r={radius}
            stroke="#2e2e2e"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            className="seo-gauge-bar"
            cx="50"
            cy="50"
            r={radius}
            stroke={activeColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 0.4s ease, stroke 0.3s ease' }}
          />
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="18"
            fontWeight="bold"
          >
            {score}
          </text>
        </svg>
        <div className="seo-score-info">
          <div className="seo-score-text" style={{ color: activeColor }}>
            {score} / 100
          </div>
          <div className="seo-score-subtitle">
            {score >= 80 ? 'Great SEO Optimization!' : score >= 50 ? 'Needs Minor Improvements' : 'Needs Optimization'}
          </div>
        </div>
      </div>

      {/* Multi-Keyword Input & Chips */}
      <div className="seo-keyword-section">
        <label className="seo-label" htmlFor="seo-keyword-input-field">
          Focus Keywords (Add multiple with Enter or comma) *
        </label>

        {keywords.length > 0 && (
          <div className="seo-keyword-chips">
            {keywords.map((kw, idx) => (
              <span key={kw} className={`seo-chip ${idx === 0 ? 'primary' : 'secondary'}`}>
                <span className="seo-chip-text">{kw}</span>
                {idx === 0 && <span className="seo-chip-badge">Primary</span>}
                <button
                  type="button"
                  className="seo-chip-remove"
                  onClick={() => handleRemoveKeyword(kw)}
                  title={`Remove ${kw}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}

        <input
          id="seo-keyword-input-field"
          type="text"
          className="seo-input"
          placeholder="Type keyword and press Enter (e.g. wedding decoration)"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleAddKeyword}
          onBlur={handleAddKeyword}
        />
        <div className="seo-keyword-hint">
          {keywords.length === 0
            ? 'No focus keyword set. Add at least one to calculate SEO rank.'
            : `${keywords.length} keyword${keywords.length > 1 ? 's' : ''} active. Primary keyword drives density and URL checks.`}
        </div>
      </div>

      <div className="seo-checks-list">
        <h4 className="seo-checks-title">Optimization Checklist</h4>
        {checkItems.map((item) => {
          const isPassed = checks[item.key]
          const diagnosticNote = result.diagnostics ? result.diagnostics[item.key] : ''
          return (
            <div key={item.key} className={`seo-check-row ${isPassed ? 'passed' : 'failed'}`}>
              <div className="seo-check-main">
                <span className="seo-check-icon">{isPassed ? '✅' : '❌'}</span>
                <span className="seo-check-label">{item.label}</span>
                <span className="seo-check-points">{item.points}</span>
              </div>
              {diagnosticNote && (
                <div className="seo-check-diagnostic">
                  {diagnosticNote}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
